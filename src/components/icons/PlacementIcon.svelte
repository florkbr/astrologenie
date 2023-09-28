<script lang="ts">
	import { Placement } from '../../Types';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import {
		mdiWeatherSunny, // Sun
		mdiArrowUpBold, // Rising
		mdiMoonWaningCrescent, // Moon
		mdiGenderMaleFemaleVariant, // Mercury
		mdiGenderMale // Mars
	} from '@mdi/js';

	export let placement: Placement;

	const mdiPathMap: Record<Placement, string> = {
		[Placement.Sun]: mdiWeatherSunny,
		[Placement.Rising]: mdiArrowUpBold,
		[Placement.Moon]: mdiMoonWaningCrescent,
		[Placement.Mercury]: mdiGenderMaleFemaleVariant,
		[Placement.Mars]: mdiGenderMale
	};

	let rotate = 0;
	$: if (placement === Placement.Rising) {
		rotate = 45;
	}

	$: path = mdiPathMap[placement];
</script>

<div>
	<SvgIcon alt={placement} type="mdi" {path} {rotate} />
</div>
