<script>
    // Import
    import {updateUser} from "$lib/api/users/updateUser.js";

    // Export
    export let onCloseEdituser;
    export let onUpdateEditUser;
    export let userEntity;

    // Variables
    let locked = false;

    // Functions
    function closeEditUser() {
        onCloseEdituser();
    }


    function submitEditUser() {
        onUpdateEditUser();
    }

    function toggleLocked() {
        locked = !locked;
        userEntity.locked = locked;
    }


    // Events
    const handleUpdate = async () => {
        try {
            const isUpdated = await updateUser(userEntity);
            if (isUpdated) {
                closeEditUser();
            }

        } catch (err) {
            console.log(err);
        }
    };

</script>


<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!--
      Background backdrop, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <!--
              Modal panel, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            -->
            <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

                <!-- content -->

                <form action="#"
                      method="POST"
                      class="space-y-8 divide-y divide-gray-200"
                      on:submit|preventDefault="{handleUpdate}">
                    <div class="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div class="pt-8">
                                <div>
                                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                                        Modifier les informations de l'utilisateur
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-500">
                                        Utilisez une adresse email permanente où vous pouvez recevoir du courrier.
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
                                                   bind:value="{userEntity.first_name}">
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
                                                   bind:value="{userEntity.last_name}">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-6">
                                        <label for="email" class="block text-sm font-medium text-gray-700">
                                            Adresse email
                                        </label>
                                        <div class="mt-1">
                                            <input id="email" name="email" type="email" autocomplete="email"
                                                   class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                   bind:value="{userEntity.email}">
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
                                                    bind:value="{userEntity.role}">
                                                <option>{userEntity.role}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-6 flex items-center">
                                        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                                        <button type="button"
                                                class="{locked?'bg-primary':'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                role="switch" aria-checked="false"
                                                aria-labelledby="annual-billing-label"
                                                on:click={toggleLocked}>
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span aria-hidden="true"
                                                  class=" {locked?'translate-x-5':'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
                                            </span>
                                        </button>
                                        <span class="ml-3" id="annual-billing-label">
                                        <span class="text-sm font-medium text-gray-900">Bloqué</span>
                                        <span class="text-sm text-gray-500">(Pas d'accès)</span>
                                      </span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button type="submit"
                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                on:click={submitEditUser}>
                            Mettre à jour
                        </button>
                        <button type="button"
                                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                on:click={closeEditUser}>
                            Annuler
                        </button>
                    </div>
                </form>

                <!-- end content -->
            </div>
        </div>
    </div>
</div>
