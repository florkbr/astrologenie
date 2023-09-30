<script lang="ts">
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';
	import { Horoscope, Origin } from 'circular-natal-horoscope-js/dist/index';
	import type { PlacementData, Profile } from '../Types';
	import { Placement } from '../Types';
	import { PUBLIC_POSITION_STACK_API_KEY } from '$env/static/public';

	const dispatch = createEventDispatcher();

	let name: string;
	let dateOfBirth: Date;
	let city;
	let state;
	let country;

	const handleAdd = async () => {
		const params = {
			access_key: PUBLIC_POSITION_STACK_API_KEY,
			query: city + ', ' + state,
			country: country
		};

		if (!name) {
			alert('You are required to add a name');
			return;
		}

		if (!dateOfBirth) {
			alert('You are required to enter your date and time of birth');
			return;
		}

		if ((!city && !state) || !country) {
			alert('You are required to enter the city (and/or state) and country');
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
			houseSystem: 'whole-sign',
			zodiac: 'tropical',
			aspectPoints: ['bodies', 'points', 'angles'],
			aspectWithPoints: ['bodies', 'points', 'angles'],
			aspectTypes: ['major', 'minor'],
			customOrbs: {},
			language: 'en'
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const dataFromCelestialBodies = (celestialBody: any): PlacementData => ({
			sign: celestialBody.Sign.label,
			degrees: celestialBody.ChartPosition.Ecliptic.ArcDegrees.degrees
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const dataFromHouses = (house: any): PlacementData => ({
			sign: house.Sign.label,
			degrees: house.ChartPosition.StartPosition.Ecliptic.ArcDegrees.degrees
		});

		const profile: Profile = {
			name,
			planets: {
				[Placement.Sun]: dataFromCelestialBodies(horoscope.CelestialBodies.sun),
				[Placement.Rising]: dataFromCelestialBodies(horoscope.Ascendant),
				[Placement.Moon]: dataFromCelestialBodies(horoscope.CelestialBodies.moon),
				[Placement.Mercury]: dataFromCelestialBodies(horoscope.CelestialBodies.mercury),
				[Placement.Mars]: dataFromCelestialBodies(horoscope.CelestialBodies.mars)
			},
			houses: horoscope.Houses.map(dataFromHouses)
		};

		dispatch('profile', profile);
	};
</script>

<form>
	<h3>Add profile</h3>
	<div class="row">
		<label>
			Name:
			<input bind:value={name} />
		</label>
	</div>
	<div class="row">
		<label>
			Date & time of birth:
			<input bind:value={dateOfBirth} type="datetime-local" />
		</label>
	</div>
	<div class="row">
		<label>
			City
			<input bind:value={city} /><br />
		</label>
	</div>
	<div class="row">
		<label>
			State
			<input bind:value={state} /><br />
		</label>
	</div>
	<div class="row">
		<label>
			Country Code (two-letter)
			<input bind:value={country} /><br />
		</label>
	</div>
	<div class="controls">
		<button on:click={handleAdd}>Add</button>
		<a href="/profile">Cancel</a>
	</div>
	<img src="/rocket.png" alt="spaceship" class="spaceship" />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: max-content;
		text-align: center;
	}

	form .row {
		align-self: flex-end;
	}

	form .controls {
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form .controls *:nth-child(n + 2) {
		margin-left: 10px;
	}

	.spaceship {
		width: 200px;
		height: 400px;
		align-self: center;
		margin-top: 25px;
	}
</style>
