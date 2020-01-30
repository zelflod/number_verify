import Props from './models/props'

export class NumVer {
    protected root: HTMLElement;
    protected settings: Props;

    constructor(root: string | HTMLElement, props?: Props) {
        this.settings = {mask: '', ...props};

        if (typeof root === 'string') {
            const element = document.getElementById(root);
            if (element) {
                this.root = element;
            } else {
                throw Error(`Root element by id ${root} not found`);
            }
        } else {
            this.root = root;
        }

        this.root.innerHTML = "TEST";
    }
}
