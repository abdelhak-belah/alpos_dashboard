<script>
    // data
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import {getAllScans} from "$lib/api/scans/getAllScans.js";


    // variables
    let last5Scans = writable([]);
    let scans = writable([]);
    let error = '';

    // fetch all scans
    const fetchScans = async () => {
        try {
            const scansFeteched = await getAllScans();
            scans.set(scansFeteched)
            getLast5Scans();
        } catch (err) {
            error = err.message;
        }
    };


    function getLast5Scans() {
        // Sort the scans array in descending order by createdDate
        $scans.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

        // Get the last 5 created scans
        const last5CreatedScans = $scans.slice(0, 5);
        last5Scans.set(last5CreatedScans);
    }


    onMount(fetchScans);
</script>


<div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     class="h-6 w-6 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
                <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                        Scans récents
                    </dt>
                    <dd>
                        <div class="text-lg font-medium text-gray-900">
                            5 derniers scans
                        </div>
                    </dd>
                </dl>
            </div>
        </div>


        <div class="mt-5 overflow-hidden bg-white sm:rounded-md">
            <ul role="list"
                class="divide-y divide-gray-100">
                {#each $last5Scans as lastScan}
                    <!-- scans 1 -->
                    <li>
                        <a href="#"
                           class="{lastScan.status === 'RUNNING' || lastScan.status === 'SCHEDULED'?'pointer-events-none cursor-not-allowed':''} block hover:bg-gray-50">
                            <div class="py-4 sm:px-6">
                                <div class="flex items-center justify-between">
                                    <p class="ml-5 truncate text-sm  text-gray-500">
                                        {lastScan.name} <span class="font-medium">Par</span> {lastScan.launcherFirstName} {lastScan.launcherLastName}
                                    </p>
                                    <div class="ml-2 flex flex-shrink-0">
                                        <p class="inline-flex rounded-full {lastScan.status === 'RUNNING'?'bg-red-100 text-red-800':''} {lastScan.status === 'SCHEDULED'?'bg-orange-100 text-orange-800':''} {lastScan.status === 'FINISHED'?'bg-green-100 text-green-800':''} px-2 text-xs font-semibold leading-5">
                                            {lastScan.status === 'RUNNING'?'En cours':''}
                                            {lastScan.status === 'SCHEDULED'?'Planifié':''}
                                            {lastScan.status === 'FINISHED'?'Terminé':''}
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