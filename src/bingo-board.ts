import { LitElement, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import boardStyles from './bingo-board.styles.js'
import range from 'lodash/range'

interface LetterNumber {
  letter: string
  number: number
}

const letters = ['B', 'I', 'N', 'G', 'O']

const getRangeForLetter = (letter: string): number[] => {
  switch (letter) {
    case 'B':
      return range(1, 16)
    case 'I':
      return range(16, 31)
    case 'N':
      return range(31, 46)
    case 'G':
      return range(46, 61)
    case 'O':
      return range(61, 76)
    default:
      return []
  }
}

const getLetterForNumber = (number: number): string => {
  if (number >= 1 && number < 16) return 'B'
  if (number >= 16 && number < 31) return 'I'
  if (number >= 31 && number < 46) return 'N'
  if (number >= 46 && number < 61) return 'G'
  if (number >= 61 && number < 76) return 'O'
  return ''
}

@customElement('bingo-board')
export class BingoBoard extends LitElement {
  static styles = boardStyles

  @state()
  private _currentLetterNumber: LetterNumber | undefined = undefined

  @state()
  private _markedNumbers: number[] = []

  connectedCallback() {
    super.connectedCallback()
    this._startGame()
  }

  private _startGame(restart = false) {
    if (!restart && localStorage.getItem('markedNumbers')) {
      this._markedNumbers = JSON.parse(localStorage.getItem('markedNumbers')!)
      const currentLetterNumberStr = localStorage.getItem('currentLetterNumber')
      if (currentLetterNumberStr) {
        this._currentLetterNumber = JSON.parse(currentLetterNumberStr)
      }
    } else {
      this._markedNumbers = []
      this._currentLetterNumber = undefined
    }
    this._persistState()
  }

  private _persistState() {
    if (this._markedNumbers) {
      localStorage.setItem('markedNumbers', JSON.stringify(this._markedNumbers))
    }
    if (this._currentLetterNumber) {
      localStorage.setItem('currentLetterNumber', JSON.stringify(this._currentLetterNumber))
    }
  }

  private _toggleNumber(number: number, e: MouseEvent) {
    e.stopPropagation()
    debugger
    const index = this._markedNumbers.indexOf(number)
    if (index > -1) {
      // Unmark the number
      this._markedNumbers = [...this._markedNumbers.slice(0, index), ...this._markedNumbers.slice(index + 1)]
      // Clear current display if this was the current number
      if (this._currentLetterNumber?.number === number) {
        this._currentLetterNumber = undefined
      }
    } else {
      // Mark the number and set it as current
      this._markedNumbers = [...this._markedNumbers, number]
      this._currentLetterNumber = {
        letter: getLetterForNumber(number),
        number
      }
    }
    this._persistState()
  }



  render() {
    return html`
      <div class="board"
        @click=${() => {
          this.dispatchEvent(new CustomEvent('request-fullscreen', { bubbles: true, composed: true }))
        }}
      >
        <ul role="button" class="letters" @click=${() => this._startGame(true)}>
          ${letters.map(letter => html`<li>${letter}</li>`)}
        </ul>
        <ul class="numbers">
          ${letters.map(letter => html`<li><ul>${getRangeForLetter(letter).map(number => html`<li class="number ${this._markedNumbers.includes(number) ? 'marked' : ''} ${this._currentLetterNumber?.number === number ? 'last-clicked' : ''}" role="button" @click=${(e: MouseEvent) => this._toggleNumber(number, e)}>${number}</li>`)}</ul></li>`)}
        </ul>
        <div class="current">
          <div class="letter">${this._currentLetterNumber?.letter}</div>
          <div class="number">${this._currentLetterNumber?.number}</div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bingo-board': BingoBoard
  }
}
