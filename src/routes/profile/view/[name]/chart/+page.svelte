<script>
	import { onMount } from 'svelte';
	import {goto} from "$app/navigation";
	import {Placement} from "../../../../../Types";
	import {profiles} from "../../../../../stores";

	export let data;

	/**
	 * @type {{ [k: string]: any; }}
	 */
	let planets;

	const cusps = [
			0,
			30,
			60,
			90,
			120,
			150,
			180,
			210,
			240,
			270,
			300,
			330
	];

	$: profile = $profiles.find(p => p.name === data.name) ?? null;

	$: {
		if (profile === null) {
			console.log(profile);
			// goto('/profile');
		}

		if (profile) {
			const planetsKeys = [
				Placement.Sun,
				Placement.Moon,
				Placement.Mars,
				Placement.Mercury,
				Placement.Rising
			];

			planets = {};
			for (const planetKey of planetsKeys) {
				planets[planetKey] = [profile.placement[planetKey].degrees];
			}
		}
	}


	// Reference
	// const unsubscribeHoroscope = storedHoroscope.subscribe((value) => {
	// 	horoscope = value;
	// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// 	// @ts-ignore
	// 	if (horoscope?.CelestialBodies?.all) {
	// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// 		// @ts-ignore
	// 		planets = Object.fromEntries(
	// 			horoscope.CelestialBodies.all.map((entry) => {
	// 				return [entry.label, [entry.ChartPosition.Ecliptic.ArcDegrees.degrees]];
	// 			})
	// 		);
	// 	}
	// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// 	// @ts-ignore
	// 	if (horoscope?.ZodiacCusps) {
	// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// 		// @ts-ignore
	// 		cusps = horoscope.ZodiacCusps.map((entry) => {
	// 			return entry.ChartPosition.Horizon.ArcDegrees.degrees;
	// 		});
	// 	}
	// 	console.log(horoscope);
	// });


	onMount(async () => {
		const astrochart = await import('@astrodraw/astrochart');
		const Chart = astrochart.default;
		const chart = new Chart('chart', 800, 800);
		const data = {
			planets,
			cusps
		};
		const radix = chart.radix(data);
		console.log(radix);
	});
</script>

<svelte:head>
	<title>Your Chart</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<a href="/profile/view/{profile.name}">Back to my profile</a>
<section>
	<div
		id="chart"
		class="chart"
		class:hidden={!planets}
	/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.chart {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.chart.hidden {
		display: none;
	}
</style>
