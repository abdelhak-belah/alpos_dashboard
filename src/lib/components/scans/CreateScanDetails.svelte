<script>
    // imports
    import {scanName} from "$lib/store/storeScan.js";
    import {scanType} from "$lib/store/storeScan.js";
    import {scanDate} from "$lib/store/storeScan.js";

    // variables
    let isNowChecked = $scanType === 'now';
    let isScheduleChecked = $scanType === 'schedule';


    // functions
    function toggleNow() {
        isNowChecked = true;
        isScheduleChecked = false;
    }

    function toggleSchedule() {
        isScheduleChecked = true;
        isNowChecked = false;
    }
</script>


<html>
<form action="#"
      method="POST"
      class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
        <div>
            <div class="pt-8">
                <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                    <div class="sm:col-span-3">
                        <label for="name"
                               class="block text-sm font-medium text-gray-700">
                            Nom
                        </label>
                        <div class="mt-1">
                            <input type="text"
                                   name="name"
                                   id="name"
                                   autocomplete="family-name"
                                   class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                   bind:value={$scanName}>
                        </div>
                    </div>


                    <div class="sm:col-span-6">
                        <fieldset>
                            <legend class="text-base font-medium text-gray-900">
                                Quand voulez-vous lancer le scan ?
                            </legend>

                            <div class="mt-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <!--
                                  Checked: "border-transparent", Not Checked: "border-gray-300"
                                  Active: "border-indigo-500 ring-2 ring-indigo-500"
                                -->
                                <label class="{isNowChecked?'border-primary ring-2 ring-primary':'border-gray-300'} relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                                    <input type="radio"
                                           name="scan-type"
                                           value="now"
                                           class="sr-only"
                                           aria-labelledby="project-type-0-label"
                                           aria-describedby="project-type-0-description-0 project-type-0-description-1"
                                           on:click="{toggleNow}"
                                           bind:group={$scanType}>
                                    <span class="flex flex-1">
                                        <span class="flex flex-col">
                                              <span id="project-type-0-label"
                                                    class="block text-sm font-medium text-gray-900">
                                                  Maintenant
                                              </span>
                                              <span id="project-type-0-description-0"
                                                    class="mt-1 flex items-center text-sm text-gray-500">
                                                  Le scan sera lancé immédiatement
                                              </span>
                                        </span>
                                    </span>
                                    <!--
                                      Not Checked: "invisible"

                                      Heroicon name: mini/check-circle
                                    -->
                                    <svg class="{isNowChecked?'visible':'invisible'} h-5 w-5 text-primary"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20"
                                         fill="currentColor"
                                         aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    <!--
                                      Active: "border", Not Active: "border-2"
                                      Checked: "border-indigo-500", Not Checked: "border-transparent"
                                    -->
                                    <span class="{isNowChecked?'border border-primary':'border-2 border-transparent'} pointer-events-none absolute -inset-px rounded-lg"
                                          aria-hidden="true">
                                    </span>
                                </label>

                                <!--
                                  Checked: "border-transparent", Not Checked: "border-gray-300"
                                  Active: "border-indigo-500 ring-2 ring-indigo-500"
                                -->
                                <label class="{isScheduleChecked?'border-primary ring-2 ring-primary':'border-gray-300'} relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                                       on:click="{toggleSchedule}">
                                    <input type="radio"
                                           name="scan-type"
                                           value="schedule"
                                           class="sr-only"
                                           aria-labelledby="project-type-1-label"
                                           aria-describedby="project-type-1-description-0 project-type-1-description-1"
                                           on:click="{toggleSchedule}"
                                           bind:group={$scanType}>
                                    <span class="flex flex-1 w-4/5">
                                                        <span class="flex flex-col">
                                                          <span id="project-type-1-label"
                                                                class="block text-sm font-medium text-gray-900">
                                                              Scan planifié
                                                          </span>
                                                          <span id="project-type-1-description-0"
                                                                class="mt-1 flex items-center text-sm text-gray-500">
                                                              Le scan sera lancé à la date & heure sélectionnées
                                                          </span>
                                                          <span id="project-type-1-description-1"
                                                                class="mt-6 text-sm font-medium text-gray-900">
                                                               <input class="datatime block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                      type="datetime-local"
                                                                      id="datatime"
                                                                      bind:value={$scanDate}>
                                                          </span>
                                                        </span>
                                                    </span>
                                    <!--
                                      Not Checked: "invisible"

                                      Heroicon name: mini/check-circle
                                    -->
                                    <svg class="{isScheduleChecked?'visible':'invisible'} h-5 w-5 text-primary"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20"
                                         fill="currentColor"
                                         aria-hidden="true">
                                        <path fill-rule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                    <!--
                                      Active: "border", Not Active: "border-2"
                                      Checked: "border-indigo-500", Not Checked: "border-transparent"
                                    -->
                                    <span class="{isScheduleChecked?'border border-primary':'border-2 border-transparent'} pointer-events-none absolute -inset-px rounded-lg"
                                          aria-hidden="true">
                                                    </span>
                                </label>

                                <!--
                                  Checked: "border-transparent", Not Checked: "border-gray-300"
                                  Active: "border-indigo-500 ring-2 ring-indigo-500"
                                -->

                            </div>
                        </fieldset>
                    </div>


                </div>
            </div>
        </div>
    </div>
</form>
</html>