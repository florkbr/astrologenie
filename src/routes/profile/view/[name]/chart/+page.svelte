<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { profiles } from '../../../../../stores';

	export let data;

	/**
	 * @type {{ [k: string]: any; }}
	 */
	let planets;

	let cusps = [60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390];

	$: profile = $profiles.find((p) => p.name === data.name) ?? null;

	$: {
		if (profile) {
			planets = {};
			for (const planetKey in profile.planets) {
				planets[planetKey] = [profile.planets[planetKey].degrees];
			}

			cusps = profile.houses.map((h) => h.degrees);
		}
	}

	onMount(async () => {
		if (profile === null) {
			goto('/profile');
		}

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

{#if profile}
	<a href="/profile/view/{profile.name}">Back to my profile</a>
{/if}
<section>
	<div id="chart" class="chart" class:hidden={!planets} />
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
