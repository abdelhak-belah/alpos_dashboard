export async function getAllScans() {

    try {
        const response = await fetch(
            'http://localhost:1997/api/scans',
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
            console.log(data.scans);
            return data.scans;
        } else {
            const {error} = await response.json();
            throw new Error(error);
        }
    } catch (err) {
        console.log("error in fetching users")
        console.log(err.message);
        throw new Error(err.message);
    }
}