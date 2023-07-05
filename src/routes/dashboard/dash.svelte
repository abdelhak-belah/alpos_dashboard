<script>
    import DashStats from "$lib/components/dash/DashStats.svelte";
    import DashUserStats from "$lib/components/dash/DashUserStats.svelte";
</script>


<html class="h-full bg-gray-100">
<body class="h-full">

<main class="flex-1">
    <div>
        <main class="flex-1 pb-8">
            <DashUserStats/>

            <div class="mt-8">
                <DashStats/>
            </div>
        </main>
    </div>
</main>
</body>
</html>