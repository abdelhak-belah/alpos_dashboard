<script>
    // components
    import {Doughnut} from 'svelte-chartjs';
    import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale} from 'chart.js';
    // svelte
    import {onMount} from "svelte";
    // api
    import {getAllScans} from "$lib/api/scans/getAllScans.js";
    import {writable} from "svelte/store";

    // variables
    let scans = writable([]);
    let error = '';
    let totalOfVulnerabilities = writable(0);
    const severitySums = {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        CRITICAL: 0,
        UNKNOWN: 0,
    };


    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);


    let data;


    function getLast30DaysVunerabilities() {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const sumOfVulnerabilities = $scans
            .filter(scan => scan.status === "FINISHED" && new Date(scan.createdDate) >= thirtyDaysAgo)
            .reduce((sum, scan) => sum + scan.numberOfVulnerabilities, 0);

        totalOfVulnerabilities.set(sumOfVulnerabilities);
    }


    function getLast30DaysVunerabilitiesForEachSeverity() {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        $scans
            .filter(scan => scan.status === "FINISHED" && new Date(scan.createdDate) >= thirtyDaysAgo)
            .forEach(scan => {
                scan.machines.forEach(machine => {
                    machine.cves.forEach(cve => {
                        if (cve.severity in severitySums) {
                            severitySums[cve.severity] += 1;
                        }
                    });
                });
            });

        data = {
            labels: ['Critique', 'Haut', 'Moyen', 'Faible'],
            datasets: [
                {
                    label: 'Vunerabilités',
                    data: [severitySums.CRITICAL, severitySums.HIGH, severitySums.MEDIUM, severitySums.LOW],
                    backgroundColor: [
                        '#ff4d4f',
                        '#ffa940',
                        '#ffec3d',
                        '#73d13d'
                    ],
                    hoverBackgroundColor: [
                        '#f5222d',
                        '#fa8c16',
                        '#fadb14',
                        '#52c41a',
                    ],
                    borderColor: [
                        '#ff4d4f',
                        '#ffa940',
                        '#ffec3d',
                        '#73d13d'
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }

    const fetchScans = async () => {
        try {
            const scansFeteched = await getAllScans();
            scans.set(scansFeteched)
            getLast30DaysVunerabilities();
            getLast30DaysVunerabilitiesForEachSeverity();
        } catch (err) {
            error = err.message;
        }
    };

    onMount(fetchScans);
</script>





<html>
    <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         class="h-6 w-6 text-gray-400"
                         aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/>
                    </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                            30 derniers jours
                        </dt>
                        <dd>
                            <div class="text-lg font-medium text-gray-900">
                                {$totalOfVulnerabilities} vunerabilités
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

        <div class="overflow-hidden py-5">
            <Doughnut {data}
                      width={250}
                      height={250}
                      options={{ maintainAspectRatio: false }}/>
        </div>
    </div>
</html>

