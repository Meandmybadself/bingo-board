import { LitElement } from 'lit';
export declare class BingoBoard extends LitElement {
    static styles: import("lit").CSSResult;
    private _currentLetterNumber;
    private _set;
    private _isHelpShowing;
    private _markedNumbers;
    connectedCallback(): void;
    private _startGame;
    private _persistState;
    private _getRandomLetterNumber;
    _makeFullscreen(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bingo-board': BingoBoard;
    }
}
