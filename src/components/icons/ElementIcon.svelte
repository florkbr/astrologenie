<script lang="ts">
	import { Element } from '../../Types';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import {
		mdiTsunami, // water
		mdiImageFilterHdr, // earth
		mdiFire, // fire
		mdiWeatherWindy //air
		// Long ago the four nations lived together in harmony.
		// Then, everything changed when the Fire Nation attacked.
		// Only the Avatar, master of all the four elements, could
		// stop them...
	} from '@mdi/js';

	export let element: Element;

	const mdiPathMap: Record<Element, string> = {
		[Element.Water]: mdiTsunami,
		[Element.Earth]: mdiImageFilterHdr,
		[Element.Fire]: mdiFire,
		[Element.Air]: mdiWeatherWindy
	};

	$: path = mdiPathMap[element];
</script>

<SvgIcon type="mdi" {path} />
