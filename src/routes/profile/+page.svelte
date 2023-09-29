<script lang="ts">
	import { profiles } from '../../stores';
	import SvgIcon from '@jamescoyle/svelte-icon';
	import { mdiDelete } from '@mdi/js';
	import { AspectCalculator } from '../../lib/logic/AspectCalculator';
	import { onMount } from 'svelte';
	import { HouseCalculator } from '$lib/logic/HouseCalculator';
	import { profileToPersonType } from '$lib/ProfileToPerson';

	onMount(() => {
		const ac = new AspectCalculator();
		const hc = new HouseCalculator();

		const persons = $profiles.map((profile) => {
			return profileToPersonType(profile);
		});

		if (persons.length >= 2) {
			ac.processPeople(persons[0], persons[1]);
			console.log(ac.getPositiveStats());
			console.log(ac.getNegativeStats());
			hc.processHousesToPlacements(persons[0], persons[1]);
			console.log(hc.getHouseOverlays());
		}
	});
</script>

<a href="/profile/add">Add profile</a>
<a href="/profile/import">Import profiles</a>
<a href="/profile/export">Export profiles</a>
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
