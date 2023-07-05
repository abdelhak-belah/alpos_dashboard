export async function login({email, password}) {
    try {
        const response = await fetch(
            'http://localhost:1997/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            }
        );


        if (response.ok) {
            const {data} = await response.json();
            const {access_token, refresh_token} = data.tokens;

            localStorage.clear();
            localStorage.setItem('email', email);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            console.log(localStorage.getItem('access_token'));
            return true;
        } else {
            const {error} = await response.json();
            throw new Error(error);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}