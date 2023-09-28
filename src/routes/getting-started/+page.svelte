<script>
	import axios from 'axios';
	import { storedHoroscope, storedOrigin, storedName } from '../../stores.js';
	import { goto } from '$app/navigation';
	// import moment from 'moment-timezone';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import { Origin, Horoscope } from 'circular-natal-horoscope-js/dist/index';

	export var data = {
		city: '',
		state: '',
		country: '',
		latitude: 0,
		longitude: 0,
		localdatetime: '',
		name: ''
		// timezone: '',
	};

	/**
	 * @param {string} localdatetime
	 * @param {number} latitude
	 * @param {number} longitude
	 */
	export function getOriginAndHoroscope(localdatetime, latitude, longitude) {
		const parsedDate = new Date(localdatetime);
		const origin = new Origin({
			year: parsedDate.getFullYear(),
			month: parsedDate.getMonth(), // 0 = January, 11 = December!
			date: parsedDate.getDate(),
			hour: parsedDate.getHours(),
			minute: parsedDate.getMinutes(),
			latitude,
			longitude
		});

		const horoscope = new Horoscope({
			origin,
			houseSystem: 'whole-sign',
			zodiac: 'tropical',
			aspectPoints: ['bodies', 'points', 'angles'],
			aspectWithPoints: ['bodies', 'points', 'angles'],
			aspectTypes: ['major', 'minor'],
			// customOrbs,
			language: 'en'
		});

		return { origin, horoscope };
	}

	export async function handleSubmit() {
		const params = {
			access_key: '<TOKEN_HERE>',
			query: data.city + ', ' + data.state + ', ' + data.country
		};

		axios
			.get('http://api.positionstack.com/v1/forward', { params })
			.then(function (response) {
				data.latitude = response.data.data[0].latitude;
				data.longitude = response.data.data[0].longitude;
				const { origin, horoscope } = getOriginAndHoroscope(
					data.localdatetime,
					data.latitude,
					data.longitude
				);
				console.log(response);
				console.log(data.latitude);
				console.log(data.longitude);
				console.log(origin);
				console.log(horoscope);
				$storedHoroscope = horoscope;
				$storedOrigin = origin;
				$storedName = data.name;
				goto('/chart');
			})
			.catch(function (error) {
				console.log(error.toJSON());
			});
	}
</script>

<div class="form">
	<h3>Enter your birth information to get started</h3>
	<label for="avatar">Full name</label>
	<input bind:value={data.name} /><br />

	<label for="birth-date-time">Date/time</label>
	<input type="datetime-local" name="birth-date-time" bind:value={data.localdatetime} /><br />

	<!---
  <label for="timezone">Timezone</label>
  <select name='timezone' bind:value={data.timezone}>
    {#each moment.tz.names() as tz}
      <option value={tz} selected={tz === 'America/New_York' ? true : false}>{tz}</option>
    {/each}
  </select><br />
  -->

	<label for="avatar">City</label>
	<input bind:value={data.city} /><br />

	<label for="avatar">State</label>
	<input bind:value={data.state} /><br />

	<label for="avatar">Country</label>
	<input bind:value={data.country} placeholder="United States" /><br />

	<button on:click={handleSubmit}> Submit </button>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	/* select {
    font-size: inherit;
  } */
</style>
