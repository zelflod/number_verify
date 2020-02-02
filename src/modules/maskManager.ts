export default class MaskManager {
    readonly dot = '●';
    readonly ex = 'X';
    readonly asterisk = '*';
    readonly input = 'I';

    isNumber(char: string): boolean {
        return !!Number(char);
    }
}
