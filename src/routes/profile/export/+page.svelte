<script>
	import { profiles } from '../../../stores';

	$: serialized_profiles = JSON.stringify($profiles);
	let textArea;
</script>

<a href="/profile">Back to profile</a>
<div>
	<span>Export all your information - just pass this data so others can import it.</span>
	<button on:click={() => textArea.select()}>Select all</button>
	<textarea bind:this={textArea} rows="20" bind:value={serialized_profiles} />
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
