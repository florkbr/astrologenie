<script lang="ts">

    import {Modality} from "../../Types";
    import SvgIcon from '@jamescoyle/svelte-icon';
    import {
        mdiTsunami, // water
        mdiImageFilterHdr, // earth
        mdiFire, // fire
    } from "@mdi/js";

    export let modality: Modality;

    const mdiPathMap: Record<Modality, string> = {
        [Modality.Cardinal]: mdiTsunami,
        [Modality.Fixed]: mdiImageFilterHdr,
        [Modality.Mutable]: mdiFire,
    }

    $: path = mdiPathMap[modality];
</script>

<SvgIcon type="mdi" {path} />
