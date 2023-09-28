import { Element } from "./Element";
import { Placement } from "./Placement";

export class Person {
    private readonly name: string;

    // The person's birth placements.
    private rising: Placement;
    private moon: Placement;
    private sun: Placement;
    private mars: Placement;
    private mercury: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private jupiter?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private MC?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private neptune?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private pluto?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private saturn?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private uranus?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private venus?: Placement;

    // The following two will be initialized in a later stage.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private dc?: Placement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private ic?: Placement;

    constructor(
        name: string,
        rising: Placement,
        moon: Placement,
        sun: Placement,
        mars: Placement,
        mercury: Placement,
        jupiter?: Placement,
        mc?: Placement,
        neptune?: Placement,
        pluto?: Placement,
        saturn?: Placement,
        uranus?: Placement,
        venus?: Placement
    ) {
        // Save the person's name...
        this.name = name;

        // ... and its birth chart's placements.
        this.rising = rising;
        this.moon = moon;
        this.sun = sun;
        this.mars = mars;
        this.mercury = mercury;
        this.jupiter = jupiter;
        this.MC = mc;
        this.neptune = neptune;
        this.pluto = pluto;
        this.saturn = saturn;
        this.uranus = uranus;
        this.venus = venus;
    }

    public getName(): string {
        return this.name;
    }

    public getRising(): Placement {
        return this.rising;
    }

    public getMoon(): Placement {
        return this.moon;
    }

    public getSun(): Placement {
        return this.sun;
    }

    public getMars(): Placement {
        return this.mars;
    }

    public getMercury(): Placement {
        return this.mercury;
    }

    public setDC(dc: Placement): void {
        this.dc = dc;
    }

    public setIC(ic: Placement): void {
        this.ic = ic;
    }

    /**
     * Gets all the placements of this person.
     * @returns a map of the placements on the birth chart. The key
     * of the map represents the element on the birth chart.
     */
    public getAllPlacements(): Map<Element, Placement> {
        const placements = new Map<Element, Placement>();

        placements.set(Element.RISING, this.rising);
        placements.set(Element.MOON, this.moon);
        placements.set(Element.SUN, this.sun);
        placements.set(Element.MARS, this.mars);
        placements.set(Element.MERCURY, this.mercury);

        return placements;
    }
}
