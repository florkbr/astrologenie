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

<svelte:head>
	<title>Import Profiles</title>
	<meta name="description" content="Astro Team Builder" />
</svelte:head>

<div>
	<h3>Import profiles</h3>
	<span
		>Importing data will add to the loaded profiles but will overwrite any existing profile with the
		same name</span
	>
	<span><i>Be warned - importing incorrect profiles can corrupt your data!</i></span>
	<textarea rows="20" bind:value={importedRawData} placeholder="Enter some JSON..." />
	<div class="controls">
		<button on:click={handleImport}>Import</button>
		<a href="/astrologenie/profile">Back to profiles</a>
	</div>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		text-align: center;
	}

	textarea {
		box-shadow: 0 6px 10px rgb(0 0 0 / 0.5);
		min-width: 400px;
		min-height: 250px;
	}

	button {
		align-self: flex-start;
	}

	.controls {
		margin-top: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
