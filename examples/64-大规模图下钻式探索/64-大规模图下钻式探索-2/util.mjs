export function isNumber(value) {
    return typeof value === 'number' &&!isNaN(value);
}

export function isArray(a) {
    Array.isArray(a);
}
