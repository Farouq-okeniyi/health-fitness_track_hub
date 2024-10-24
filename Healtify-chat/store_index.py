from src.helper import load_pdf, text_split, download_hugging_face_embeddings
from langchain_community.vectorstores import Pinecone as LangchainPinecone
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import os

load_dotenv()

PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
PINECONE_API_ENV = os.environ.get('PINECONE_API_ENV')

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "medical-bot"

# Check if index exists before creating
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=384,  # Set dimension based on your embedding model
        metric="cosine",  # Cosine similarity for sentence-transformers
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
# Load and split the PDF data
extracted_data = load_pdf("data/")
text_chunks = text_split(extracted_data)
embeddings = download_hugging_face_embeddings()

# Create Embeddings for Each of The Text Chunks & store
docsearch = LangchainPinecone.from_texts([t.page_content for t in text_chunks], embeddings, index_name=index_name)
print('docsearch initialized')
