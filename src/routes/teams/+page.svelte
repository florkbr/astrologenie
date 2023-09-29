<script lang="ts">
	import { Person } from '$lib/types/Person';
	import { buildTeams } from '$lib/logic/TeamBuilder';
	import type { Team } from '$lib/logic/TeamBuilder';
	import { profiles } from '../../stores';
	import { profileToPersonType } from '$lib/ProfileToPerson';

	let teams: Array<Team> = [];
	let remaining: Array<Person> = [];
	let matrixScore: Array<Array<number>> = [];

	let numberOfTeams = 4;
	let maxCountPerTeam = undefined;
	let splitRemaining = false;
	let iterations = 100;

	const handleComputeTeams = () => {
		[teams, remaining, matrixScore] = buildTeams($profiles.map(profileToPersonType), {
			numberOfTeams: numberOfTeams,
			splitRemaining: splitRemaining,
			maxCountPerTeam: maxCountPerTeam,
			iterations: iterations
		});
	};
</script>

<form>
	<div class="row">
		<label>
			Number of teams:
			<input bind:value={numberOfTeams} type="number" />
		</label>
	</div>
	<div class="row">
		<label>
			Max persons per team:
			<input bind:value={maxCountPerTeam} type="number" />
		</label>
	</div>
	<div class="row">
		<label>
			Split remaining people
			<input bind:checked={splitRemaining} type="checkbox" /><br />
		</label>
	</div>
	<div class="row">
		<label>
			Number of iterations
			<input bind:value={iterations} type="number" /><br />
		</label>
	</div>
	<div>
		<button on:click={handleComputeTeams}>Compute teams!</button>
	</div>
</form>

{#each teams as team, index}
	<div>
		<h2>Team {index + 1} ({team.score})</h2>
		<ul>
			{#each team.persons as person}
				<li>{person.name}</li>
			{/each}
		</ul>
	</div>
{/each}

{#if remaining.length > 0}
	<div>
		<span>These people didn't get assigned to any team</span>
		<ul>
			{#each remaining as person}
				<li>{person.name}</li>
			{/each}
		</ul>
	</div>
{/if}

{#if matrixScore.length > 0}
	<div>
		<span>Matrix score computed between pairs</span>
		<table>
			<tr>
				<td />
				{#each $profiles as profile}
					<td>{profile.name}</td>
				{/each}
			</tr>
			{#each matrixScore as rowScore, index}
				<tr>
					<td>{$profiles[index].name}</td>
					{#each rowScore as score}
						<td>{score}</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
{/if}

<style>
	table,
	td {
		border: 1px solid;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
