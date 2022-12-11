import capitalize from "./capitalize";

test('testing capitalize', () => {
    expect(capitalize('aboba')).toBe('Aboba');
    expect(capitalize('Aboba')).toBe('Aboba')
})