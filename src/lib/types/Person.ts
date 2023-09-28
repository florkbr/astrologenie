import { Element } from "./Element";
import { Placement } from "./Placement";

export class Person {
    private readonly name: string;

    // The person's birth placements.
    private asc: Placement;
    private jupiter: Placement;
    private mars: Placement;
    private MC: Placement;
    private mercury: Placement;
    private moon: Placement;
    private neptune: Placement;
    private pluto: Placement;
    private saturn: Placement;
    private sun: Placement;
    private uranus: Placement;
    private venus: Placement;

    // The following two will be initialized in a later stage.
    private dc!: Placement;
    private ic!: Placement;

    constructor(
        name: string,
        asc: Placement,
        jupiter: Placement,
        mars: Placement,
        mc: Placement,
        mercury: Placement,
        moon: Placement,
        neptune: Placement,
        pluto: Placement,
        saturn: Placement,
        sun: Placement,
        uranus: Placement,
        venus: Placement
    ) {
        // Save the person's name...
        this.name = name;

        // ... and its birth chart's placements.
        this.asc = asc;
        this.jupiter = jupiter;
        this.mars = mars;
        this.MC = mc;
        this.mercury = mercury;
        this.moon = moon;
        this.neptune = neptune;
        this.pluto = pluto;
        this.saturn = saturn;
        this.sun = sun;
        this.uranus = uranus;
        this.venus = venus;
    }

    public getASC(): Placement {
        return this.asc;
    }

    public getJupiter(): Placement {
        return this.jupiter;
    }

    public getMars(): Placement {
        return this.mars;
    }

    public getMC(): Placement {
        return this.MC;
    }

    public getMercury(): Placement {
        return this.mercury;
    }

    public getMoon(): Placement {
        return this.moon;
    }

    public getName(): string {
        return this.name;
    }

    public getNeptune(): Placement {
        return this.neptune;
    }

    public getPluto(): Placement {
        return this.pluto;
    }

    public getSaturn(): Placement {
        return this.saturn;
    }

    public getSun(): Placement {
        return this.sun;
    }

    public getUranus(): Placement {
        return this.uranus;
    }

    public getVenus(): Placement {
        return this.venus;
    }

    public getDC(): Placement {
        return this.dc;
    }

    public setDC(dc: Placement): void {
        this.dc = dc;
    }

    public getIC(): Placement {
        return this.ic;
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

        /*
        placements.set(Element.ASCENDING, this.asc);
        placements.set(Element.JUPITER, this.jupiter);
        placements.set(Element.MARS, this.mars);
        placements.set(Element.MC, this.MC);
        placements.set(Element.MERCURY, this.mercury);
        placements.set(Element.MOON, this.moon);
        placements.set(Element.NEPTUNE, this.neptune);
        placements.set(Element.PLUTO, this.pluto);
        placements.set(Element.SATURN, this.saturn);
        placements.set(Element.SUN, this.sun);
        placements.set(Element.URANUS, this.uranus);
        placements.set(Element.VENUS, this.venus);
        */

        placements.set(Element.SATURN, this.saturn);
        placements.set(Element.MOON, this.moon);
        placements.set(Element.URANUS, this.uranus);
        placements.set(Element.SUN, this.sun);
        placements.set(Element.PLUTO, this.pluto);
        placements.set(Element.ASCENDING, this.asc);
        placements.set(Element.MARS, this.mars);
        placements.set(Element.NEPTUNE, this.neptune);
        placements.set(Element.JUPITER, this.jupiter);
        placements.set(Element.MC, this.MC);
        placements.set(Element.VENUS, this.venus);

        if (typeof this.ic !== 'undefined') {
            placements.set(Element.IC, this.ic);
        }

        placements.set(Element.MERCURY, this.mercury);

        if (typeof this.dc !== 'undefined') {
            placements.set(Element.DC, this.dc);
        }

        /*
        if (typeof this.dc !== 'undefined') {
            placements.set(Element.DC, this.dc);
        }

        if (typeof this.ic !== 'undefined') {
            placements.set(Element.IC, this.ic);
        }
        */

        return placements;
    }
}
