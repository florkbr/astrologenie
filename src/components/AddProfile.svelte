<script lang="ts">
    import axios from 'axios';
    import {createEventDispatcher} from 'svelte';
    import {Horoscope, Origin} from 'circular-natal-horoscope-js/dist/index';
    import type {PlacementData, Profile} from "../Types";
    import {Placement} from "../Types";

    const dispatch = createEventDispatcher();

    let name: string;
    let dateOfBirth: Date;
    let city;
    let state;
    let country;

    const handleAdd = async () => {

        const params = {
            access_key: '<<Enter API KEY>>',
            query: city + ', ' + state + ', ' + country
        };

        if (!name) {
            alert('You are required to add a name');
            return;
        }

        if (!dateOfBirth) {
            alert('You are required to enter your date and time of birth');
            return;
        }

        if (!city || !state || !country) {
            alert('You are required to enter the city, state and country');
            return;
        }

        const response = await axios.get('http://api.positionstack.com/v1/forward', { params });
        const lat = response.data.data[0].latitude;
        const long = response.data.data[0].longitude;

        const dateOfBirthAsDate = new Date(dateOfBirth);
        const origin = new Origin({
            year: dateOfBirthAsDate.getFullYear(),
            month: dateOfBirthAsDate.getMonth(),
            date: dateOfBirthAsDate.getDate(),
            hour: dateOfBirthAsDate.getHours(),
            minute: dateOfBirthAsDate.getMinutes(),
            latitude: lat,
            longitude: long
        });

        const horoscope = new Horoscope({
            origin,
            houseSystem: "whole-sign",
            zodiac: "tropical",
            aspectPoints: ['bodies', 'points', 'angles'],
            aspectWithPoints: ['bodies', 'points', 'angles'],
            aspectTypes: ["major", "minor"],
            customOrbs: {},
            language: 'en'
        });

        const dataFromCelestialBodies = (celestialBody: any): PlacementData => ({
            sign: celestialBody.Sign.label,
            degrees: celestialBody.ChartPosition.Ecliptic.ArcDegrees.degrees
        });

        const dataFromHouses = (house: any): PlacementData => ({
            sign: house.Sign.label,
            degrees: house.ChartPosition.StartPosition.Horizon.ArcDegrees.degrees
        });

        const profile: Profile = {
            name,
            placement: {
                [Placement.Sun]: dataFromCelestialBodies(horoscope.CelestialBodies.sun),
                [Placement.Rising]: dataFromCelestialBodies(horoscope.Ascendant),
                [Placement.Moon]: dataFromCelestialBodies(horoscope.CelestialBodies.moon),
                [Placement.Mercury]: dataFromCelestialBodies(horoscope.CelestialBodies.mercury),
                [Placement.Mars]: dataFromCelestialBodies(horoscope.CelestialBodies.mars),
                [Placement._2ndHouse]: dataFromHouses(horoscope.Houses[1]),
                [Placement._3rdHouse]: dataFromHouses(horoscope.Houses[2]),
                [Placement._6thHouse]: dataFromHouses(horoscope.Houses[5]),
                [Placement._10thHouse]: dataFromHouses(horoscope.Houses[9]),
                [Placement._11thHouse]: dataFromHouses(horoscope.Houses[10]),
            }
        };

        dispatch('profile', profile);
    };
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>

<form>
    <div class="row">
        <label>
            Name:
            <input bind:value={name}/>
        </label>
    </div>
    <div class="row">
        <label>
            Date & time of birth:
            <input bind:value={dateOfBirth} type="datetime-local"/>
        </label>
    </div>
    <div class="row">
        <label>
            City
            <input bind:value={city} /><br>
        </label>
    </div>
    <div class="row">
        <label>
            State
            <input bind:value={state} /><br>
        </label>
    </div>
    <div class="row">
        <label>
            Country
            <input bind:value={country} /><br>
        </label>
    </div>
    <div>
        <button on:click={handleAdd}>Add</button>
    </div>
</form>
