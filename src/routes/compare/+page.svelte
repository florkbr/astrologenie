<script lang="ts">
    import { profiles } from '../../stores';
    import { Person } from '../../lib/types/Person';
    import { Element } from '../../lib/types/Element';
    import { AspectCalculator } from '../../lib/logic/AspectCalculator';
	import { Placement } from '$lib/types/Placement';
	import type { PlacementData, Profile } from '../../Types';
	import { error } from '@sveltejs/kit';
	import { House, HouseNumber } from '$lib/types/House';

    function stringToElement(str): Element {
        const upperStr = str.toUpperCase()
        if (upperStr !== "AQUARIUS" || 
            upperStr !== "ARIES" ||
            upperStr !== "RISING" ||
            upperStr !== "CANCER" ||
            upperStr !== "CAPRICORN" ||
            upperStr !== "DC" ||
            upperStr !== "GEMINI" ||
            upperStr !== "IC" ||
            upperStr !== "JUPITER" ||
            upperStr !== "LEO" ||
            upperStr !== "LIBRA" ||
            upperStr !== "MARS" ||
            upperStr !== "MC" ||
            upperStr !== "MERCURY" ||
            upperStr !== "MOON" ||
            upperStr !== "NEPTUNE" ||
            upperStr !== "PISCES" ||
            upperStr !== "PLUTO" ||
            upperStr !== "SAGITTARIUS" ||
            upperStr !== "SATURN" ||
            upperStr !== "SCORPIO" ||
            upperStr !== "SUN" ||
            upperStr !== "TAURUS" ||
            upperStr !== "URANUS" ||
            upperStr !== "VENUS" ||
            upperStr !== "VIRGO"
            ) {
            throw new Error("Look up failed.");
        }
        const element: keyof typeof Element = upperStr;
        return Element[element];
    }

    function stringToHouseNumber(str): HouseNumber {
        const upperStr = str.toUpperCase()
        if (upperStr !== "HOUSE_1" || 
            upperStr !== "HOUSE_2" ||
            upperStr !== "HOUSE_3" ||
            upperStr !== "HOUSE_4" ||
            upperStr !== "HOUSE_5" ||
            upperStr !== "HOUSE_6" ||
            upperStr !== "HOUSE_7" ||
            upperStr !== "HOUSE_8" ||
            upperStr !== "HOUSE_9" ||
            upperStr !== "HOUSE_10" ||
            upperStr !== "HOUSE_11" ||
            upperStr !== "HOUSE_12"
            ) {
            throw new Error("Look up failed.");
        }
        const houseNumber: keyof typeof HouseNumber = upperStr;
        return HouseNumber[houseNumber];
    }

    function planetToPlacement(planet: PlacementData): Placement {
        return new Placement(stringToElement(planet.sign), planet.degrees)
    }

    function houseToPlacement(strHouseNumber: string, house: PlacementData): House {
        return new House(stringToHouseNumber(strHouseNumber), stringToElement(house.sign))
    }

    function profileToPersonType(profile: Profile): Person {
        var currPerson = new Person(
            profile.name,
            planetToPlacement(profile.planets.Rising),
            planetToPlacement(profile.planets.Moon),
            planetToPlacement(profile.planets.Sun),
            planetToPlacement(profile.planets.Mars),
            planetToPlacement(profile.planets.Mercury),
            houseToPlacement("house_2", profile.houses[1]),
            houseToPlacement("house_3", profile.houses[2]),
            houseToPlacement("house_6", profile.houses[5]),
            houseToPlacement("house_10", profile.houses[9]),
            houseToPlacement("house_11", profile.houses[10]),
            // profile.placement.Jupiter,
            // profile.placement.MC,
            // profile.placement.Neptune,
            // profile.placement.Pluto,
            // profile.placement.Saturn,
            // profile.placement.Uranus,
            // profile.placement.Venus,
        );

        return currPerson;
    }

    const as = new AspectCalculator()

    let i=0
    let j=0

    const persons = $profiles.map(
        (profile) => {
            return profileToPersonType(profile)
        }
    )
    as.processPeople(persons[0], persons[1])
    console.log(as.getPositiveStats())
    console.log(as.getNegativeStats())
</script>

<div class="column">
	{#each $profiles as profile}
		<div class="option">
			<a href="/profile/view/{profile.name}">{profile.name}</a>
		</div>
	{/each}
</div>

<style>
    .column{
        float:left;
        margin:0 10px 0 0;
        width:120px;
      }
      
      .column .option{
        margin:10px 0 0 0;
        padding:10px;
        background:white;
      }
      
      /* .column .option:first-child{
        background:tomato;
      } */
</style>