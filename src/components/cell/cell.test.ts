import Cell from "./cell";
import MaskManager from "../../modules/maskManager";

describe('Cell', () => {
    const maskManager = new MaskManager();

    it('should return gray cell with dot', function () {
        const expected = `<span class='cell cell_gray'>${maskManager.dot}</span>`;

        const component = new Cell({
            char: maskManager.asterisk,
            maskManager: maskManager
        });

        expect(component.template).toBe(expected);
    });

    it('should return gray cell with X', function () {
        const expected = `<span class='cell cell_gray'>${maskManager.ex}</span>`;

        const component = new Cell({
            char: maskManager.ex,
            maskManager: maskManager
        });

        expect(component.template).toBe(expected);
    });

    it('should return gray cell with number', function () {
        const num = '9';
        const expected = `<span class='cell cell_gray'>${num}</span>`;

        const component = new Cell({
            char: num,
            maskManager: maskManager
        });

        expect(component.template).toBe(expected);
    });

    it('should return only provided string', function () {
        const char = '+';

        const component = new Cell({
            char: char,
            maskManager: maskManager
        });

        expect(component.template).toBe(char);
    });
});
