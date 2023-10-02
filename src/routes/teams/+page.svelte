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

<svelte:head>
	<title>Team Building</title>
	<meta name="description" content="Astro Team Builder" />
</svelte:head>
<div class="wrapper">
	<h3>Use our tool to help choose teams!</h3>
	<span>We've pre-loaded some default values. Feel free to tweak them and see what happens!</span>
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
				Force everyone in a team
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
			<button on:click={handleComputeTeams}>Compute teams</button>
		</div>
	</form>
	<div class="results">
		{#if teams.length > 0}
			<span><b>Suggested teams</b></span>
		{/if}
		<div class="team-grid">
			{#each teams as team, index}
				<div class="team">
					<h2>
						<b>Team {index + 1} (<span style="color: var(--color-theme-1);">{team.score}</span>)</b>
					</h2>
					<ul>
						{#each team.persons as person}
							<li>{person.name}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		{#if remaining.length > 0}
			<div class="remaining">
				<span><b>These people were not assigned to any team</b></span>
				<ul>
					{#each remaining as person}
						<li>{person.name}</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if matrixScore.length > 0}
			<div class="matrix">
				<span><b>Score matrix (computed via profile intersection)</b></span>
				<table>
					<tr>
						<td />
						{#each $profiles as profile}
							<td><b>{profile.name}</b></td>
						{/each}
					</tr>
					{#each matrixScore as rowScore, i}
						<tr>
							<td><b>{$profiles[i].name}</b></td>
							{#each rowScore as score}
								<td>{score}</td>
							{/each}
							<td>-</td>
							{#each [...new Array($profiles.length - i - 1).keys()] as dj}
								<td class="mirror">{matrixScore[dj + i + 1][i]}</td>
							{/each}
						</tr>
					{/each}
				</table>
			</div>
		{/if}
	</div>
	<img src="/astrologenie/favicon.png" alt="meteor" />
</div>

<style>
	.wrapper {
		display: flex;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}

	table,
	td {
		border: 1px solid;
		text-align: center;
		background-color: white;
		box-shadow: 0 6px 10px rgb(0 0 0 / 0.5);
	}

	td.mirror {
		color: lightgray;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		margin-bottom: 15px;
		margin-top: 15px;
	}

	form .row {
		align-self: flex-end;
	}

	.results {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.team-grid {
		display: grid;
		gap: 10px;
		grid-auto-flow: column;
		margin-top: 10px;
	}
	.team {
		background-color: white;
		box-shadow: 0 6px 10px rgb(0 0 0 / 0.5);
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.team ul {
		list-style-type: none;
		margin: 0px;
		padding: 0px 0px 10px 0px;
	}

	.matrix {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 25px;
	}

	.matrix table {
		margin-top: 10px;
	}

	.remaining {
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		box-shadow: 0 6px 10px rgb(0 0 0 / 0.5);
		padding: 10px;
		margin-top: 25px;
	}

	.remaining ul {
		list-style-type: none;
		padding: 0px;
		margin: 10px 0px 0px 0px;
	}
</style>
