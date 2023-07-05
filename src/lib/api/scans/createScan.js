export async function createScan(requestBody) {
    try {
        const response = await fetch(
            'http://localhost:1997/api/scans',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
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