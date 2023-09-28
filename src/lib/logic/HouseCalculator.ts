import { Element } from "../types/Element";
import type { Person } from "../types/Person";
import type { House, HouseNumber } from "../types/House";
import type { Placement } from "../types/Placement";

export class HouseCalculator {
    /**
     * Positive stats holder.
     */
    private readonly positiveStats: Map<Element, number> = new Map<Element, number>();
    /**
     * Negative stats holder.
     */
    private readonly negativeStats: Map<Element, number> = new Map<Element, number>();

    /**
     * Get the calculated positive stats.
     * @returns the calculated positive stats.
     */
    public getPositiveStats(): Map<Element, number> {
        return this.positiveStats;
    }

    /**
     * Get the calculated negative stats.
     * @returns the calculated negative stats.
     */
    public getNegativeStats(): Map<Element, number> {
        return this.negativeStats;
    }

    /**
     * Given two people, it calculates the houses to planet ruling of both and generates
     * positive and negative stats on each.
     * @param firstPerson the first person to process.
     * @param secondPerson the second person to process.
     */
    public processHousesToPlacements(firstPerson: Person, secondPerson: Person): void {
        const firstPersonHouses: Map<HouseNumber, House> = firstPerson.getAllHouses();
        const secondPersonPlacements: Map<Element, Placement> = secondPerson.getAllPlacements();

        for (const [firstHouseNumber, firstHouse] of firstPersonHouses.entries()) {
            for (const [secondElement, secondPlacement] of secondPersonPlacements.entries()) {
                this.calculateStat(firstHouseNumber, firstHouse, secondElement, secondPlacement);
            }
        }

        const secondPersonHouses: Map<HouseNumber, House> = secondPerson.getAllHouses();
        const firstPersonPlacements: Map<Element, Placement> = firstPerson.getAllPlacements();

        for (const [secondHouseNumber, secondHouse] of secondPersonHouses.entries()) {
            for (const [firstElement, firstPlacement] of firstPersonPlacements.entries()) {
                this.calculateStat(secondHouseNumber, secondHouse, firstElement, firstPlacement);
            }
        }
    }

     /**
     * Given two people, it calculates the planet to house ruling of both and generates
     * positive and negative stats on each.
     * @param firstPerson the first person to process.
     * @param secondPerson the second person to process.
     */
     public processPlacementsToHouses(firstPerson: Person, secondPerson: Person): void {
        // TODO
    }

    private calculateStat(houseNumber: HouseNumber, house: House, element: Element, placement: Placement): void {
        // TODO
        // const modifier: number = house.getStat();
        // Placement.getStat();

    }
}
