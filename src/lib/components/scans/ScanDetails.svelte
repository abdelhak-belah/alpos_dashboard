<script>
    // components
    import ScanDetailsVulnerability from "$lib/components/scans/ScanDetailsVulnerability.svelte";
    import ScanDetailsMachines from "$lib/components/scans/ScanDetailsMachines.svelte";
    // stores
    import {
        discoverStatus, scanAllIPs,
        scanCIDR,
        scanDate,
        scanIPs,
        scanIPsSelected,
        scanNavBar,
        scanTime,
        scanType, scanUser
    } from "$lib/store/storeScan.js";
    import {scanName} from "$lib/store/storeScan.js";
    import {currentScan} from "$lib/store/storeScan.js";
    import {currentScanMachine} from "$lib/store/storeScan.js";
    // svelte
    import {onDestroy, onMount} from "svelte";


    // export
    export let onCloseScanDetails;

    let showScanDetailsVulnerability = false;


    function closeDetailsVulnerability(){
        showScanDetailsVulnerability = false;
        $scanNavBar = $scanNavBar.filter( scan => scan.index !== 2)
    }

    function closeDetailsMachines(){
        $scanNavBar = $scanNavBar.filter( scan => scan.index !== 1)
    }

    function showDetailsVulnerability(){
        showScanDetailsVulnerability = true;
    }

    function showDetailsMachines(){
        showScanDetailsVulnerability = false
        $scanNavBar = $scanNavBar.filter( scan => scan.index !== 2)
    }


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



    function handleNavBar(nav) {
        if (nav.index === 1){
            showScanDetailsVulnerability = false;
        }
        if (nav.index === 2){
            showScanDetailsVulnerability = true;
        }
    }

    onDestroy(() => {
        resetScanDetails();
        scanNavBar.set([])
    })
</script>



<html>
   <!-- Navigation Bar -->
   <nav class="flex border-b border-gray-200 bg-white"
        aria-label="Breadcrumb">
       <ol role="list" class="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">

           <li class="flex">
               <div class="flex items-center">
                   <a href="#"
                      class="text-gray-400 hover:text-gray-500"
                      on:click={()=>onCloseScanDetails()}>
                       <!-- Heroicon name: mini/home -->
                       <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6">
                           <path stroke-linecap="round"
                                 stroke-linejoin="round"
                                 d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                       </svg>
                       <span class="sr-only">Scans</span>
                   </a>
               </div>
           </li>

           {#each $scanNavBar as nav}
               <li class="flex">
                   <div class="flex items-center">
                       <svg class="h-full w-6 flex-shrink-0 text-gray-200"
                            viewBox="0 0 24 44"
                            preserveAspectRatio="none"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true">
                           <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"/>
                       </svg>
                       <a href="#"
                          class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                          on:click={handleNavBar(nav)}>
                           {nav.name}
                       </a>
                   </div>
               </li>
           {/each}

       </ol>
   </nav>
   <!-- end of Navigation Bar -->





</html>









{#if showScanDetailsVulnerability}
    <ScanDetailsVulnerability onCloseVulnerabilies="{closeDetailsVulnerability}"
                              onShowMachines="{showDetailsMachines}"/>
{:else}
    <ScanDetailsMachines onCloseMachines="{closeDetailsMachines}"
                         onShowVulnerabilies="{showDetailsVulnerability}"/>
{/if}