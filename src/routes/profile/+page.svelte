<script lang="ts">
    import {Placement, Sign} from '../../Types.ts';
    import type {Profile} from '../../Types';
    import ZodiacSign from "../../components/ZodiacSign.svelte";
    import PlacementIcon from "../../components/PlacementIcon.svelte";

    let person: Profile = {
        name: 'John Doe',
        placement: {
            [Placement.Sun]: Sign.Cancer,
            [Placement.Rising]: Sign.Gemini,
            [Placement.Moon]: Sign.Libra,
            [Placement.Mercury]: Sign.Leo,
            [Placement.Mars]: Sign.Capricorn,
            [Placement._2ndHouse]: Sign.Cancer,
            [Placement._3rdHouse]: Sign.Leo,
            [Placement._6thHouse]: Sign.Scorpio,
            [Placement._10thHouse]: Sign.Pisces,
            [Placement._11thHouse]: Sign.Aries
        }
    }
</script>

<style>
    .profile {
        width: 300px;
        align-self: center;
    }

    .profile td {
        text-align: center;
    }
</style>

<h1>{person.name}</h1>
<table class="profile">
    <thead>
        <tr>
            <th>What</th>
            <th>Sign</th>
        </tr>
    </thead>
    <tbody>
    {#each Object.entries(person.placement) as [placement, sign]}
        <tr>
            <td>
                <PlacementIcon {placement} />
            </td>
            <td>
                <ZodiacSign {sign} />
                ({sign})
            </td>
        </tr>
    {/each}
    </tbody>
</table>
