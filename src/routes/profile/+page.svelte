<script lang="ts">
	import { profiles } from '../../stores';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import { mdiDelete } from '@mdi/js';
</script>

<a href="/profile/add">Add profile</a>
<ul>
	{#each $profiles as profile}
		<li>
			<a href="/profile/view/{profile.name}">{profile.name}</a>
			<a
				class="delete"
				href="#delete"
				on:click={() => {
					$profiles = $profiles.filter((p) => p.name !== profile.name);
				}}
			>
				<SvgIcon type="mdi" path={mdiDelete} />
			</a>
		</li>
	{/each}
</ul>

<style>
</style>
