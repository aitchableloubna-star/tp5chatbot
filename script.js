const API_KEY = "AIzaSyBV4L4wNF3xy1p73GJLrKm-g9AOKMuS5BA"; 
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value;
    
    if (!message) return;

    // 1. Afficher le message de l'utilisateur
    chatBox.innerHTML += `<p><b>Vous:</b> ${message}</p>`;
    input.value = "";

    // 2. Appeler l'API Gemini
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Erreur réseau ou clé API invalide');
        }

        const data = await response.json();
        
        // 3. Extraire et afficher la réponse du bot
        const botReply = data.candidates[0].content.parts[0].text;
        chatBox.innerHTML += `<p><b>Bot:</b> ${botReply}</p>`;
        
        // Faire défiler vers le bas
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<p style="color:red">Erreur: Impossible de contacter l'IA. Vérifie ta clé API.</p>`;
    }
}
