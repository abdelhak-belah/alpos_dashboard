<script>
    import Splash from "$lib/components/splash/splash.svelte";
    import Home from "../routes/home/+page.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from 'svelte';
    let showSplash = true;


    function toggleSplash() {
        showSplash = !showSplash;
    }


    function checkIfUserIsLoggedIn () {
        setTimeout(() => {
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                goto('/dashboard');
            } else {
                goto('/login');
            }
            toggleSplash();
        }, 3000);
    }

    onMount(() => {
        checkIfUserIsLoggedIn();
    });
</script>

{#if showSplash === true}
    <Splash/>
{:else}
    <Home/>
{/if}

