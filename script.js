const API_KEY = "AIzaSyD6eWso4g7n_rCyocWbjAexEeAXfKufzlQ"; 
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;
    if (!message) return;

    // Afficher le message de l'utilisateur
    chatBox.innerHTML += `<p><b>Vous:</b> ${message}</p>`;
    input.value = "";

    // Appeler l'API Gemini
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
        });

        const data = await response.json();
        const botReply = data.candidates[0].content.parts[0].text;
        
        // Afficher la réponse du bot
        chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<p style="color:red">Erreur: Impossible de contacter l'IA.</p>`;
    }
}
