import streamlit as st
import requests

# Streamlit app title and description
st.title("Medical Chatbot")
st.write("This is a chatbot interface where you can ask medical-related questions.")

# Input field for the user message
user_input = st.text_input("You:", key="user_input")

# Display previous chat logs in a chat-like format
if 'chat_log' not in st.session_state:
    st.session_state['chat_log'] = []

for chat in st.session_state['chat_log']:
    st.write(f"**You:** {chat['user']}")
    st.write(f"**Bot:** {chat['bot']}")

# When the user presses enter or clicks the button, the message is sent
if st.button("Send") or user_input:
    if user_input:
        # Send the message to the Flask backend via POST request
        response = requests.post("http://127.0.0.1:8080/get", data={"msg": user_input})

        if response.status_code == 200:
            bot_response = response.json().get("response", "No response generated.")
        else:
            bot_response = "Error communicating with the server."

        # Append user input and bot response to the chat log
        st.session_state['chat_log'].append({"user": user_input, "bot": bot_response})

        # Clear the input field after the message is sent
        st.experimental_rerun()
