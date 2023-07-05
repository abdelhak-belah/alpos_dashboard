<script>
    // fetch scans by launcher id
    import {onMount} from "svelte";
    import {getUserById} from "$lib/api/users/getUserById.js";


    let error = '';
    let user = {};

    const fetchUserById = async () => {
        try {
            const userFetched = await getUserById(localStorage.getItem('userId'));
            user = userFetched;
        } catch (err) {
            error = err.message;
        }
    };

    onMount(fetchUserById)


</script>






<html>

<main class="flex flex-1 overflow-hidden">


    <!-- Main content -->
    <div class="flex-1 xl:overflow-y-auto">
        <div class=" max-w-full py-10  lg:py-12 ">
            <form class="divide-y-blue-gray-200 space-y-8 divide-y">
                <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 p-1">
                    <div class="sm:col-span-6">
                        <h2 class="text-xl font-medium text-blue-gray-900">
                            Profil
                        </h2>
                        <p class="mt-1 text-sm text-blue-gray-500">
                            Ces informations seront affichées publiquement, alors faites attention à ce que vous partagez.
                        </p>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="first-name"
                               class="block text-sm font-medium text-blue-gray-900">
                            Prénom
                        </label>
                        <input type="text"
                               name="first-name"
                               id="first-name"
                               autocomplete="given-name"
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                               value="{user.first_name}">
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name"
                               class="block text-sm font-medium text-blue-gray-900">
                            Nom
                        </label>
                        <input type="text"
                               name="last-name"
                               id="last-name"
                               autocomplete="family-name"
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                               value="{user.last_name}">
                    </div>



                    <div class="sm:col-span-6">
                        <label for="user-photo"
                               class="block text-sm font-medium text-blue-gray-900">
                            Photo
                        </label>
                        <div class="mt-1 flex items-center">
                              <img class="inline-block h-12 w-12 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                                 alt="">
                            <div class="ml-4 flex">
                                <div class="relative flex cursor-pointer items-center rounded-md border border-blue-gray-300 bg-primary text-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50">
                                    <label for="user-photo"
                                           class="pointer-events-none relative text-sm font-medium text-blue-gray-900">
                                        <span>Changer</span>
                                        <span class="sr-only">
                                            user photo
                                        </span>
                                    </label>
                                    <input id="user-photo"
                                           name="user-photo"
                                           type="file"
                                           class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0">
                                </div>
                                <button type="button"
                                        class="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-gray-50">
                                    Retirer
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-6">
                        <label for="description"
                               class="block text-sm font-medium text-blue-gray-900">
                            Description
                        </label>
                        <div class="mt-1">
                            <textarea id="description"
                                      name="description"
                                      rows="4"
                                      class="block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                        </div>
                        <p class="mt-3 text-sm text-blue-gray-500">
                            Brève description de votre profil.
                        </p>
                    </div>

                </div>

                <div class="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
                    <div class="sm:col-span-6">
                        <h2 class="text-xl font-medium text-blue-gray-900">
                            Informations personnelles
                        </h2>
                        <p class="mt-1 text-sm text-blue-gray-500">
                            Ces informations seront affichées publiquement, alors faites attention à ce que vous partagez.
                        </p>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="email-address"
                               class="block text-sm font-medium text-blue-gray-900">
                            Adresse email
                        </label>
                        <input type="text"
                               name="email-address"
                               id="email-address"
                               autocomplete="email"
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                               value="{user.email}">
                    </div>

                    <div class="sm:col-span-3">
                        <label for="phone-number"
                               class="block text-sm font-medium text-blue-gray-900">
                            Numéro de téléphone
                        </label>
                        <input type="text"
                               name="phone-number"
                               id="phone-number"
                               autocomplete="tel"
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>

                    <div class="sm:col-span-3">
                        <label for="country"
                               class="block text-sm font-medium text-blue-gray-900">
                            Langue
                        </label>
                        <select id="country"
                                name="country"
                                autocomplete="country-name"
                                class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                            <option></option>
                            <option>Français</option>
                            <option>Anglais</option>
                            <option>Arabe</option>
                        </select>
                    </div>



                    <p class="text-sm text-blue-gray-500 sm:col-span-6">
                        Ce compte a été créé le
                        <time datetime="2017-01-05T20:35:40">
                             5 Juine, 2023, 8:35:40 PM
                        </time>.
                    </p>
                </div>

                <div class="flex justify-end pt-8">
                    <button type="button"
                            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Annuler
                    </button>
                    <button type="submit"
                            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>


</html>