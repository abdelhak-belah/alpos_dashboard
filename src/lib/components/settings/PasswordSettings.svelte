






<html>


<main class="flex flex-1 overflow-hidden">


    <!-- Main content -->
    <div class="flex-1 xl:overflow-y-auto">
        <div class=" max-w-full py-10  lg:py-12 ">
            <form class="divide-y-blue-gray-200 space-y-8 divide-y">
                <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 p-1">
                    <div class="sm:col-span-6">
                        <h2 class="text-xl font-medium text-blue-gray-900">
                            Changer le mot de passe
                        </h2>
                        <p class="mt-1 text-sm text-blue-gray-500">
                            Mettez à jour votre mot de passe associé à votre compte.                       </p>
                    </div>

                    <div class="sm:col-span-4">
                        <label for="current-mp"
                               class="block text-sm font-medium text-blue-gray-900">
                            Mot de passe actuel
                        </label>
                        <input name="current-mp"
                               id="current-mp"
                               type="password"
                               autocomplete="current-password"
                               required
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>

                    <div class="sm:col-span-4">
                        <label for="new-mp"
                               class="block text-sm font-medium text-blue-gray-900">
                            Nouveau mot de passe
                        </label>
                        <input name="new-mp"
                               id="new-mp"
                               type="password"
                               autocomplete="current-password"
                               required
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>


                    <div class="sm:col-span-4">
                        <label for="con-new-mp"
                               class="block text-sm font-medium text-blue-gray-900">
                            Confirmez le mot de passe
                        </label>
                        <input name="con-new-mp"
                               id="con-new-mp"
                               type="password"
                               autocomplete="current-password"
                               required
                               class="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>



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