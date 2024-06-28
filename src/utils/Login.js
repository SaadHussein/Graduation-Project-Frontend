export async function login(email, password) {
    const response = await fetch("https://x-fit-backend-graduation-project.onrender.com/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const result = await response.json();
    return result;
}