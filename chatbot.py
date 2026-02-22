import os
import google.generativeai as genai

# Récupération de la clé API depuis les variables d'environnement
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

def chat():
    print("Chatbot activé ! Tapez 'exit' pour quitter.")
    while True:
        user_input = input("Vous: ")
        if user_input.lower() == 'exit':
            break
        
        response = model.generate_content(user_input)
        print(f"Bot: {response.text}")

if __name__ == "__main__":
    chat()
