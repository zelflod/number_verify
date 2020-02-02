import InputCell from "./inputCell";

describe('InputCell Component', () => {
    it('should create component', function () {
        const component = new InputCell({
            value: "",
            valid: false,
            onChange: (): null => null
        });

        expect(component).toBeDefined();
    });

    it('should render template', function () {
        const valid = true;
        const template = `<input id="" 
                            type="number" 
                            maxlength="1" 
                            min="0" max="9" 
                            step="1" 
                            class="cell input-cell ${valid ? '' : 'input-cell_error'}"
                            value="" 
                            placeholder="_"/>`;

        const expected = document.createElement('div');
        expected.innerHTML = template;

        const component = new InputCell({
            value: "",
            valid: valid,
            onChange: (): null => null
        });

        const div = document.createElement('div');
        div.innerHTML = component.template;

        const cell = div.querySelector('.input-cell');
        if (cell) {
            cell.id = '';
        }

        expect(div).toEqual(expected);
    });

    it('should render template with error class', function () {
        const valid = false;
        const template = `<input id="" 
                            type="number" 
                            maxlength="1" 
                            min="0" max="9" 
                            step="1" 
                            class="cell input-cell ${valid ? '' : 'input-cell_error'}"
                            value="" 
                            placeholder="_"/>`;

        const expected = document.createElement('div');
        expected.innerHTML = template;

        const component = new InputCell({
            value: "",
            valid: valid,
            onChange: (): null => null
        });

        const div = document.createElement('div');
        div.innerHTML = component.template;

        const cell = div.querySelector('.input-cell');
        if (cell) {
            cell.id = '';
        }

        expect(div).toEqual(expected);
    });

    it('should set value', function () {
        const value = '7';

        const component = new InputCell({
            value: value,
            valid: true,
            onChange: (): null => null
        });
        document.body.innerHTML = component.template;

        expect(component.value).toBe(value);
    });
});

