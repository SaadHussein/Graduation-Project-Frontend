export async function getCircle(id, token) {
    const response = await fetch("https://x-fit-backend-graduation-project.onrender.com/api/v1/circle/getCircle", {
        method: "POST",
        body: JSON.stringify({
            id
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    const result = await response.json();
    return result;
}