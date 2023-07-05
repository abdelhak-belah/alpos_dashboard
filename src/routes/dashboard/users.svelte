<script>
    // components
    import Adduser from "$lib/components/users/AddUser.svelte";
    import Edituser from "$lib/components/users/EditUser.svelte";
    import Loading from "$lib/components/loading/Loading.svelte";

    // api
    import {getAllUsers} from "$lib/api/users/getAllUsers.js";

    // svelte
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {writable} from "svelte/store";
    import Success from "$lib/components/success/Success.svelte";


    // variables
    let isShowAddUser = false;
    let isShowEditUser = false;
    let isRefreshUsers = false;
    let isShowSuccess = false;
    let userEntity = {};
    let users = writable([]);
    let error = '';


    // funtion
    function toggleAddUser() {
        isShowAddUser = !isShowAddUser;
    }

    function toggleEditUser() {
        isShowEditUser = !isShowEditUser;
    }

    function toggleRefreshUsers() {
        isRefreshUsers = !isRefreshUsers;
    }

    function toggleSuccess(){
        isShowSuccess = !isShowSuccess;
    }

    function closeAddUser(){
        toggleSuccess();
        fetchUsers();
    }

    function sendDataToEditUser(user) {
        userEntity.id = user.id;
        userEntity.first_name = user.first_name;
        userEntity.last_name = user.last_name;
        userEntity.email = user.email;
        userEntity.role = user.role;
        userEntity.locked = user.locked;
        userEntity.dob = user.dob;
        toggleEditUser();
    }


    const fetchUsers = async () => {
        toggleRefreshUsers();
        try {
            $users = await getAllUsers();
            toggleRefreshUsers();
        } catch (err) {
            error = err.message;
            toggleRefreshUsers();
        }
    };

    onMount(fetchUsers);
</script>


<html>
{#if isShowAddUser}
    <Adduser onCloseAdduser="{toggleAddUser}"
             onSubmitAddUser="{closeAddUser}"/>
{/if}

{#if isShowSuccess}
    <Success title="Succès"
             message="L'utilisateur a été ajouté avec succès"
             btnMessage="Revenir au tableau de bord"
             onCloseSuccess="{toggleSuccess}"/>
{/if}


{#if isShowEditUser}
    <Edituser onCloseEdituser="{toggleEditUser}"
              onUpdateEditUser="{fetchUsers}"
              userEntity="{userEntity}"/>
{/if}


{#if isRefreshUsers}
    <Loading/>
{:else}

    <main class="flex-1">
        <div class="py-6">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-optima font-semibold text-gray-900">
                    Utilisateurs
                </h1>
            </div>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->


                <div class="py-4">
                    <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">

                            <h1 class="text-xl font-semibold text-gray-900">

                            </h1>
                            <p class="mt-2 text-sm text-gray-700">

                            </p>
                        </div>

                        <!-- refresh button -->
                        <button type="button"
                                disabled=""
                                class="inline-block {isRefreshUsers?'animate-spin':''} rounded-full text-gray-600 bg-white shadow-sm  p-2 uppercase leading-normal transition duration-150 ease-in-out  focus:bg-primary-600  active:bg-primary-700  hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                on:click="{fetchUsers}">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor"
                                 class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                            </svg>
                        </button>
                        <!-- end refresh button -->
                        <div class="mt-4 sm:mt-0 sm:ml-3 sm:flex-none">
                            <button type="button"
                                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    on:click={toggleAddUser}>
                                Ajouter un utilisateur
                            </button>
                        </div>
                    </div>
                    <div class="mt-8 flex flex-col">
                        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Nom
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Titre
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Email
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Rôle
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Statut
                                            </th>
                                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span class="sr-only">Modifier</span>
                                            </th>
                                        </tr>
                                        </thead>


                                        <tbody class="divide-y divide-gray-200 bg-white">
                                        {#each $users as user}
                                            <tr>
                                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {user.first_name} {user.last_name}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    Manager
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {user.role.charAt(0).toUpperCase() + user.role.toLowerCase().slice(1)}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span class="inline-block flex-shrink-0 rounded-full {user.locked?'bg-red-100':'bg-green-100'} px-2 py-0.5 text-xs font-medium {user.locked?'text-red-800':'text-green-800'}">{user.locked ? 'Bloqué' : 'Active'}</span>
                                                </td>
                                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a href="#"
                                                       class="text-primary hover:text-blue-600"
                                                       on:click={sendDataToEditUser(user)}>
                                                        Modifier
                                                        <span class="sr-only">, {user.first_name} {user.last_name}</span>
                                                    </a>
                                                </td>

                                            </tr>
                                            <!-- More people... -->
                                        {/each}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </main>


{/if}

</html>