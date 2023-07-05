import {writable} from "svelte/store";

export let userId = writable();
export let userEmail = writable("")
export let userFirstName = writable("");
export let userLastName = writable("");
export let userRole = writable("");
export let userLocked = writable(false);
export let userDob = writable("");