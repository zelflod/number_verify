import { NumberInput } from './index';

describe('NumberInput Component', () => {
    const root = 'my-input';

    beforeEach(function() {
        document.body.innerHTML = `<input class="" id="${root}"/>`;
    });

    it('should throw error', function() {
        let component: NumberInput | undefined;
        let err: Error | undefined;

        try {
            component = new NumberInput('some-not-existed-id');
        } catch (e) {
            err = e;
        }

        expect(component).toBeUndefined();
        expect(err).not.toBeUndefined();
    });

    it('should create component', function() {
        const component = new NumberInput(root);

        expect(component).not.toBeUndefined();
    });

    it('should replace initial input nad have empty cells', function() {
        const expected = document.createElement('div');
        expected.classList.add('number-input');
        expected.innerHTML = `<input class="" id="${root}" type="hidden"/><div class="cells-wrap"></div>`;

        new NumberInput(root);
        const el = document.querySelector('.number-input') as HTMLElement;

        expect(el).not.toBeUndefined();
        expect(el).toEqual(expected);
    });

    it('should create cells by mask', function() {
        const expected = document.createElement('div');
        expected.classList.add('number-input');
        expected.innerHTML =
            `<input class="" id="${root}" type="hidden"/><div class="cells-wrap">` +
            '+<span class="cell cell_gray">7</span>(<span class="cell cell_gray">9</span>' +
            '<span class="cell cell_gray">8</span><span class="cell cell_gray">5</span>)' +
            '<input id="" type="number" maxlength="1" min="0" max="9" step="1" ' +
            'class="cell input-cell " value="" placeholder="_">' +
            '<input id="" ' +
            'type="number" maxlength="1" min="0" max="9" step="1" class="cell input-cell " value="" ' +
            'placeholder="_">-<span class="cell cell_gray">X</span><span class="cell cell_gray">●</span>' +
            '-<span class="cell cell_gray">●</span><span class="cell cell_gray">●</span>' +
            '</div>';

        new NumberInput(root, {
            mask: '+7(985)II-X*-**',
            errorMessage: '',
            valid: true,
            value: '',
        });

        const el = document.querySelector('.number-input') as HTMLElement;
        el.querySelectorAll('.input-cell').forEach((inp) => {
            inp.id = '';
        });

        expect(el).not.toBeUndefined();
        expect(el).toEqual(expected);
    });

    it('should take value as input', function() {
        const value = '77';

        const component = new NumberInput(root, {
            mask: '+7(985)II-X*-**',
            errorMessage: '',
            valid: true,
            value: value,
        });

        expect(component.value).toEqual(value);
    });

    it('should set props', function() {
        const newValue = '77';
        const newMask = '+7(777)II-**';

        const component = new NumberInput(root, {
            mask: '+7(985)II-X*-**',
            errorMessage: '',
            valid: true,
            value: '11',
        });

        component.setProps({
            mask: newMask,
            errorMessage: '',
            valid: false,
            value: newValue,
        });

        expect(component.value).toBe(newValue);
        expect(component.valid).toBe(false);
        expect(component.mask).toBe(newMask);
    });

    it('should show error', function() {
        const errorMessage = 'SOME ERROR MESSAGE';

        new NumberInput(root, {
            mask: '+7(985)II-X*-**',
            errorMessage: errorMessage,
            valid: false,
            value: '11',
        });

        const el = document.querySelector('.number-input') as HTMLElement;
        const errEl = el.querySelector('.error-text');

        expect(errEl).not.toBeUndefined();
        if (errEl) {
            expect(errEl.textContent).toBe(errorMessage);
        }
    });
});
