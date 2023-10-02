<script>
	import { profiles } from '../../../stores';

	$: serialized_profiles = JSON.stringify($profiles);
	let textArea;
</script>

<svelte:head>
	<title>Export Profiles</title>
	<meta name="description" content="Astro Team Builder" />
</svelte:head>

<div>
	<h3>Export profiles</h3>
	<span>Export all currently loaded profiles - share with others so they can import it!</span>
	<textarea bind:this={textArea} rows="20" bind:value={serialized_profiles} />
	<div class="controls">
		<button on:click={() => textArea.select()}>Select all</button>
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
