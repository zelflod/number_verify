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

    render() {
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

    getGrayCell(char: string) {
        return `<span class='cell cell_gray'>${char}</span>`
    }

    getCellTemplateForAsterisk() {
        return this.getGrayCell(this.maskManager.dot)
    }

    getCellTemplateForEx() {
        return this.getGrayCell(this.maskManager.ex)
    }
}
