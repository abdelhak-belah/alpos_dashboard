<script>
    // util
    import {downloadPDF} from "$lib/util/downloadPDF.js";

    // export
    export let scanData;

    // variables
    let showDropdown = false;

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function requestForPDF(scanData){
        toggleDropdown();
        downloadPDF(scanData);
    }

</script>


<html>

<div class="relative inline-block text-left">
    <div>
        <button type="button"
                class="flex items-center rounded-full bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                on:click="{toggleDropdown}">
            <span class="sr-only">Open options</span>
            <!-- Heroicon name: mini/ellipsis-vertical -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"/>
            </svg>
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
        <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
             role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <a href="#"
                   class="text-gray-700 block px-4 py-2 text-sm"
                   role="menuitem"
                   tabindex="-1"
                   id="menu-item-0"
                   on:click="{requestForPDF(scanData)}">
                    Exporter en PDF
                </a>
            </div>
        </div>
    {/if}
</div>
</html>