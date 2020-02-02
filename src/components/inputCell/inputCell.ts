import {keyCodes, uniqueId} from "../../modules/utils";
import './../cell/cell.css';
import './inputCell.css';
import InputCellProps from "../../models/inputCellProps";


export default class InputCell {
    public template = '';
    public id: string;

    private props: any;
    private readonly maxLength: number;

    get el() {
        return document.getElementById(this.id);
    }

    get value() {
        if (this.el) {
            return (this.el as HTMLInputElement).value;
        }

        return '';
    }

    constructor({onChange = () => null, valid = false, value = '', maxLength = 1}: InputCellProps) {
        this.id = this.constructor.name + uniqueId();
        this.props = {
            onChange,
            valid,
            value
        };
        this.maxLength = maxLength;

        this.render();
    }

    render() {
        this.template = `<input id="${this.id}" 
                            type="number" 
                            maxlength="1" 
                            min="0" max="9" 
                            step="1" 
                            class="cell input-cell ${this.props.valid ? '' : 'input-cell_error'}"
                            value="${this.props.value}" 
                            placeholder="_"/>`;
    }

    postRender() {
        if (!this.el) {
            return;
        }

        this.el.addEventListener('input', this.onCellInputChange.bind(this));
        this.el.addEventListener('change', this.onCellInputChange.bind(this));

        this.el.addEventListener('keydown', this.onKeyDown);
    }

    private onCellInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target.value.length > this.maxLength) {
            target.value = target.value.slice(0, this.maxLength);
            return;
        }

        if (target.value.length === this.maxLength) {
            const sibling = target.nextElementSibling as HTMLElement;
            sibling.focus();
        }

        this.props.onChange();
    }

    private onKeyDown(e: KeyboardEvent) {
        const target = e.target as HTMLInputElement;

        if (e.keyCode === keyCodes.arrowLeft) {
            const sibling = target.previousElementSibling as HTMLElement;
            sibling.focus();
            return;
        }

        if (e.keyCode === keyCodes.arrowRight) {
            const sibling = target.nextElementSibling as HTMLElement;
            sibling.focus();
            return;
        }

        if ((e.keyCode === keyCodes.backspace || e.keyCode === keyCodes.delete) && target.value.length === 0) {
            const sibling = target.previousElementSibling as HTMLElement;
            sibling.focus();
        }
    }
}
