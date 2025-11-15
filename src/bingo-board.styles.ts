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

  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  div.board {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    background: #222;
    width: 100%;
    height:100%;
    font-family: Helvetica, sans-serif;
    font-weight: 800;
  }

  div.current {
    grid-column: 3 / 4;
    grid-row: 1 / 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 700;
    background: white;
    color: #222;
  }

  div.current > .letter {
    font-size: 6em;
    line-height: 0.9em;
    font-family: "Gotham Rounded A", "Gotham Rounded B";
    font-style: normal;
    font-weight: 700;
  }

  div.current > .number {
    font-size: 2em;
    font-family: "Gotham Rounded A", "Gotham Rounded B";
    font-style: normal;
    font-weight: 700;
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
    font-size: 6em;
    font-family: "Gotham Rounded A", "Gotham Rounded B";
    font-style: normal;
    font-weight: 700;
  }

  ul.numbers {
    grid-column: 2 / 3;
    color: white;
    padding: 0 1.25em;
  }

  ul.numbers li ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  ul.numbers li ul li.number {
    font-size: 3em;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    font-family: "Gotham Rounded A", "Gotham Rounded B";
    font-style: normal;
    font-weight: 500;
    border-radius: 50%;
    width: 1.8em;
    height: 1.8em;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222;
    color: white;
  }

  ul.numbers li ul li.number.marked {
    color: red;
  }

  ul.numbers li ul li.number.last-clicked {
    background: red;
    color: #222;
  }
`

export default boardStyles
