<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { profiles } from '../../../../../stores';
	import { mdiPathMap } from '../../../../../IconMap';
	import { Placement } from '../../../../../Types';

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

	// Adapted from the internal method used to write the Sun
	const writeMdiSymbol = (mdiSymbol, name, x, y, context, rotate) => {
		const xShift = -13; // px
		const yShift = -9; // px

		x = Math.round(x + xShift * context.settings.SYMBOL_SCALE);
		y = Math.round(y + yShift * context.settings.SYMBOL_SCALE);

		const wrapper = document.createElementNS(context.root.namespaceURI, 'g');
		wrapper.setAttribute(
			'transform',
			'translate(' +
				-x * (context.settings.SYMBOL_SCALE - 1) +
				x +
				',' +
				-y * (context.settings.SYMBOL_SCALE - 1) +
				y +
				') scale(' +
				context.settings.SYMBOL_SCALE +
				')'
		);

		const node = document.createElementNS(context.root.namespaceURI, 'path');

		node.setAttribute('d', mdiSymbol);

		node.setAttribute('stroke', context.settings.POINTS_COLOR);
		node.setAttribute('stroke-width', '0.5px');

		if (rotate) {
			node.style.transformOrigin = 'center';
			node.style.transform = `rotate(${rotate}deg)`;
			node.style.transformBox = 'fill-box';
		}

		wrapper.appendChild(node);

		return wrapper;
	};

	onMount(async () => {
		if (profile === null) {
			goto('/astrologenie/profile');
		}

		const astrochart = await import('@astrodraw/astrochart');
		const Chart = astrochart.default;
		const chart = new Chart('chart', 800, 800, {
			CUSTOM_SYMBOL_FN: function (name, x, y, context) {
				if (name in mdiPathMap) {
					let rotate = 0;
					if (name === Placement.Rising) {
						rotate = 45;
					}

					return writeMdiSymbol(mdiPathMap[name], name, x, y, context, rotate);
				}

				return undefined;
			}
		});
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
	<h1>{profile.name}</h1>
{/if}
<section>
	<div id="chart" class="chart" class:hidden={!planets} />
</section>
{#if profile}
	<a href="/astrologenie/profile/view/{profile.name}">Back to my profile</a>
{/if}

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

	a {
		align-self: center;
		margin-top: 10px;
	}
	@media only screen and (max-width: 750px) {
		.chart {
			width: 400px;
			height: 400px;
		}
	}
</style>
