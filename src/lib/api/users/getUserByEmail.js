export async function getUserByEmail(email) {
    try {
        const response = await fetch(
            `http://localhost:1997/api/users/filter?email=${email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        );

        if (response.ok) {
            const {data} = await response.json();
            return data.user;

        } else {
            const {error} = await response.json();
            throw new Error(error);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}