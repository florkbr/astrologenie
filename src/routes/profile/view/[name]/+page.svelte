<script lang="ts">
	import { profiles } from '../../../../stores';
	import { goto } from '$app/navigation';
	import ProfileView from '../../../../components/ProfileView.svelte';

	export let data;

	$: profile = $profiles.find((p) => p.name === data.name) ?? null;

	if (profile === null) {
		goto('/profile');
	}
</script>

{#if profile}
	<a href="/profile">Back to list</a>
	<a href="/profile/view/{profile.name}/chart">View my chart</a>
	<ProfileView {profile} />
{/if}
