<script lang="ts">
	import { Placement } from '../../Types';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import { mdiPathMap } from '../../IconMap';

	export let placement: Placement;

	let rotate = 0;
	$: if (placement === Placement.Rising) {
		rotate = 45;
	}

	$: path = mdiPathMap[placement];
</script>

<div>
	<SvgIcon alt={placement} type="mdi" {path} {rotate} />
</div>
