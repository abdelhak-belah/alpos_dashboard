<html>

<main class="flex flex-1 overflow-hidden">


    <!-- Main content -->
    <div class="flex-1 xl:overflow-y-auto">
        <div class=" max-w-full py-10  lg:py-12 ">
            <form class="divide-y-blue-gray-200 space-y-8 divide-y">

                <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 p-1">

                    <div class="sm:col-span-6">
                        <h2 class="text-xl font-medium text-blue-gray-900">
                            Notifications
                        </h2>
                        <p class="mt-1 text-sm text-blue-gray-500">
                            Nous vous informerons toujours des changements importants, mais vous choisissez les autres sujets dont vous voulez entendre parler.
                        </p>
                    </div>

                    <div class="sm:col-span-6">
                        <fieldset>
                            <legend class="text-base font-medium text-gray-900">
                                Par email
                            </legend>
                            <div class="mt-4 space-y-4">
                                <div class="relative flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="comments"
                                               name="comments"
                                               type="checkbox"
                                               class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="comments" class="font-medium text-gray-700">
                                            Toutes les scans
                                        </label>
                                        <p class="text-gray-500">
                                            Soyez averti lorsque quelqu'un crée une scan.
                                        </p>
                                    </div>
                                </div>
                                <div class="relative flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="candidates"
                                               name="candidates"
                                               type="checkbox"
                                               class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="candidates" class="font-medium text-gray-700">
                                            Scan crée par vous
                                        </label>
                                        <p class="text-gray-500">
                                            Soyez averti lorsque votre scan est terminée.
                                        </p>
                                    </div>
                                </div>
                                <div class="relative flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="offers"
                                               name="offers"
                                               type="checkbox"
                                               class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="offers"
                                               class="font-medium text-gray-700">
                                            Obtenir le rapport de scan
                                        </label>
                                        <p class="text-gray-500">
                                            Obtenir un rapport lorsque le scan est terminée
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset class="mt-6">
                            <legend class="text-base font-medium text-gray-900">
                                Sur alpos
                            </legend>
                            <div class="mt-4 space-y-4">
                                <div class="flex items-center">
                                    <input id="push-everything"
                                           name="push-notifications"
                                           type="radio"
                                           class="focus:ring-primary h-4 w-4 text-primary border-gray-300">
                                    <label for="push-everything"
                                           class="ml-3 block text-sm font-medium text-gray-700">
                                        Tout
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="push-email"
                                           name="push-notifications"
                                           type="radio"
                                           class="focus:ring-primary h-4 w-4 text-primary border-gray-300">
                                    <label for="push-email"
                                           class="ml-3 block text-sm font-medium text-gray-700">
                                        Identique à l'email
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="push-nothing"
                                           name="push-notifications"
                                           type="radio"
                                           class="focus:ring-primary h-4 w-4 text-primary border-gray-300">
                                    <label for="push-nothing"
                                           class="ml-3 block text-sm font-medium text-gray-700">
                                        Pas de notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
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