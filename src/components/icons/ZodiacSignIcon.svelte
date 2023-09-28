<script lang="ts">
	import { Sign } from '../../Types.js';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import { mdiPathMap } from '../../IconMap';

	export let sign: Sign;

	$: path = mdiPathMap[sign];
</script>

<SvgIcon type="mdi" {path} />
