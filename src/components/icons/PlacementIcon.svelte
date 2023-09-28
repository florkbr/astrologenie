<script lang="ts">
	import { Placement } from '../../Types';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import {
		mdiWeatherSunny, // Sun
		mdiArrowUpBold, // Rising
		mdiMoonWaningCrescent, // Moon
		mdiGenderMaleFemaleVariant, // Mercury
		mdiGenderMale, // Mars
		mdiHome // houses
	} from '@mdi/js';

	export let placement: Placement;

	const mdiPathMap: Record<Placement, string> = {
		[Placement.Sun]: mdiWeatherSunny,
		[Placement.Rising]: mdiArrowUpBold,
		[Placement.Moon]: mdiMoonWaningCrescent,
		[Placement.Mercury]: mdiGenderMaleFemaleVariant,
		[Placement.Mars]: mdiGenderMale,
		[Placement._2ndHouse]: mdiHome,
		[Placement._3rdHouse]: mdiHome,
		[Placement._6thHouse]: mdiHome,
		[Placement._10thHouse]: mdiHome,
		[Placement._11thHouse]: mdiHome
	};

	const appendMap: Record<Placement, string> = {
		[Placement.Sun]: '',
		[Placement.Rising]: '',
		[Placement.Moon]: '',
		[Placement.Mercury]: '',
		[Placement.Mars]: '',
		[Placement._2ndHouse]: '2nd',
		[Placement._3rdHouse]: '3rd',
		[Placement._6thHouse]: '6th',
		[Placement._10thHouse]: '10th',
		[Placement._11thHouse]: '11th'
	};

	let rotate = 0;
	$: if (placement === Placement.Rising) {
		rotate = 45;
	}

	$: path = mdiPathMap[placement];
	$: append = appendMap[placement];
</script>

<div>
	<SvgIcon alt={placement} type="mdi" {path} {rotate} />
	<div class="append">{append}</div>
</div>

<style>
	div.append {
		font-size: 9pt;
		margin-top: -8px;
	}
</style>
