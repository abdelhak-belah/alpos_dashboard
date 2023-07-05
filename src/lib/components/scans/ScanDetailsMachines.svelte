<script>
    import {
        currentScan, currentScanMachine, discoverStatus, scanAllIPs,
        scanCIDR,
        scanDate,
        scanIPs, scanIPsSelected,
        scanName,
        scanNavBar,
        scanTime,
        scanType, scanUser
    } from "$lib/store/storeScan.js";
    import ScanDetailsStat from "$lib/components/scans/ScanDetailsStat.svelte";
    import {onDestroy, onMount} from "svelte";

    // export
    export let onCloseMachines;
    export let onShowVulnerabilies

    scanName.set($currentScan.name)

    const addToNav = () => {
        $scanNavBar = $scanNavBar.filter(nav => nav.index !== 1)

        $scanNavBar = [...$scanNavBar, {
            index:1,
            name: $scanName
        }];
    };

    const removeFromNav = () => {
        $scanNavBar = $scanNavBar.filter((item) => {
            return item.name !== $scanName;
        });
    };

    function toggleScanDetailsVulnerability(machine) {
        currentScanMachine.set(machine);
        onShowVulnerabilies();
    }


    onMount(() => {
        addToNav();
    })


</script>


<html>

<main class="flex-1">
    <div class="py-6">

        <!-- Page header -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">Détails du {$currentScan.name}</h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

            <div class="py-4">
                <div class="sm:flex sm:items-center">
                    <ScanDetailsStat/>
                </div>
            </div>


            <div class="mb-10 mt-5 relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-300"></div>
                </div>
            </div>


            <div class="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">

                    {#each $currentScan.machines as machine}
                        <!-- scans 1 -->
                        <li>
                            <div class="block">
                                <div class="px-4 py-4 sm:px-6">
                                    <div class="flex items-center justify-between">
                                        <div class="sm:flex sm:justify-between">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke-width="1.5"
                                                 stroke="currentColor"
                                                 class="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>
                                            </svg>

                                            <p class="truncate text-sm font-medium text-indigo-600">
                                                {machine.ip}
                                            </p>
                                        </div>


                                        <div class="ml-2 flex flex-shrink-0">
                                            {#if machine.numberOfVunerabilities > 0}
                                                <div class="me-8 sm:flex leading-5">
                                                    <p class="flex items-center text-sm text-red-500">
                                                        <!-- Heroicon name: mini/users -->
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             fill="none" viewBox="0 0 24 24"
                                                             stroke-width="1.5"
                                                             stroke="currentColor"
                                                             class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"/>
                                                        </svg>
                                                        {machine.numberOfVunerabilities} vulnérabilités
                                                    </p>
                                                </div>

                                                <div>
                                                    <a href="#"
                                                       class="inline-flex items-center rounded-full border border-blue-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-primary shadow-sm hover:bg-blue-50"
                                                       on:click="{() => toggleScanDetailsVulnerability(machine)}">
                                                        Voir
                                                    </a>
                                                </div>
                                            {:else}
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke-width="1.5"
                                                     stroke="currentColor"
                                                     class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-600">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                                                </svg>
                                            {/if}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- end scans 1 -->
                    {/each}

                </ul>
            </div>


        </div>
    </div>
</main>


</html>
