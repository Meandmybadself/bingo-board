var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import boardStyles from './bingo-board.styles.js';
import range from 'lodash/range';
const letters = ['B', 'I', 'N', 'G', 'O'];
const getRangeForLetter = (letter) => {
    switch (letter) {
        case 'B':
            return range(1, 16);
        case 'I':
            return range(16, 31);
        case 'N':
            return range(31, 46);
        case 'G':
            return range(46, 61);
        case 'O':
            return range(61, 76);
        default:
            return [];
    }
};
const getLetterForNumber = (number) => {
    if (number >= 1 && number < 16)
        return 'B';
    if (number >= 16 && number < 31)
        return 'I';
    if (number >= 31 && number < 46)
        return 'N';
    if (number >= 46 && number < 61)
        return 'G';
    if (number >= 61 && number < 76)
        return 'O';
    return '';
};
let BingoBoard = class BingoBoard extends LitElement {
    constructor() {
        super(...arguments);
        this._currentLetterNumber = undefined;
        this._isHelpShowing = false;
        this._markedNumbers = [];
    }
    connectedCallback() {
        super.connectedCallback();
        this._startGame();
    }
    _startGame(restart = false) {
        if (!restart && localStorage.getItem('markedNumbers')) {
            this._markedNumbers = JSON.parse(localStorage.getItem('markedNumbers'));
            const currentLetterNumberStr = localStorage.getItem('currentLetterNumber');
            if (currentLetterNumberStr) {
                this._currentLetterNumber = JSON.parse(currentLetterNumberStr);
            }
        }
        else {
            this._markedNumbers = [];
            this._currentLetterNumber = undefined;
        }
        this._persistState();
    }
    _persistState() {
        if (this._markedNumbers) {
            localStorage.setItem('markedNumbers', JSON.stringify(this._markedNumbers));
        }
        if (this._currentLetterNumber) {
            localStorage.setItem('currentLetterNumber', JSON.stringify(this._currentLetterNumber));
        }
    }
    _makeFullscreen() {
        // Make full screen.
        const el = this.shadowRoot?.querySelector('.board');
        if (el) {
            el.requestFullscreen();
        }
    }
    _toggleNumber(number, e) {
        e.stopPropagation();
        debugger;
        const index = this._markedNumbers.indexOf(number);
        if (index > -1) {
            // Unmark the number
            this._markedNumbers = [...this._markedNumbers.slice(0, index), ...this._markedNumbers.slice(index + 1)];
            // Clear current display if this was the current number
            if (this._currentLetterNumber?.number === number) {
                this._currentLetterNumber = undefined;
            }
        }
        else {
            // Mark the number and set it as current
            this._markedNumbers = [...this._markedNumbers, number];
            this._currentLetterNumber = {
                letter: getLetterForNumber(number),
                number
            };
        }
        this._persistState();
    }
    render() {
        const help = this._isHelpShowing ? html `
      <div class="help-modal"
        @click=${() => this._isHelpShowing = false}
      >
        <div class="help__content">
          <div class="help__close button" role="button" @click=${() => this._isHelpShowing = false}>✖</div>
          <h1>How to play</h1>
          <p>Click on a number to mark it and display it in the current area.</p>
          <p>Click on BINGO to start a new game.</p>
        </div>
        
      </div>` : nothing;
        return html `
      ${help}
      <div class="board"
        @click=${() => this._makeFullscreen()}
      >
        <ul role="button" class="letters" @click=${() => this._startGame(true)}>
          ${letters.map(letter => html `<li>${letter}</li>`)}
        </ul>
        <ul class="numbers">
          ${letters.map(letter => html `<li><ul>${getRangeForLetter(letter).map(number => html `<li class="number ${this._markedNumbers.includes(number) ? 'marked' : ''} ${this._currentLetterNumber?.number === number ? 'last-clicked' : ''}" role="button" @click=${(e) => this._toggleNumber(number, e)}>${number}</li>`)}</ul></li>`)}
        </ul>
        <div class="current">
          <div class="letter">${this._currentLetterNumber?.letter}</div>
          <div class="number">${this._currentLetterNumber?.number}</div>
          <div class="help button" role="button" @click=${(e) => {
            e.stopPropagation();
            this._isHelpShowing = true;
        }}>?</div>
        </div>
      </div>
    `;
    }
};
BingoBoard.styles = boardStyles;
__decorate([
    state()
], BingoBoard.prototype, "_currentLetterNumber", void 0);
__decorate([
    state()
], BingoBoard.prototype, "_isHelpShowing", void 0);
__decorate([
    state()
], BingoBoard.prototype, "_markedNumbers", void 0);
BingoBoard = __decorate([
    customElement('bingo-board')
], BingoBoard);
export { BingoBoard };
