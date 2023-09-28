<script>
import AddProfile from '../../../components/AddProfile.svelte';
import { goto } from '$app/navigation';
import { profiles } from '../../../stores';

</script>

<AddProfile on:profile={event => {
    const profile = event.detail;
    const current = $profiles.find(p => p.name === profile.name);

    if (current) {
        alert('A profile with that name already exists');
        return;
    }

    $profiles = [...$profiles, profile];
    goto('/profile');

}} />
