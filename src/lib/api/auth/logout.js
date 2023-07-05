export async function logout() {
    try {
        const response = await fetch(
            'http://localhost:1997/api/auth/logout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        );


        if (response.ok) {
            localStorage.clear();
            return true;
        } else {
            const {error} = await response.json();
            console.log(error);
            throw new Error(error);
        }
    } catch (err) {
        console.log(err.message)
        throw new Error(err.message);
    }
}