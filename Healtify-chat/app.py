from flask import Flask, render_template, jsonify, request
from src.helper import download_hugging_face_embeddings
from langchain_community.vectorstores import Pinecone as LangChainPinecone
import pinecone  # Official Pinecone client
from huggingface_hub import InferenceClient
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import PromptTemplate
from langchain.llms.base import LLM
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Load environment variables
load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')
HUGGINGFACE_API_TOKEN = os.environ.get('HUGGINGFACE_API_TOKEN')


# Download embeddings (Ensure this works correctly)
embeddings = download_hugging_face_embeddings()

index_name = "medical-bot"

# Loading the existing index for search
vectorstore = LangChainPinecone.from_existing_index(index_name, embeddings)
retriever = vectorstore.as_retriever()

# Define the system prompt for the LLM
system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)

# Prompt template
PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template=system_prompt
)

# Hugging Face Inference API client
hf_client = InferenceClient(model="meta-llama/Llama-2-7b-chat-hf", token=HUGGINGFACE_API_TOKEN)

# Custom Hugging Face LLM Wrapper implementing the LLM interface
class HuggingFaceLLM(LLM):
    def _call(self, prompt: str, stop: list = None) -> str:
        """Generate text from the Hugging Face model using the Inference API."""
        response = hf_client.text_generation(prompt, max_length=512)
        return response['generated_text']

    def _identifying_params(self) -> dict:
        """Return model-specific parameters."""
        return {"model": "meta-llama/Llama-2-7b-chat-hf"}

    @property
    def _llm_type(self) -> str:
        """Define the type of the LLM."""
        return "huggingface_hub"

# Instantiate the custom Hugging Face LLM
llm = HuggingFaceLLM()

# Create the document chain
question_answer_chain = create_stuff_documents_chain(llm, PROMPT)

# Create the RetrievalQA chain
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# Default route to serve the chat page
@app.route("/")
def index():
    return render_template('chat.html')

# Route to handle chat input
@app.route("/get", methods=["POST"])
def chat():
    try:
        msg = request.form["msg"]
        print(f"User input: {msg}")
        
        # Using the RAG chain for question-answering
        response = ""
        for chunk in rag_chain.stream({"input": msg}):
            response += chunk
        
        # Log the result
        print("Response: ", response)
        
        # Return the result as a string
        return jsonify({"response": response})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Something went wrong!"}), 500

# Run the app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
