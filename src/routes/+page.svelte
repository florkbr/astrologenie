<script>
	import { onMount } from 'svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import { Origin, Horoscope } from 'circular-natal-horoscope-js/dist/index';

	const origin = new Origin({
		year: 2020,
		month: 11, // 0 = January, 11 = December!
		date: 1,
		hour: 16,
		minute: 30,
		latitude: 40.0,
		longitude: -70.0
	});

	const customOrbs = {
		conjunction: 8,
		opposition: 8,
		trine: 8,
		square: 7,
		sextile: 6,
		quincunx: 5,
		quintile: 1,
		septile: 1,
		'semi-square': 1,
		'semi-sextile': 1
	};

	const horoscope = new Horoscope({
		origin,
		houseSystem: 'whole-sign',
		zodiac: 'tropical',
		aspectPoints: ['bodies', 'points', 'angles'],
		aspectWithPoints: ['bodies', 'points', 'angles'],
		aspectTypes: ['major', 'minor'],
		customOrbs,
		language: 'en'
	});

	onMount(async () => {
		const astrochart = await import('@astrodraw/astrochart');
		const Chart = astrochart.default;
		console.log(horoscope);
		const chart = new Chart('chart', 800, 800);
		//data example
		// TODO hook up with above info
		const data = {
			planets: {
				Pluto: [63],
				Neptune: [110],
				Uranus: [318],
				Saturn: [201],
				Jupiter: [192],
				Mars: [210],
				Moon: [268],
				Sun: [281],
				Mercury: [312],
				Venus: [330]
			},
			cusps: [296, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274]
		};
		const radix = chart.radix(data);
		console.log(radix);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit astrology chart!
	</h1>
	<div id="chart" class="chart" />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		display: none;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	.chart {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
