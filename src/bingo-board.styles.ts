import { css } from 'lit'

export const boardStyles = css`
  div,
  li {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  * {
    font-family: 'Oswald', sans-serif;
  }

  div.board {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 8fr 2fr;
    grid-template-rows: repeat(5, 1fr);
    background: #222;
    width: 100%;
    height: 100%;
    font-family: Helvetica, sans-serif;
    font-weight: 800;
  }

  .button {
    width: 1em;
    height: 1em;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.25em;
    padding: 0.3em;
  }

  div.help-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.help-modal .help__content {
    position: relative;
    background-color: white;
    width: 30%;
    height: 50;
    text-align: center;
    padding: 2.5em;
  }

  div.help-modal .help__content .help__close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1em;
    padding-top: 0.25em;
  }

  div.current {
    grid-column: 3 / 4;
    grid-row: 1 / 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    font-weight: 700;
    background: white;
    color: black;
  }

  div.current > .letter {
    font-size: 5.5em;
    line-height: 0.9em;
  }

  div.current > .number {
    font-size: 2.5em;
  }

  *[role='button'] {
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    grid-row: 1 / 6;
    display: flex;
    flex-direction: column;
  }

  ul li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul.letters {
    grid-column: 1 / 2;
    background: white;
  }

  ul.letters li {
    color: red;
    font-size: 7em;
    font-weight: 800;
  }

  ul.numbers {
    grid-column: 2 / 3;
    color: white;
    padding: 0 3em;
  }

  ul.numbers li ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  ul.numbers li ul li.number {
    flex: 1;
    font-size: 2.75em;
    transition: color 0.2s ease-in-out;
  }

  ul.numbers li ul li.number.marked {
    color: red;
  }
`

export default boardStyles
