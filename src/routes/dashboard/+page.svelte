<script>
    // imports
    import Dash from "./dash.svelte";
    import Users from "./users.svelte";
    import Scans from "./scans.svelte";
    import Reports from "./reports.svelte";
    import Settings from "./settings.svelte";
    import Splash from "$lib/components/splash/splash.svelte";

    import {goto} from "$app/navigation";
    import {logout} from "$lib/api/auth/logout.js";
    import {onMount} from "svelte";
    import Search from "$lib/components/search/Search.svelte";


    // variables
    let showDropdown = false;
    let showSplash = false;
    let showSearch = false;
    let error = '';
    let currentPage = '';
    let selectedPage = '';

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function toggleSearch(){
        showSearch = !showSearch;
    }

    function navigateTo(page) {
        currentPage = page;
        selectedPage = currentPage;
    }


    const handleLogout = async () => {
        showSplash = true;

        try {
            const isLogoutSuccess = await logout();
            if (isLogoutSuccess) {
                await goto('/login');
            } else {
                showSplash = false;
            }
        } catch (err) {
            error = err.message;
            showSplash = false;
        }
    };


    function handleSearch(){
        toggleSearch();
    }


    onMount(() => {
        // Set the initial page here
        currentPage = 'dash';
        selectedPage = currentPage;
    });
</script>


<html class="h-full bg-gray-100">
<body class="h-full">

