const API_KEY = "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"; 
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;
    if (!message) return;

    chatBox.innerHTML += `<p><b>Vous:</b> ${message}</p>`;
    input.value = "";

    try {
        // L'URL change pour OpenRouter
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-pro-1.5-exp-free", // Modèle gratuit
                "messages": [
                    {"role": "user", "content": message}
                ]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        
        chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<p style="color:red">Erreur avec OpenRouter. Vérifie ta clé.</p>`;
    }
}
