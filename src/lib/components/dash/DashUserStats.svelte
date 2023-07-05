<script>
    // variables
    import {writable} from "svelte/store";
    import {getScansByLauncherId} from "$lib/api/scans/getScansByLauncherId.js";
    import {onMount} from "svelte";

    let scans = writable([]);
    let error = '';
    let daysAfterLastScan = writable(0);
    let totalVulnerabilities = writable(0);

    function getDaysAfterLastScan() {
        // Find the latest createdDate among all the scans
        let latestDate = new Date(0);
        $scans.forEach((scan) => {
            const createdDate = new Date(scan.createdDate);
            if (createdDate > latestDate) {
                latestDate = createdDate;
            }
        });

        // Calculate the number of days between the latest createdDate and the current date
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - latestDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        daysAfterLastScan.set(daysDiff);
    }

    function getTotalVulnerabilities() {
        let sumOfVulnerabilities = 0;
        $scans.forEach((scan) => {
            sumOfVulnerabilities += scan.numberOfVulnerabilities;
        });
        totalVulnerabilities.set(sumOfVulnerabilities)
    }



    // fetch scans by launcher id
    const fetchScansByLauncherId = async () => {
        console.log('fetching scans by launcher id');
        try {
            const scansFeteched = await getScansByLauncherId(localStorage.getItem('userId'));
            scans.set(scansFeteched);
            console.log(scansFeteched);
            getDaysAfterLastScan();
            getTotalVulnerabilities();
        } catch (err) {
            error = err.message;
        }
    };

    onMount(fetchScansByLauncherId)
</script>





<html>

<!-- Page header -->
<div class="bg-white shadow">
    <!-- Profile -->
    <section aria-labelledby="profile-overview-title">
        <div class=" bg-white overflow-hidden shadow">
            <h2 class="sr-only"
                id="profile-overview-title">
                Profile Overview
            </h2>
            <div class="bg-white p-6">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="sm:flex sm:space-x-5">
                        <div class="flex-shrink-0">
                            <img class="mx-auto h-20 w-20 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt="">
                        </div>
                        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p class="text-sm font-medium text-gray-600">
                                Ravis de vous revoir,
                            </p>
                            <p class="text-xl font-bold text-gray-900 sm:text-2xl">
                                {localStorage.getItem('userFirstName')} {localStorage.getItem('userLastName')}
                            </p>
                            <p class="text-sm font-medium text-gray-600">
                                Manager
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                <div class="px-6 py-5 text-sm font-medium text-center">
                    <span class="text-gray-900">{$scans.length}</span>
                    <span class="text-gray-600">Scans lancés</span>
                </div>

                <div class="px-6 py-5 text-sm font-medium text-center">
                    <span class="text-gray-900">{$daysAfterLastScan}</span>
                    <span class="text-gray-600">Jours depuis le dernière scan</span>
                </div>

                <div class="px-6 py-5 text-sm font-medium text-center">
                    <span class="text-gray-900">{$totalVulnerabilities}</span>
                    <span class="text-gray-600">Vunerabilités trouvées</span>
                </div>
            </div>
        </div>
    </section>
</div>


</html>