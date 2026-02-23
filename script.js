const API_KEY = "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";
const chatBox = document.getElementById("chat-box");
let conversationHistory = []; // C'est ça qui donne la "mémoire" au bot

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    // Afficher message utilisateur
    displayMessage(message, 'user-msg');
    input.value = "";

    // Ajouter à l'historique
    conversationHistory.push({ role: "user", content: message });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "HTTP-Referer": window.location.origin,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
                "messages": conversationHistory // On envoie TOUT l'historique
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const botReply = data.choices[0].message.content;
            displayMessage(botReply, 'bot-msg');
            // Ajouter la réponse du bot à l'historique pour la suite
            conversationHistory.push({ role: "assistant", content: botReply });
        } else {
            throw new Error(data.error ? data.error.message : "Erreur inconnue");
        }

    } catch (error) {
        displayMessage("Erreur: " + error.message, 'bot-msg');
    }
}

function displayMessage(text, className) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
