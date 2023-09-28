import {writable} from 'svelte/store';
import type {Profile} from "./Types";
import { browser } from "$app/environment";

const LOCALSTORAGE_PROFILE_KEY = 'profiles';

let storedProfiles;
if (browser) {
    storedProfiles = localStorage.getItem(LOCALSTORAGE_PROFILE_KEY);
}


export const profiles = writable<Array<Profile>>(
    storedProfiles ? JSON.parse(storedProfiles) : []
);

profiles.subscribe(value => {
    if (browser) {
        localStorage.setItem(LOCALSTORAGE_PROFILE_KEY, JSON.stringify(value));
    }
});
