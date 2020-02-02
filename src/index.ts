import Props from './models/props';
import './main.css';
import InputCell from './components/inputCell/inputCell';
import MaskManager from './modules/maskManager';
import Cell from "./components/cell/cell";


export class NumberInput {
    public value = '';

    protected cells: InputCell[] = [];
    protected root: HTMLElement = document.createElement('div');
    protected cellWrapper: HTMLElement = document.createElement('div');
    protected err: HTMLElement | undefined;
    protected settings: Props;
    protected initialInput: HTMLInputElement;

    constructor(initialInput: string | HTMLInputElement, props?: Props) {
        this.settings = {
            mask: '',
            valid: true,
            value: '',
            errorMessage: '',
            ...props
        };

        this.value = this.settings.value;

        if (typeof initialInput === 'string') {
            const element = document.getElementById(initialInput) as HTMLInputElement;
            if (element) {
                this.initialInput = element;
            } else {
                throw Error(`Root input element by id ${initialInput} not found`);
            }
        } else {
            this.initialInput = initialInput;
        }

        this.replaceInitialInput();
        this.render();
        this.postRender();
    }

    get valid(): boolean {
        return this.settings.valid;
    }

    get mask(): string {
        return this.settings.mask;
    }

    render(): void {
        this.createCellsByMask(this.settings.mask);

        this.showErrorText(this.settings.errorMessage);
    }

    postRender(): void {
        this.cells.forEach(c => {
            c.postRender();
        });
    }

    setProps(newProps?: Props): void {
        this.settings = {
            ...this.settings,
            ...newProps
        };
        this.value = this.settings.value;

        this.render();
        this.postRender();
    }

    private replaceInitialInput(): void {
        this.root.classList.add('number-input');
        if (this.initialInput.parentNode) {
            this.initialInput.parentNode.replaceChild(this.root, this.initialInput);
        }

        this.initialInput.type = 'hidden';
        this.root.appendChild(this.initialInput);

        this.cellWrapper.classList.add('cells-wrap');
        this.root.appendChild(this.cellWrapper);
    }

    private createCellsByMask(mask: string): void {
        let template = '';

        if (mask.length < 1) {
            return;
        }

        this.cells = [];

        let i = 0;

        const maskManager = new MaskManager();

        for (const c of mask) {
            if (c === maskManager.input) {
                const cell = new InputCell({
                    onChange: this.onCellInputChange.bind(this),
                    valid: this.settings.valid,
                    value: this.value[i]
                });
                template += cell.template;
                this.cells.push(cell);
                i++;
            } else {
                template += new Cell({char: c, maskManager}).template
            }
        }

        this.cellWrapper.innerHTML = template;
    }

    private showErrorText(text: string): void {
        if (this.settings.valid || !text) {
            this.removeError();

            return;
        }

        this.addError(text);
    }

    private removeError(): void {
        if (this.err && this.root.contains(this.err)) {
            this.root.removeChild(this.err as HTMLElement);
        }
    }

    private addError(text: string): void {
        if (!this.err) {
            this.err = document.createElement('div');
            this.err.classList.add('error-text');
        }

        this.err.textContent = text;
        this.root.appendChild(this.err);
    }

    private onCellInputChange(): void {
        this.value = this.cells.reduce((accum, cur) => accum += cur.value, '');

        this.initialInput.value = this.value;
    }
}
