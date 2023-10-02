<script lang="ts">
	import { profiles } from '../../../../stores';
	import { goto } from '$app/navigation';
	import ProfileView from '../../../../components/ProfileView.svelte';

	export let data;

	$: profile = $profiles.find((p) => p.name === data.name) ?? null;

	if (profile === null) {
		goto('/astrologenie/profile');
	}
</script>

<svelte:head>
	<title>Your Profile</title>
	<meta name="description" content="Astro Team Builder" />
</svelte:head>

{#if profile}
	<div>
		<ProfileView {profile} />
		<div class="controls">
			<a href="/astrologenie/profile/view/{profile.name}/chart">View my chart</a>
			<a href="/astrologenie/profile">Back to profiles</a>
		</div>
	</div>
{/if}

<style>
	.controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 15px;
	}

	.controls *:nth-child(n) {
		margin-top: 10px;
	}
</style>
