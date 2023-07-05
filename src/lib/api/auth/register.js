export async function register({firstname,lastname,email, password,role}) {
    try {
        const response = await fetch(
            'http://localhost:1997/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstname,lastname,email, password,role})
            }
        );


        if (response.ok) {
            return true;
        } else {
            const {error} = await response.json();
            throw new Error(error);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}