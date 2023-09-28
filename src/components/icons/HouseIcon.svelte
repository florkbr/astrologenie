<script lang="ts">
	import SvgIcon from '@jamescoyle/svelte-icon';
	import { mdiHome } from '@mdi/js';

	export let index;
	let houseName;

	$: {
		switch (index) {
			case 0:
				houseName = '1st';
				break;
			case 1:
				houseName = '2nd';
				break;
			case 2:
				houseName = '3rd';
				break;
			default:
				houseName = `${index + 1}th`;
		}
	}
</script>

<div>
	<SvgIcon type="mdi" path={mdiHome} />
	<div class="append">{houseName} House</div>
</div>

<style>
	div.append {
		font-size: 9pt;
		margin-top: -8px;
	}
</style>
