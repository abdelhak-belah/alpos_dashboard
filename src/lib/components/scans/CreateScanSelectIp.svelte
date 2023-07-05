<script>

    // store
    import {scanIPs, scanIPsSelected, scanAllIPs, scanCIDR, discoverStatus} from "$lib/store/storeScan.js";

    // api
    import {startDiscover} from "$lib/api/discover/startDiscover.js";

    // functions
    function toggleDiscover() {
        $discoverStatus = !$discoverStatus;
        retrieveIPs();
    }

    const retrieveIPs = async () => {
        $scanIPs = await startDiscover($scanCIDR===''?'192.168.1.0/24':$scanCIDR);
        if ($scanIPs.length > 0) {
            let scanIPsWithCheking = [];
            $scanIPs.forEach( currentIP => {
                scanIPsWithCheking.push({ip: currentIP, checked: false});
            });
            scanIPsSelected.set(scanIPsWithCheking);
            $discoverStatus = false;
        }
    }

    function toggleAll() {
        $scanAllIPs = !$scanAllIPs;
        $scanIPsSelected = $scanIPsSelected.map(scanSelected => {
            return { ...scanSelected, checked: $scanAllIPs };
        });
    }

    function handleCheckboxChange(ip) {
        $scanIPsSelected = $scanIPsSelected.map(scanSelected => {
            if (scanSelected.ip === ip) {
                return { ...scanSelected, checked: !scanSelected.checked };
            }
            return scanSelected;
        });
    }


</script>


<html>

<!-- button -->
<div class="mt-10 sticky">

    <div class="mb-3">
        <label for="cidr"
               class="block text-sm font-semibold leading-6 text-gray-900">
            CIDR Cible
        </label>
        <div class="mt-2">
            <input id="cidr"
                   name="cidr"
                   type="text"
                   autocomplete="192.168.1.0/24"
                   required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   placeholder="Par défaut: 192.168.1.0/24"
                    bind:value={$scanCIDR}>
        </div>
    </div>

    <button type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled="{$discoverStatus}"
            on:click={toggleDiscover}>
        {#if !$discoverStatus}
            <div>Récupérer les IPs</div>
        {:else}
            <div class="inline-flex w-full justify-center items-center  text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue">
                <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <div>Processus de découverte enclenché...</div>
            </div>
        {/if}
    </button>
</div>
<!-- end button -->


<fieldset class="mt-5">

    <!-- IPs header -->
    <div class="relative flex items-start py-4">
        <div class="min-w-0 flex-1 text-sm">
            <label for="all" class="select-none font-medium text-gray-700">
                <legend class="text-lg font-medium text-gray-900">
                    IPs
                </legend>
            </label>
        </div>
        <div class="ml-3 me-3 flex h-5 items-center"
             on:click={toggleAll}>
            <div class="min-w-0 flex-1 text-sm me-2">Toutes</div>
            <input type="checkbox"
                   id="all"
                   name="all"
                   class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                   checked="{$scanAllIPs}">
        </div>
    </div>
    <!-- end IPs header -->


    <div class="h-[calc(100vh-28rem)] sticky top-16 overflow-y-scroll with-scrollbar overscroll-contain divide-y divide-gray-200 border-t border-b border-gray-200">

        <div class="me-2">
            <!-- IPs -->
            {#each $scanIPsSelected as selectedIP}
                <div class="relative flex items-start py-4">
                    <div class="min-w-0 flex-1 text-sm">
                        <label for="ip" class="select-none font-medium text-gray-700">
                            {selectedIP.ip}
                        </label>
                    </div>
                    <div class="ml-3 flex h-5 items-center">
                        <input id="ip"
                               name="ip"
                               type="checkbox"
                               class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                               bind:checked={selectedIP.checked}
                               on:click={() => handleCheckboxChange(selectedIP.ip)}>
                    </div>
                </div>
            {/each}
            <!-- end IPs -->
        </div>


    </div>
</fieldset>
</html>