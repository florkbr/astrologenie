import type { Element } from "./Element";

export enum PlacementStats {
    RISING = 1, // part of the birth chart.
    JUPITER = 0, // part of the birth chart.
    MARS = 5, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    MC = 0, // part of the birth chart.
    MERCURY = 4, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    MOON = 1, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    SUN = 1, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    VENUS = 0, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    NEPTUNE = 0, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    PLUTO = 0, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    SATURN = 0, // part of the birth chart.
    /* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
    URANUS = 0, // part of the birth chart.
}

export class Placement {
    private degrees: number;
    private element: Element;

    constructor(element: Element, degrees: number) {
        this.degrees = degrees;
        this.element = element;
    }

    public getDegrees(): number {
        return this.degrees;
    }

    public setDegrees(degrees: number): void {
        this.degrees = degrees;
    }

    public getElement(): Element {
        return this.element;
    }
}
