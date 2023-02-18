import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import importedStyles from 'litsass:./bingo-board.scss'
import range from 'lodash/range'

interface LetterNumber {
  letter: string
  number: number
}

const letters = ['B', 'I', 'N', 'G', 'O']

type Set = { letter: string, numbers: number[] }[]

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

const generateSet = (): Set => letters.map(letter => ({
  letter,
  numbers: getRangeForLetter(letter)
}))

@customElement('bingo-board')
export class BingoBoard extends LitElement {
  static styles = importedStyles

  @state()
  private _currentLetterNumber: LetterNumber | undefined = undefined

  @state()
  private _set: Set = []

  private _markedNumbers: number[] = []

  connectedCallback() {
    super.connectedCallback()
    this._startGame()
  }

  private _startGame(restart = false) {
    this._makeFullscreen()
    if (!restart && localStorage.getItem('set')) {
      this._set = JSON.parse(localStorage.getItem('set')!)
      this._markedNumbers = JSON.parse(localStorage.getItem('markedNumbers')!)
      this._currentLetterNumber = JSON.parse(localStorage.getItem('currentLetterNumber')!)
    } else {
      this._set = generateSet()
      this._markedNumbers = []
      this._currentLetterNumber = undefined
    }
    // this._currentLetterNumber = this._getRandomLetterNumber()
    this._persistState()
  }


  private _persistState() {
    if (this._set) {
      localStorage.setItem('set', JSON.stringify(this._set))
    }
    if (this._markedNumbers) {
      localStorage.setItem('markedNumbers', JSON.stringify(this._markedNumbers))
    }
    if (this._currentLetterNumber) {
      localStorage.setItem('currentLetterNumber', JSON.stringify(this._currentLetterNumber))
    }
  }


  private _getRandomLetterNumber(): LetterNumber {
    // If the set is empty, start a new game.
    if (!this._set.length) {
      this._startGame(true)
    }

    const randomLetterIndex = Math.floor(Math.random() * this._set.length)
    const randomLetter = this._set[randomLetterIndex]
    const randomLetterNumberIndex = Math.floor(Math.random() * randomLetter.numbers.length)
    const randomLetterNumber = randomLetter.numbers[randomLetterNumberIndex]

    // Remove the number from the set.
    this._set[randomLetterIndex].numbers.splice(randomLetterNumberIndex, 1)

    // If the letter is exhaused, remove it from the set.
    if (!this._set[randomLetterIndex].numbers.length) {
      this._set.splice(randomLetterIndex, 1)
    }

    this._markedNumbers.push(randomLetterNumber)

    return {
      letter: randomLetter.letter,
      number: randomLetterNumber
    }
  }

  _makeFullscreen() {
    // Make full screen.
    const el = this.shadowRoot?.querySelector('.board')
    if (el) {
      el.requestFullscreen()
    }
  }

  _showHelp() {

  }

  render() {
    return html`
      <div class="board">
        <ul role="button" class="letters" @click=${() => this._startGame(true)}>
          ${letters.map(letter => html`<li>${letter}</li>`)}
        </ul>
        <ul class="numbers">
          ${letters.map(letter => html`<li><ul>${getRangeForLetter(letter).map(number => html`<li class="number ${this._markedNumbers.includes(number) ? 'marked' : ''}">${number}</li>`)}</ul></li>`)}
        </ul>
        <div class="current"
          role="button"
          @click=${() => {

        this._makeFullscreen()
        this._currentLetterNumber = this._getRandomLetterNumber()
        this._persistState()
      }}
        >
          <div class="letter">${this._currentLetterNumber?.letter}</div>
          <div class="number">${this._currentLetterNumber?.number}</div>
          <div class="help" role="button" @click=${() => this._showHelp()}>?</div>
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
