<script lang="ts">
	import ZodiacSignIcon from './icons/ZodiacSignIcon.svelte';
	import PlacementIcon from './icons/PlacementIcon.svelte';
	import type { Profile } from '../Types';
	import ElementIcon from './icons/ElementIcon.svelte';
	import { ElementFromSign, ModalityFromSign, RelevantHouses } from '../Types';
	import HouseIcon from './icons/HouseIcon.svelte';

	export let profile: Profile;
</script>

<h1>{profile.name}</h1>
<table class="profile">
	<thead>
		<tr>
			<th>What</th>
			<th>Sign</th>
			<th>Element</th>
			<th>Modality</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(profile.planets) as [placement, data]}
			<tr>
				<td>
					<PlacementIcon {placement} />
				</td>
				<td>
					<ZodiacSignIcon sign={data.sign} />
					({data.sign})
				</td>
				<td>
					<ElementIcon element={ElementFromSign[data.sign]} />
				</td>
				<td>
					{ModalityFromSign[data.sign]}
				</td>
			</tr>
		{/each}
		{#each RelevantHouses as houseIndex}
			<tr>
				<td>
					<HouseIcon index={houseIndex} />
				</td>
				<td>
					<ZodiacSignIcon sign={profile.houses[houseIndex].sign} />
					({profile.houses[houseIndex].sign})
				</td>
				<td>
					<ElementIcon element={ElementFromSign[profile.houses[houseIndex].sign]} />
				</td>
				<td>
					{ModalityFromSign[profile.houses[houseIndex].sign]}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.profile {
		width: 500px;
		align-self: center;
	}

	.profile td {
		text-align: center;
	}
</style>
