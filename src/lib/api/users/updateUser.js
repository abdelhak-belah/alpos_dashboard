export async function updateUser(userEntity) {
    console.log(JSON.stringify(userEntity));
    try {
        const response = await fetch(
            'http://localhost:1997/api/users',
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(userEntity)
            }
        );

        if (response.ok) {
            return true;
        }
    } catch (err) {
        throw new Error(err.message);
    }
}