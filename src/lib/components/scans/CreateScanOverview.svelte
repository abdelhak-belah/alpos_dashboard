<script>
    // imports
    import {scanName, scanType, scanDate, scanTime, scanLaucherId, scanIPsSelected, scanIPsToSend } from "$lib/store/storeScan.js";
    import {userFirstName, userLastName} from "$lib/store/storeUser.js";

    scanTime.set($scanDate?$scanDate.split("T")[1]:"");
    scanLaucherId.set(localStorage.getItem("userId"));



    if ($scanIPsSelected.length > 0){
        let scanIPsChecked = [];
        $scanIPsSelected.map(
            scanSelected => {
                if (scanSelected.checked === true){
                    scanIPsChecked.push(scanSelected.ip)
                }
            }
        )
        scanIPsToSend.set(scanIPsChecked);
    }

</script>






<html>

<div>
    <div class="mt-5 border-t border-gray-200">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">
                    Nom
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {$scanName}
                </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">
                    Scan
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    Sera lancé {$scanType==='now'?'immédiatement':'le '+ ($scanDate?$scanDate.split("T")[0]:"") +' à '+$scanTime}
                </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">
                    IPs
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {$scanIPsToSend.length} IP à scanner
                </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">
                    Temps estimé
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    10m30s
                </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt class="text-sm font-medium text-gray-500">
                    Lancé par
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {localStorage.getItem("userFirstName")} {localStorage.getItem("userLastName")}
                </dd>
            </div>

        </dl>
    </div>
</div>
</html>