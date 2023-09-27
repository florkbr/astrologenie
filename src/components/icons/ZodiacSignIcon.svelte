<script lang="ts">
    import {Sign} from "../../Types.js";
    import SvgIcon from '@jamescoyle/svelte-icon';
    import {
        mdiZodiacAries,
        mdiZodiacTaurus,
        mdiZodiacGemini,
        mdiZodiacCancer,
        mdiZodiacLeo,
        mdiZodiacVirgo,
        mdiZodiacLibra,
        mdiZodiacScorpio,
        mdiZodiacSagittarius,
        mdiZodiacCapricorn,
        mdiZodiacAquarius,
        mdiZodiacPisces
    } from '@mdi/js';

    export let sign: Sign;

    const mdiPathMap: Record<Sign, string> = {
        [Sign.Aries]: mdiZodiacAries,
        [Sign.Taurus]: mdiZodiacTaurus,
        [Sign.Gemini]: mdiZodiacGemini,
        [Sign.Cancer]: mdiZodiacCancer,
        [Sign.Leo]: mdiZodiacLeo,
        [Sign.Virgo]: mdiZodiacVirgo,
        [Sign.Libra]: mdiZodiacLibra,
        [Sign.Scorpio]: mdiZodiacScorpio,
        [Sign.Sagittarius]: mdiZodiacSagittarius,
        [Sign.Capricorn]: mdiZodiacCapricorn,
        [Sign.Aquarius]: mdiZodiacAquarius,
        [Sign.Pisces]: mdiZodiacPisces,
    }

    $: path = mdiPathMap[sign];

</script>

<SvgIcon type="mdi" {path} />
