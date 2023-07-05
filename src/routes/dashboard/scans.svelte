<script>
    // store
    import {currentScan} from "$lib/store/storeScan.js";
    // components
    import CreateScan from "$lib/components/scans/CreateScan.svelte";
    import ScanDetails from "$lib/components/scans/ScanDetails.svelte";
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import {getAllScans} from "$lib/api/scans/getAllScans.js";
    import Loading from "$lib/components/loading/Loading.svelte";
    import Success from "$lib/components/success/Success.svelte";


    // variables
    let showCreateScan = false;
    let showScanDetails = false;
    let isRefreshScans = false;
    let isShowSuccess = false;
    let scans = writable([]);
    let error = '';

    function toggleRefreshUsers() {
        isRefreshScans = !isRefreshScans;
    }

    // functions
    function toggleCreateScan() {
        showCreateScan = !showCreateScan;
    }

    function toggleSuccess() {
        isShowSuccess = !isShowSuccess;
    }

    function toggleScanDetails(scan) {
        currentScan.set(scan)
        showScanDetails = !showScanDetails;
    }

    function closeScanDetails() {
        showScanDetails = !showScanDetails;
    }

    function closeCreateScan(){
        toggleSuccess();
        fetchScans();
    }

    const fetchScans = async () => {
        toggleRefreshUsers()
        try {
            const scansFeteched = await getAllScans();
            scans.set(scansFeteched)
            toggleRefreshUsers()
        } catch (err) {
            error = err.message;
        }
    };

    function refreshScans() {

    }

    onMount(fetchScans)
</script>


{#if showCreateScan}
    <CreateScan onCloseCreateScan="{toggleCreateScan}"
                onSubmitCreateScan="{closeCreateScan}"/>
{/if}

{#if isShowSuccess}
    <Success title="Succès"
             message="Le scan a été créée avec succès"
             btnMessage="Revenir au tableau de bord"
             onCloseSuccess="{toggleSuccess}"/>
{/if}

{#if isRefreshScans}
    <Loading/>
{:else}

    {#if showScanDetails}
        <ScanDetails onCloseScanDetails="{closeScanDetails}"/>
    {:else }
        <html>
        <main class="flex-1">


            <div class="py-6">

                <!-- Page header -->
                <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <h1 class="text-2xl font-semibold text-gray-900">Scans</h1>
                </div>
                <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

                    <div class="py-4">
                        <div class="sm:flex sm:items-center">
                            <div class="sm:flex-auto">
                                <h1 class="text-xl font-semibold text-gray-900">

                                </h1>
                                <p class="mt-2 text-sm text-gray-700">

                                </p>
                            </div>
                            <!-- refresh button -->
                            <button type="button"
                                    disabled=""
                                    class="inline-block {isRefreshScans?'animate-spin':''} rounded-full text-gray-600 bg-white shadow-sm  p-2 uppercase leading-normal transition duration-150 ease-in-out  focus:bg-primary-600  active:bg-primary-700  hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    on:click="{fetchScans}">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor"
                                     class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                            </button>
                            <!-- end refresh button -->

                            <div class="mt-4 sm:mt-0 sm:ml-3 sm:flex-none">
                                <button type="button"
                                        class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                        on:click={toggleCreateScan}>
                                    Créer un scan
                                </button>
                            </div>
                        </div>
                    </div>


                    <div class="overflow-hidden bg-white shadow sm:rounded-md">
                        <ul role="list" class="divide-y divide-gray-200">

                            {#each $scans as scan}
                                <!-- scans 1 -->
                                <li>
                                    <a href="#"
                                       class="{scan.status ==='RUNNING' || scan.status ==='SCHEDULED'?'pointer-events-none cursor-not-allowed':''} block hover:bg-gray-50"
                                       on:click="{() => toggleScanDetails(scan)}">
                                        <div class="px-4 py-4 sm:px-6">
                                            <div class="flex items-center justify-between">
                                                <p class="truncate text-sm font-medium text-indigo-600">
                                                    {scan.name}
                                                </p>
                                                <div class="ml-2 flex flex-shrink-0">
                                                    <p class="inline-flex rounded-full {scan.status === 'RUNNING'?'bg-red-100 text-red-800':''} {scan.status === 'SCHEDULED'?'bg-orange-100 text-orange-800':''} {scan.status === 'FINISHED'?'bg-green-100 text-green-800':''} px-2 text-xs font-semibold leading-5">
                                                        {scan.status === 'RUNNING' ? 'En cours' : ''}
                                                        {scan.status === 'SCHEDULED' ? 'Planifié' : ''}
                                                        {scan.status === 'FINISHED' ? 'Terminé' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="mt-2 sm:flex sm:justify-between">
                                                <div class="sm:flex">
                                                    <p class="flex items-center text-sm text-gray-500">
                                                        <!-- Heroicon name: mini/users -->
                                                        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 20 20"
                                                             fill="currentColor"
                                                             aria-hidden="true">
                                                            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z"/>
                                                        </svg>
                                                        {scan.launcherFirstName} {scan.launcherLastName}
                                                    </p>
                                                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                        <!-- Heroicon name: mini/map-pin -->
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 20 20"
                                                             fill="currentColor"
                                                             class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400">
                                                            <path fill-rule="evenodd"
                                                                  d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
                                                                  clip-rule="evenodd"/>
                                                        </svg>
                                                        {scan.id}
                                                    </p>
                                                </div>
                                                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <!-- Heroicon name: mini/calendar -->
                                                    <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 20 20"
                                                         fill="currentColor"
                                                         aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                    <p>
                                                        Lancé le
                                                        <time datetime="2020-01-07">{scan.date.split(' ')[0]}
                                                            à {scan.date.split(' ')[1]}</time>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <!-- end scans 1 -->
                            {/each}

                        </ul>
                    </div>


                </div>
            </div>
        </main>


        </html>

    {/if}

{/if}