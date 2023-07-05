<script>
    import { goto } from '$app/navigation';
    import {login} from '$lib/api/auth/login.js'
    import {getUserByEmail} from "$lib/api/users/getUserByEmail.js";

    let email = '';
    let password = '';
    let error = '';
    let showLoader = false;


    const fetchUserDetails = async () => {
        try {
            const user = await getUserByEmail(localStorage.getItem('email'));
            if (!user.isEmpty) {
                localStorage.setItem('userId',user.id);
                localStorage.setItem('userFirstName',user.first_name);
                localStorage.setItem('userLastName',user.last_name);
                localStorage.setItem('userRole',user.role);
                localStorage.setItem('userDob',user.dob);
                localStorage.setItem('userLocked',user.locked);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async () => {
        showLoader = true;
        try {
            const loggedIn = await login({email, password});
            if (loggedIn) {
                await fetchUserDetails();
                await goto('/dashboard');
            } else {
                showLoader = false;
            }
        } catch (err) {
            error = err.message;
            showLoader = false;
        }
    };

    showLoader = false;

</script>



<html class="h-full bg-white">
    <body class="h-full">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

            <!-- logo & title -->
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-20 w-auto" src="images/alpos-logo.svg" alt="Alpos">
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
                    Se connecter à Alpos
                </h2>
            </div>
            <!-- end logo & title -->

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <!-- form for login -->
                <form class="space-y-6" action="#" method="POST"
                      on:submit|preventDefault="{handleSubmit}">

                    <!-- email -->
                    <div>
                        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">
                            Adresse Email
                        </label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   bind:value="{email}">
                        </div>
                    </div>
                    <!-- end email -->

                    <!-- password -->
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">
                                Mot de passe
                            </label>
                            <div class="text-sm">
                                <a href="#" class="font-semibold text-primary hover:text-blue-500">
                                    Mot de passe oublié?
                                </a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password"
                                   name="password"
                                   type="password"
                                   autocomplete="current-password"
                                   required
                                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   bind:value="{password}">
                        </div>
                    </div>
                    <!-- end password -->

                    <!-- login button -->
                    <div>
                        <button type="submit"
                                class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled="{showLoader}">
                            {#if !showLoader}
                                <div>Connecter</div>
                            {:else}
                            <div class="inline-flex w-full justify-center items-center  text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue">
                                <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <div>Connexion...</div>
                            </div>
                            {/if}
                        </button>
                    </div>
                    <!-- end login button -->

                    <!-- error message -->
                    {#if error}
                    <div class="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
                        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div>
                            <span class="font-medium">Erreur!</span> Vérifiez vos identifiants.
                        </div>
                    </div>
                    {/if}
                </form>
                <!-- end form for login -->
            </div>
        </div>
    </body>
</html>


