<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {Horoscope, Origin} from 'circular-natal-horoscope-js/dist/index';
    import type {Profile} from "../Types";
    import {Placement} from "../Types";

    const dispatch = createEventDispatcher();

    let name: string;
    let dateOfBirth: Date;
    let lat: number;
    let long: number;

    const handleAdd = () => {
        if (!name) {
            alert('You are required to add a name');
            return;
        }

        if (!dateOfBirth) {
            alert('You are required to enter your date and time of birth');
            return;
        }

        if (!lat || !long) {
            alert('You are required to enter the latitude and longitude of where you were birth');
            return;
        }

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

        const profile: Profile = {
            name,
            placement: {
                [Placement.Sun]: horoscope.SunSign.label,
                [Placement.Rising]: horoscope.Ascendant.Sign.label,
                [Placement.Moon]: horoscope.CelestialBodies.moon.Sign.label,
                [Placement.Mercury]: horoscope.CelestialBodies.mercury.Sign.label,
                [Placement.Mars]: horoscope.CelestialBodies.mars.Sign.label,
                [Placement._2ndHouse]: horoscope.Houses[1].Sign.label,
                [Placement._3rdHouse]: horoscope.Houses[2].Sign.label,
                [Placement._6thHouse]: horoscope.Houses[5].Sign.label,
                [Placement._10thHouse]: horoscope.Houses[9].Sign.label,
                [Placement._11thHouse]: horoscope.Houses[10].Sign.label,
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
            Place of birth:
            <label>Lat: <input bind:value={lat} type="number" /></label>
            <label>Long: <input bind:value={long} type="number" /></label>
        </label>
    </div>
    <div>
        <button on:click={handleAdd}>Add</button>
    </div>
</form>
