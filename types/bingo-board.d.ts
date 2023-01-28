import { LitElement } from 'lit';
export declare class BingoBoard extends LitElement {
    static styles: CSSStyleSheet;
    private _currentLetterNumber;
    private _set;
    private _markedNumbers;
    connectedCallback(): void;
    private _startGame;
    private _getRandomLetterNumber;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bingo-board': BingoBoard;
    }
}
