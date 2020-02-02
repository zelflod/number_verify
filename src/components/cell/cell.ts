import CellProps from "models/cellProps";
import MaskManager from "modules/maskManager";
import './cell.css';


export default class Cell {
    public template = '';

    private readonly char: string = '';
    private maskManager: MaskManager;

    constructor({char, maskManager}: CellProps) {
        this.char = char;
        this.maskManager = maskManager;

        this.render();
    }

    render(): void {
        if (this.maskManager.isNumber(this.char)) {
            this.template = this.getGrayCell(this.char);
        } else if (this.char === this.maskManager.asterisk) {
            this.template = this.getCellTemplateForAsterisk();
        } else if (this.char === this.maskManager.ex) {
            this.template = this.getCellTemplateForEx();
        } else {
            this.template = this.char;
        }
    }

    getGrayCell(char: string): string {
        return `<span class='cell cell_gray'>${char}</span>`
    }

    getCellTemplateForAsterisk(): string {
        return this.getGrayCell(this.maskManager.dot)
    }

    getCellTemplateForEx(): string {
        return this.getGrayCell(this.maskManager.ex)
    }
}