{#if showSplash}
    <Splash/>
{:else}

    {#if showSearch}
        <Search oncloseSearch="{toggleSearch}"/>
    {/if}

    <div>
        <!-- Static sidebar for desktop -->
        <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
                <div class="flex flex-shrink-0 items-center px-4">
                    <img class="h-8 w-auto" src="images/alpos-logo.svg" alt="Alpos">
                </div>
                <div class="mt-5 flex flex-grow flex-col">
                    <nav class="h-full flex flex-col">

                        <div class="flex-1 space-y-1 px-2 pb-4">
                            <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
                            <a href="#"
                               class="cursor-pointer { selectedPage === 'dash' ? 'bg-blue-50 text-primary hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' : 'text-gray-500 hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' }"
                               on:click={() => navigateTo('dash')}>
                                <!--
                                  Heroicon name: outline/home

                                  Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500"
                                -->
                                <svg class="cursor-pointer { selectedPage === 'dash' ? 'text-primary group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-500  group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' }"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor"
                                     aria-hidden="true">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                </svg>
                                Tableau de bord
                            </a>


                            <a href="#"
                               class="cursor-pointer { selectedPage === 'scans' ? 'bg-blue-50 text-primary hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' : 'text-gray-500 hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' }"
                               on:click={() => navigateTo('scans')}>
                                <!-- Heroicon name: outline/folder -->
                                <svg class="cursor-pointer { selectedPage === 'scans' ? 'text-primary group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-500  group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' }"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                                </svg>
                                Scans
                            </a>


                            <a href="#"
                               class="cursor-pointer { selectedPage === 'reports' ? 'bg-blue-50 text-primary hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' : 'text-gray-500 hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' }"
                               on:click={() => navigateTo('reports')}>
                                <!-- Heroicon name: outline/chart-bar -->
                                <svg class="cursor-pointer { selectedPage === 'reports' ? 'text-primary group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-500  group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' }"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                                </svg>
                                Rapports
                            </a>

                            <a href="#"
                               class="cursor-pointer { selectedPage === 'users' ? 'bg-blue-50 text-primary hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' : 'text-gray-500 hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' }"
                               on:click={() => navigateTo('users')}>
                                <!-- Heroicon name: outline/users -->
                                <svg class="cursor-pointer { selectedPage === 'users' ? 'text-primary group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-500  group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' }"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                                </svg>
                                Utilisateurs
                            </a>

                            <a href="#"
                               class="cursor-pointer { selectedPage === 'settings' ? 'bg-blue-50 text-primary hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' : 'text-gray-500 hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' }"
                               on:click={() => navigateTo('settings')}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor"
                                     aria-hidden="true"
                                     class="cursor-pointer { selectedPage === 'settings' ? 'text-primary group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-500  group-hover:text-primary mr-3 flex-shrink-0 h-6 w-6' }">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>

                                Paramètres
                            </a>

                        </div>

                        <div class="mt-auto pt-10 space-y-1 px-2 pb-4">
                            <a href="#"
                               class="cursor-pointer { selectedPage === 'logout' ? 'bg-blue-50 text-primary hover:text-primary group flex items-center px-2 py-2 text-sm font-medium  rounded-md' : 'text-gray-500 hover:text-red-500 group flex items-center px-2 py-2 text-sm font-medium  rounded-md' }"
                               on:click="{handleLogout}">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor"
                                     class="cursor-pointer { selectedPage === 'logout' ? 'text-red-400 group-hover:text-red-400 mr-3 flex-shrink-0 h-6 w-6' : 'text-red-400  group-hover:text-red-500 mr-3 flex-shrink-0 h-6 w-6' }">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                                </svg>
                                Se déconnecter
                            </a>
                        </div>


                    </nav>


                </div>
            </div>
        </div>


        <div class="flex flex-1 flex-col md:pl-64">
            <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                <button type="button"
                        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
                    <span class="sr-only">Open sidebar</span>
                    <!-- Heroicon name: outline/bars-3-bottom-left -->
                    <svg class="h-6 w-6"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         aria-hidden="true">
                        <path stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>
                    </svg>
                </button>
                <div class="flex flex-1 justify-between px-4">
                    <div class="flex flex-1">
                        <form class="flex w-full md:ml-0"
                              action="#"
                              method="GET">
                            <label for="search-field"
                                   class="sr-only">
                                Recherche
                            </label>
                            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                    <!-- Heroicon name: mini/magnifying-glass -->
                                    <svg class="h-5 w-5"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20"
                                         fill="currentColor"
                                         aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <input id="search-field"
                                       class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                                       placeholder="Recherche"
                                       type="search"
                                       name="search"
                                       on:click={handleSearch}>
                            </div>
                        </form>
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">
                        <button type="button"
                                class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="sr-only">View notifications</span>
                            <!-- Heroicon name: outline/bell -->
                            <svg class="h-6 w-6"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor"
                                 aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                            </svg>
                        </button>

                        <!-- Profile dropdown -->
                        <div class="relative ml-3">
                            <div>
                                <button type="button"
                                        class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        on:click={toggleDropdown}>
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt="image de profil">
                                </button>
                            </div>

                            <!--
                              Dropdown menu, show/hide based on menu state.

                              Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                              Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95"
                            -->

                            {#if showDropdown}
                                <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                     role="menu"
                                     aria-orientation="vertical"
                                     aria-labelledby="user-menu-button"
                                     tabindex="-1">
                                    <!-- Active: "bg-gray-100", Not Active: "" -->
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                       tabindex="-1"
                                       id="user-menu-item-0">
                                        Profil
                                    </a>

                                    <!-- settings -->
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                       tabindex="-1"
                                       id="user-menu-item-1">
                                        Paramètres
                                    </a>
                                    <!-- end settings -->

                                    <!-- logout -->
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                       tabindex="-1"
                                       id="user-menu-item-2"
                                       on:click="{handleLogout}">
                                        Se déconnecter
                                    </a>
                                    <!-- end logout -->
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>


            {#if currentPage === 'dash'}
                <Dash/>
            {:else if currentPage === 'users'}
                <Users/>
            {:else if currentPage === 'scans'}
                <Scans/>
            {:else if currentPage === 'reports'}
                <Reports/>
            {:else if currentPage === 'settings'}
                <Settings/>
            {/if}


        </div>
    </div>

{/if}

</body>
</html>
