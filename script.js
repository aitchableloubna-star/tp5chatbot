const API_KEY = "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"; 
const chatBox = document.getElementById("chat-box");
async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;
    if (!message) return;

    chatBox.innerHTML += `<p><b>Vous:</b> ${message}</p>`;
    input.value = "";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": window.location.origin, // Requis par certains modèles OpenRouter
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-preview-02-05:free", // Modèle ultra-récent et gratuit
                "messages": [
                    {"role": "user", "content": message}
                ]
            })
        });

        const data = await response.json();
        console.log("Réponse de l'API:", data); // Pour débugger si ça rate encore

        if (data.choices && data.choices[0]) {
            const botReply = data.choices[0].message.content;
            chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
        } else {
            throw new Error(data.error ? data.error.message : "Structure de réponse inconnue");
        }
        
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Détail de l'erreur:", error);
        chatBox.innerHTML += `<p style="color:red">Erreur: ${error.message}</p>`;
    }
}
