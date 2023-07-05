<script>
    import {scanName, scanNavBar} from "$lib/store/storeScan.js";

    function removeFromNav(name) {
        $scanNavBar = $scanNavBar.filter((item) => {
            return item.name === name;
        });
    }

</script>