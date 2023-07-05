<script>
    // components
    import Loading from "$lib/components/loading/Loading.svelte";

    // api
    import {register} from "$lib/api/auth/register.js";

    export let onCloseAdduser;
    export let onSubmitAddUser;

    let firstname = '';
    let lastname = '';
    let email = '';
    let password = '';
    let confirm_password = '';
    let role = '';
    let showLoading = false;

    function closeAddUser() {
        onCloseAdduser();
    }

    function submitAddUser() {
        onSubmitAddUser();
    }


    function toggleLoading() {
        showLoading = !showLoading;
    }

    const handleSubmit = async () => {
        toggleLoading();
        if (password !== confirm_password) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        role = role.toUpperCase();
        try {
            const isRegisterd = await register({firstname, lastname, email, password, role})

            if (isRegisterd) {
                toggleLoading();
                closeAddUser();
            }
        } catch (err) {
            alert('Une erreur est survenue lors de l\'enregistrement');
        }
    };

</script>


<html>
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

                <!-- content -->

                {#if showLoading}
                    <Loading/>
                {:else }
                    <form action="#"
                          method="POST"
                          class="space-y-8 divide-y divide-gray-200"
                          on:submit|preventDefault="{handleSubmit}">
                        <div class="space-y-8 divide-y divide-gray-200">
                            <div>
                                <div class="pt-8">
                                    <div>
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                                            Informations personnelles
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500">
                                            Utilisez une adresse permanente où vous pouvez recevoir du courrier.
                                        </p>
                                    </div>
                                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                        <div class="sm:col-span-3">
                                            <label for="firstname" class="block text-sm font-medium text-gray-700">
                                                Prénom
                                            </label>
                                            <div class="mt-1">
                                                <input type="text"
                                                       name="firstname"
                                                       id="firstname"
                                                       autocomplete="given-name"
                                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                       bind:value="{firstname}">
                                            </div>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="lastname" class="block text-sm font-medium text-gray-700">
                                                Nom
                                            </label>
                                            <div class="mt-1">
                                                <input type="text"
                                                       name="lastname" id="lastname"
                                                       autocomplete="family-name"
                                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                       bind:value="{lastname}">
                                            </div>
                                        </div>

                                        <div class="sm:col-span-6">
                                            <label for="email" class="block text-sm font-medium text-gray-700">
                                                Adresse email
                                            </label>
                                            <div class="mt-1">
                                                <input id="email" name="email" type="email" autocomplete="email"
                                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                       bind:value="{email}">
                                            </div>
                                        </div>


                                        <div class="sm:col-span-3">
                                            <label for="password" class="block text-sm font-medium text-gray-700">
                                                Mot de passe
                                            </label>
                                            <div class="mt-1">
                                                <input type="password"
                                                       name="password"
                                                       id="password"
                                                       autocomplete="current-password"
                                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                       bind:value="{password}">
                                            </div>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="password" class="block text-sm font-medium text-gray-700">
                                                Confirmez le mot de passe
                                            </label>
                                            <div class="mt-1">
                                                <input type="password"
                                                       name="confirm-password"
                                                       id="confirm-password"
                                                       autocomplete="confirm password"
                                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                       bind:value="{confirm_password}">
                                            </div>
                                        </div>


                                        <div class="sm:col-span-3">
                                            <label for="role"
                                                   class="block text-sm font-medium text-gray-700">
                                                Rôle
                                            </label>
                                            <div class="mt-1">
                                                <select id="role"
                                                        name="role"
                                                        autocomplete="role"
                                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        bind:value="{role}">
                                                    <option>Admin</option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>

                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="submit"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    on:click={submitAddUser}>
                                Ajouter
                            </button>
                            <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    on:click={closeAddUser}>
                                Annuler
                            </button>
                        </div>
                    </form>
                    <!-- end content -->
                {/if}

            </div>
        </div>
    </div>
</div>

</html>