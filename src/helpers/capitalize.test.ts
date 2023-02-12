import capitalize from "./capitalize";

describe('testing capitalize', () => {
    test('testing capitalize to be', () => {
        expect(capitalize('weather')).toBe('Weather');
        expect(capitalize('wEATHER')).toBe('WEATHER');
    }),
    test('testing capitalize not to be', () => {
        expect(capitalize('weather')).not.toBe('weather');
        expect(capitalize('Weather')).not.toBe('weather');
    })
})
