import { LitElement } from 'lit';
export declare class BingoBoard extends LitElement {
    static styles: import("lit").CSSResult;
    private _currentLetterNumber;
    private _isHelpShowing;
    private _markedNumbers;
    connectedCallback(): void;
    private _startGame;
    private _persistState;
    _makeFullscreen(): void;
    private _toggleNumber;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'bingo-board': BingoBoard;
    }
}
