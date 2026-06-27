export function generateId(): string {
    return Math.random().toString(36).slice(2, 6);
}

export const toPrecision = (number: number) => Math.round(100 * number) / 100;

export default { generateId, toPrecision };
