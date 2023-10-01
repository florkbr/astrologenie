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

<svelte:head>
	<title>Profiles</title>
	<meta name="description" content="Astro Team Builder" />
</svelte:head>
<h3>Get started by creating profiles for yourself and your teammates!</h3>
<a href="/profile/add">Add profile</a>
<a href="/profile/import">Import profiles</a>
<a href="/profile/export">Export profiles</a>
<h4>Loaded Profiles</h4>
<span>View a profile by clicking the name.</span>
<span>Delete a profile by clicking the trashcan next to the name.</span>
<ul>
	{#if $profiles.length < 1}
		<i>Such empty... Vast nothing... Wow...</i>
	{/if}
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
	* {
		align-self: center;
	}
	h3 {
		text-align: center;
	}
	h4 {
		padding-top: 10px;
	}
	ul {
		position: relative;
		padding: 0;
		background: white;
		min-width: 250px;
		min-height: 250px;
		box-shadow: 0 6px 10px rgb(0 0 0 / 0.5);
		list-style-type: none;
	}
	ul i {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	ul li {
		display: flex;
		padding: 10px;
	}
</style>
