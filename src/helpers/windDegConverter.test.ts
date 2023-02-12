import { degToCompass } from "./windDegConverter";

describe('testing deg converter', () => {
    test('testing 0 deg to be north', () => {
        expect(degToCompass(0)).toBe('north')
    }),
    test('testing 45 deg to be northeast', () => {
        expect(degToCompass(45)).toBe('northeast')
    }),
    test('testing 90 deg to be east', () => {
        expect(degToCompass(90)).toBe('east')
    }),
    test('testing 135 deg to be southeast', () => {
        expect(degToCompass(135)).toBe('southeast')
    }),
    test('testing 180 deg to be south', () => {
        expect(degToCompass(180)).toBe('south')
    }),
    test('testing 225 deg to be southwest', () => {
        expect(degToCompass(225)).toBe('southwest')
    }),
    test('testing 270 deg to be west', () => {
        expect(degToCompass(270)).toBe('west')
    }),
    test('testing 315 deg to be northwest', () => {
        expect(degToCompass(315)).toBe('northwest')
    }),
    test('testing 360 deg to be north', () => {
        expect(degToCompass(360)).toBe('north')
    })
})