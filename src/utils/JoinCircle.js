export async function joinCircle(id, token) {
    const response = await fetch(`https://x-fit-backend-graduation-project.onrender.com/api/v1/circle/invite/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    const result = await response.json();
    return result;
}