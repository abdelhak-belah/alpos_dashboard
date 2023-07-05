<script>
    // Components
    import Chart from "$lib/components/dash/DashChart.svelte";
    import DashRecentScan from "$lib/components/dash/DashRecentScan.svelte";
</script>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-lg leading-6 font-medium text-gray-900">
        Aperçu
    </h2>

    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
        <!-- Card 1 -->
        <Chart/>
        <!-- end Card 1 -->

        <!-- Card 2 -->
        <DashRecentScan/>
        <!-- end Card 2 -->
    </div>
</div>