<script>
    // components
    import BtnWithDropDown from "$lib/components/elements/BtnWithDropDown.svelte";
    // svelte
    import {afterUpdate, onMount} from "svelte";
    import {writable} from "svelte/store";
    // api
    import {getAllScans} from "$lib/api/scans/getAllScans.js";
    // util
    import {openPDF} from "$lib/util/openPDF.js";

    // variables
    let scansToDisplay = writable([]);
    let currentPage = 1;
    const itemsPerPage = 6; // Number of items to display per page
    let showSortMenu = false;
    let scans = writable([]);
    let error = '';
    let sortDirection = 'asc';

    // Computed property to dynamically sort scans based on sort direction
    $: sortedScans = $scansToDisplay.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.name.localeCompare(b.name);
        } else if(sortDirection === 'desc') {
            return b.name.localeCompare(a.name);
        } else if(sortDirection === 'asc_date'){
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        } else {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        }
    });


    // functions
    function toggleSortMenu() {
        showSortMenu = !showSortMenu;
    }


    // Function to sort scans by scan name from A to Z
    function sortScansByNameAtoZ() {
        toggleSortMenu();
        sortDirection = 'asc'
    }

    function sortScansByNameZtoA() {
        toggleSortMenu();
        sortDirection = 'desc'
    }

    function sortScansByDateAsc() {
        toggleSortMenu();
        sortDirection = 'asc_date'
    }

    function sortScansByDateDesc() {
        toggleSortMenu();
        sortDirection = 'desc_date'
    }


    function requestOpenPdf(scan){
        openPDF(scan)
    }


    const fetchScans = async () => {
        try {
            const scansFeteched = await getAllScans();
            scans.set(scansFeteched)
            dataPagination(currentPage)
        } catch (err) {
            error = err.message;
        }
    };


    function dataPagination(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageScans = $scans.slice(startIndex, endIndex);
        $scansToDisplay = pageScans;
    }

    function goToPage(page) {
        if (page !== currentPage) {
            currentPage = page;
            dataPagination(currentPage);
        }
    }

    function getTotalPages() {
        return Math.ceil($scans.length / itemsPerPage);
    }

    function getDisplayRange() {
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(startIndex + itemsPerPage - 1, $scans.length);
        return {startIndex, endIndex};
    }

    onMount(() => {
        fetchScans();
    });

    // Update sort direction and sorted scans whenever scans change
    afterUpdate(() => {
        if (sortDirection === 'asc') {
            sortedScans = $scansToDisplay.sort((a, b) => a.name.localeCompare(b.name));
        } else if(sortDirection === 'desc') {
            sortedScans = $scansToDisplay.sort((a, b) => b.name.localeCompare(a.name));
        } else if(sortDirection === 'asc_date'){
            sortedScans = $scansToDisplay.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB
            });
        } else {
            sortedScans = $scansToDisplay.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
        }
    });
</script>


<main class="flex-1">
    <div class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">
                Repports
            </h1>
        </div>

        <div class="mt-3 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <div class="relative">
                        <button type="button"
                                class="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                id="sort-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                on:click="{toggleSortMenu}">
                            <!-- Heroicon name: solid/sort-ascending -->
                            <svg class="mr-3 h-5 w-5 text-gray-400"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20"
                                 fill="currentColor"
                                 aria-hidden="true">
                                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"/>
                            </svg>
                            Trier
                            <!-- Heroicon name: solid/chevron-down -->
                            <svg class="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                        {#if showSortMenu}
                            <!-- Dropdown menu, show/hide based on menu state. -->
                            <div class="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                 role="menu" aria-orientation="vertical" aria-labelledby="sort-menu-button"
                                 tabindex="-1">
                                <div class="py-1" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a href="#"
                                       class="text-gray-700 block px-4 py-2 text-sm"
                                       role="menuitem"
                                       tabindex="-1"
                                       id="sort-menu-item-0"
                                       on:click="{sortScansByNameAtoZ}">
                                        Nom de A à Z
                                    </a>
                                    <a href="#"
                                       class="text-gray-700 block px-4 py-2 text-sm"
                                       role="menuitem"
                                       tabindex="-1"
                                       id="sort-menu-item-1"
                                       on:click={sortScansByNameZtoA}>
                                        Nom de Z à A
                                    </a>
                                    <a href="#"
                                       class="text-gray-700 block px-4 py-2 text-sm"
                                       role="menuitem"
                                       tabindex="-1"
                                       id="sort-menu-item-2"
                                       on:click={sortScansByDateAsc}>
                                        Date par ordre croissant
                                    </a>
                                    <a href="#"
                                       class="text-gray-700 block px-4 py-2 text-sm"
                                       role="menuitem"
                                       tabindex="-1"
                                       id="sort-menu-item-30"
                                       on:click={sortScansByDateDesc}>
                                        Date par ordre décroissant</a>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <!-- scans reports -->

        <div class=" overflow-x-auto  mt-2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col mt-2 mb-2">
                <div class="shadow align-middle ring-1 ring-opacity-5 overflow-x-auto min-w-fullshadow sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Scan
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lancé par
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th class="relative py-3.5 pl-3 pr-4 sm:pr-6 bg-gray-50">
                                <span class="sr-only">Modifier</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">


                        {#each sortedScans as scan}
                            {#if scan.status === 'FINISHED'}
                                <tr class="bg-white">
                                    <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div class="flex">
                                            <a href="#"
                                               class="group inline-flex space-x-2 truncate text-sm"
                                               on:click={()=>requestOpenPdf(scan)}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke-width="1.5"
                                                     stroke="currentColor"
                                                     class="flex-shrink-0 h-5 w-5 text-blue-400 group-hover:text-blue-500"
                                                     aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                                </svg>

                                                <p class="text-gray-500 truncate group-hover:text-gray-900">
                                                    {scan.name}
                                                </p>
                                            </a>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                    <span class="text-gray-500">
                                        {scan.id}
                                    </span>
                                    </td>
                                    <td class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                    <span class="text-gray-500 ">
                                        {scan.launcherFirstName} {scan.launcherLastName}
                                    </span>
                                    </td>
                                    <td class="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <time datetime="2020-07-11">
                                            {scan.date.split(' ')[0]} à {scan.date.split(' ')[1]}
                                        </time>
                                    </td>
                                    <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                                        <BtnWithDropDown scanData="{scan}"/>
                                    </td>
                                </tr>
                            {/if}
                        {/each}


                        <!-- More transactions... -->
                        </tbody>
                    </table>
                    <!-- Pagination -->
                    <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                         aria-label="Pagination">
                        <div class="hidden sm:block">
                            <p class="text-sm text-gray-700">
                                Affichage
                                <span class="font-medium text-primary">{getDisplayRange().startIndex}</span>
                                de
                                <span class="font-medium text-primary">
                                    {getDisplayRange().endIndex}
                                </span>
                                à
                                <span class="font-medium text-primary">
                                    {$scans.length}
                                </span>
                                résultats
                            </p>
                        </div>
                        <div class="flex-1 flex justify-between sm:justify-end">
                            <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    on:click={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}>
                                Précédent
                            </button>
                            <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    on:click={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === getTotalPages()}>
                                Suivant
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <!-- end of scans reports -->

    </div>
</main>