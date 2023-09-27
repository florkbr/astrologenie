<script lang="ts">
    import {Placement, Sign} from '../../Types.ts';
    import type {Profile} from '../../Types';
    import ProfileView from "../../components/ProfileView.svelte";

    let profile: Profile = {
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

<ProfileView {profile} />
