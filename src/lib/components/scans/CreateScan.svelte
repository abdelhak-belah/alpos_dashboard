<script>
    // components
    import ScanDetails from "$lib/components/scans/CreateScanDetails.svelte";
    import SelectIp from "$lib/components/scans/CreateScanSelectIp.svelte";
    import ScanOverview from "$lib/components/scans/CreateScanOverview.svelte";
    import Loading from "$lib/components/loading/Loading.svelte";

    // store
    import {
        scanName,
        scanDate,
        scanTime,
        scanType,
        scanCIDR,
        scanIPs,
        scanUser,
        discoverStatus,
        scanIPsSelected,
        scanLaucherId,
        scanIPsToSend,
        scanAllIPs
    } from "$lib/store/storeScan.js";
    import {onDestroy} from "svelte";
    import {createScan} from "$lib/api/scans/createScan.js";


    // export
    export let onCloseCreateScan;
    export let onSubmitCreateScan;
    export let menu = 1;

    // variables
    let showLoading = false;
    let scanNameField;
    let scanDateField;
    let scanTimeField;
    let scanTypeField;
    let scanLaucherIdField;
    let scanIPsToSendField;
    let error = '';

    // subscribe
    scanName.subscribe(value => {
        scanNameField = value === '';
    });
    scanDate.subscribe(value => {
        scanDateField = value === '';
    });
    scanTime.subscribe(value => {
        scanTimeField = value === '';
    });
    scanType.subscribe(value => {
        scanTypeField = value.length === 0;
    });
    scanLaucherId.subscribe(value => {
        scanLaucherIdField = value === '';
    });
    scanIPsToSend.subscribe(value => {
        scanIPsToSendField = value.length === 0;
    });


    // methods
    function nextMenu() {
        menu++;
    }

    function previousMenu(currentMenu) {
        menu--;
    }

    function setMenu(step) {
        menu = step;
    }

    function toggleShowLoading() {
        showLoading = !showLoading;
    }

    function closeCreateScan() {
        onCloseCreateScan();
    }


    function checkIfFieldsIsNotEmpty() {
        if ($scanType === 'scheduled') {
            return !scanNameField && !scanDateField && !scanTimeField && !scanTypeField && !scanLaucherIdField && !scanIPsToSendField;
        } else {
            return !scanNameField && !scanTypeField && !scanLaucherIdField && !scanIPsToSendField;
        }
    }

    function submitCreateScan() {
        if (checkIfFieldsIsNotEmpty()){
            // TODO: send scan to backend
            toggleShowLoading();
            createScanRequest();
        } else {
            toggleShowLoading();
            // TODO: show error message
        }
    }

    const createScanRequest = async () => {
        try {
            if ($scanType === 'now') {
                const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                $scanDate = formattedDate.split(' ')[0];
                $scanTime = formattedDate.split(' ')[1];
            }else {
                $scanDate = $scanDate.split('T')[0];
                $scanTime = $scanTime + ":00";
            }


            const scanBody = {
                name: $scanName,
                type: 'SCHEDULED',
                date: $scanDate + " " + $scanTime,
                ips: $scanIPsToSend,
                launcherId: localStorage.getItem('userId'),
                launcherFirstName: localStorage.getItem('userFirstName'),
                launcherLastName: localStorage.getItem('userLastName'),
            };

            const isScanCreated = await createScan(scanBody);
            if (isScanCreated) {
                closeCreateScan();
            }
        } catch (err) {
            toggleShowLoading()
            error = err.message;
        }
    };

    function resetScanDetails() {
        scanName.set('');
        scanDate.set('');
        scanTime.set('');
        scanType.set('');
        scanCIDR.set('');
        scanIPs.set([]);
        scanIPsSelected.set([]);
        scanUser.set('');
        discoverStatus.set(false);
        scanAllIPs.set(false);
    }


    onDestroy(
        () => {
            resetScanDetails();
        }
    )
</script>


<html>
<div class="relative z-10"
     aria-labelledby="modal-title"
     role="dialog"
     aria-modal="true">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <!--
              Modal panel, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">


                <nav aria-label="Progress">
                    <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
                        <li class="md:flex-1">
                            <a href="#"
                               on:click|preventDefault={() => (menu = 1)}
                               class="{menu==1?'border-primary':'border-indigo-600 hover:border-gray-300'} group flex flex-col border-l-4 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                                <span class="{menu==1?'text-primary':'text-gray-500 group-hover:text-gray-700'} text-sm font-medium group-hover:text-indigo-700">
                                    Étape 1
                                </span>
                                <span class="text-sm font-medium">
                                    Détails du scan
                                </span>
                            </a>
                        </li>


                        <li class="md:flex-1">
                            <a href="#"
                               on:click|preventDefault={() => (menu = 2)}
                               class="{menu==2?'border-primary':'border-indigo-600 hover:border-gray-300'} flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
                               aria-current="step">
                                <span class="{menu==2?'text-primary':'text-gray-500 group-hover:text-gray-700'} text-sm font-medium group-hover:text-gray-700">
                                    Étape 2
                                </span>
                                <span class="text-sm font-medium">
                                    Sélectionnez les IPs
                                </span>
                            </a>
                        </li>

                        <li class="md:flex-1">
                            <a href="#"
                               on:click|preventDefault={() => (menu = 3)}
                               class="{menu==3?'border-primary':'border-indigo-600 hover:border-gray-300'} group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                                <span class="{menu==3?'text-primary':'text-gray-500 group-hover:text-gray-700'} text-sm font-medium">
                                    Étape 3
                                </span>
                                <span class="text-sm font-medium">
                                    Aperçu
                                </span>
                            </a>
                        </li>

                    </ol>
                </nav>


                <!-- Host -->

                {#if showLoading}
                    <div class="flex items-center justify-center h-[calc(100vh-18rem)]">
                        <Loading/>
                    </div>

                {:else }
                    {#if menu === 1}
                        <div class="mt-5">
                            <ScanDetails/>
                        </div>
                    {:else if menu === 2}
                        <div class="mt-5">
                            <SelectIp/>
                        </div>
                    {:else if menu === 3}
                        <div class="mt-5">
                            <ScanOverview/>
                        </div>
                    {/if}
                {/if}
                <!-- End Host -->


                <!-- navigation button -->
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button type="submit"
                            class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                            on:click="{menu===3?submitCreateScan:nextMenu}">
                        {menu < 3 ? 'Suivant' : 'Lancer'}
                    </button>
                    <button type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                            on:click={closeCreateScan}>
                        Annuler
                    </button>
                </div>
                <!-- end navigation button -->


            </div>
        </div>
    </div>
</div>
</html>