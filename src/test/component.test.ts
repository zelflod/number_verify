import  {NumVer}  from "../index";

describe('NumVer Component', () => {
    document.body.innerHTML = `<div class="container" id="container"></div>`;
    const root = 'container';

    it('TEST should work', function () {

        new NumVer(root);

        const el : HTMLElement = document.getElementById(root) as HTMLElement;

        expect(el).not.toBeUndefined();
        expect(el.innerHTML).toEqual('TEST');
    });
});
