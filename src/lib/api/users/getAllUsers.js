export async function getAllUsers() {

    try {
        const response = await fetch(
            'http://localhost:1997/api/users',
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
            return data.users;
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