export async function startDiscover(pCIDR) {

    try {

        const url = `http://localhost:1997/api/discovers/start?CIDR=${encodeURIComponent(pCIDR)}`;
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        );

        if (response.ok) {
            const { data } = await response.json();
            return data.ips;
        } else {
            const {error} = await response.json();
            throw new Error(error);
        }
    }catch (err) {
        console.log("error in fetching users")
        console.log(err.message);
        throw new Error(err.message);
    }



}