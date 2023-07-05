import { writable} from "svelte/store";

export let scanLaucherId = writable();
export let scanName = writable("");
export let scanDate = writable(new Date().toISOString().slice(0, 16));
export let scanTime = writable("");
export let scanType = writable("now");
export let scanCIDR = writable("");
export let scanIPsToSend = writable([]);
export let scanUser = writable("");


export let discoverStatus = writable(false);
export let scanAllIPs = writable(false);
export let scanIPs = writable([]);
export let scanIPsSelected = writable([]);

export let scanNavBar = writable([]);
export let currentScan = writable([]);
export let currentScanMachine = writable({});
export let currentScans = writable([]);