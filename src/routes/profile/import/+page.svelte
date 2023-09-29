<script lang="ts">
	import { profiles } from '../../../stores';
	import type { Profile } from '../../../Types';
	let importedRawData;

	const handleImport = () => {
		const importedData = JSON.parse(importedRawData) as Array<Profile>;
		$profiles = Object.values({
			...Object.fromEntries($profiles.map((p) => [p.name, p])),
			...Object.fromEntries(importedData.map((p) => [p.name, p]))
		});
		alert('Imported!');
	};
</script>

<a href="/profile">Back to profile</a>
<div>
	<span
		>Import the data - it will add to existing profiles bu will overwrite any existing profile</span
	>
	<span>Could corrupt your data!</span>
	<textarea rows="20" bind:value={importedRawData} />
	<button on:click={handleImport}>Import!</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	button {
		align-self: flex-start;
	}
</style>
