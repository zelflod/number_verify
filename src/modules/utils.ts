export const uniqueId = (): string =>
    `_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

export const keyCodes = {
    delete: 46,
    backspace: 8,
    arrowLeft: 37,
    arrowRight: 39,
};
