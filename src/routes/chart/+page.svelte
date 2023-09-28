<script>
	import { onMount } from 'svelte';
	import { storedHoroscope, storedOrigin } from '../../stores.js';
	import { onDestroy } from 'svelte';

	/**
	 * @type {{ CelestialBodies?: any; ZodiacCusps?: any; }}
	 */
	let horoscope;
	/**
	 * @type {{}}
	 */
	let origin;
	/**
	 * @type {{ [k: string]: any; }}
	 */
	let planets;
	/**
	 * @type {any}
	 */
	let cusps;

	const unsubscribeHoroscope = storedHoroscope.subscribe((value) => {
		horoscope = value;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (horoscope?.CelestialBodies?.all) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			planets = Object.fromEntries(
				horoscope.CelestialBodies.all.map((entry) => {
					return [entry.label, [entry.ChartPosition.Ecliptic.ArcDegrees.degrees]];
				})
			);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (horoscope?.ZodiacCusps) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			cusps = horoscope.ZodiacCusps.map((entry) => {
				return entry.ChartPosition.Horizon.ArcDegrees.degrees;
			});
		}
		console.log(horoscope);
	});
	const unsubscribeOrigin = storedOrigin.subscribe((value) => {
		origin = value;
		console.log(origin);
	});

	onDestroy(unsubscribeHoroscope);
	onDestroy(unsubscribeOrigin);

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

<section>
	{#if !horoscope?.CelestialBodies?.all || !horoscope?.ZodiacCusps}
		<h1>Nothing to see here yet... <a href="/getting-started">Get started</a></h1>
	{/if}
	<div
		id="chart"
		class="chart"
		class:hidden={!horoscope?.CelestialBodies?.all || !horoscope?.ZodiacCusps}
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
