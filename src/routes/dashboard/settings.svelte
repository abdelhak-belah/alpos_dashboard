<script>
    // components
    import GeneralSettings from "$lib/components/settings/GeneralSettings.svelte";
    import PasswordSettings from "$lib/components/settings/PasswordSettings.svelte";
    import NotificationSettings from "$lib/components/settings/NotificationSettings.svelte";
    import AboutSettings from "$lib/components/settings/AboutSettings.svelte";
    import {onMount} from "svelte";

    // variables
    let currentPage = '';
    let selectedPage = '';

    function navigateTo(page) {
        currentPage = page;
        selectedPage = currentPage;
    }

    onMount(() => {
        // Set the initial page here
            currentPage = 'General';
        selectedPage = currentPage;
    });

</script>


<html>


<main class="flex-1">
    <div class="py-6">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-optima font-semibold text-gray-900">
                Paramètres
            </h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <!-- content -->

            <div class="pt-3 pb-16">
                <div class="px-4 sm:px-6 md:px-0">
                    <div class="py-6">
                        <!-- Tabs -->
                        <div class="lg:hidden">
                            <label for="selected-tab"
                                   class="sr-only">Select a tab</label>
                            <select id="selected-tab"
                                    name="selected-tab"
                                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option selected>
                                    General
                                </option>

                                <option>
                                    Password
                                </option>

                                <option>
                                    Notifications
                                </option>

                                <option>
                                    About
                                </option>

                            </select>
                        </div>
                        <div class="hidden lg:block">
                            <div class="border-b border-gray-200">
                                <nav class="-mb-px flex space-x-8">
                                    <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                                    <a href="#"
                                       class="{selectedPage==='General'?'border-primary text-primary':'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                       on:click={() => navigateTo('General')}>
                                        Général
                                    </a>

                                    <a href="#"
                                       class="{selectedPage==='Password'?'border-primary text-primary':'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                       on:click={() => navigateTo('Password')}>
                                        Mot de passe
                                    </a>

                                    <a href="#"
                                       class="{selectedPage==='Notifications'?'border-primary text-primary':'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                       on:click={() => navigateTo('Notifications')}>
                                        Notifications
                                    </a>

                                    <a href="#"
                                       class="{selectedPage==='About'?'border-primary text-primary':'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                       on:click={() => navigateTo('About')}>
                                        À propos
                                    </a>
                                </nav>
                            </div>
                        </div>


                        <!-- navigation -->

                        {#if currentPage === 'General'}
                            <GeneralSettings/>
                        {:else if currentPage === 'Password'}
                            <PasswordSettings/>
                        {:else if currentPage === 'Notifications'}
                            <NotificationSettings/>
                        {:else if currentPage === 'About'}
                            <AboutSettings/>
                        {/if}
                        <!-- end navigation -->


                    </div>
                </div>
            </div>

            <!-- end content -->
        </div>
    </div>
</main>
</html>