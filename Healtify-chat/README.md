# End-to-end-Medical-Chatbot-using-Llama2
LinkedIn: https://www.linkedin.com/in/sourav-samanta3/

# Description for  End-to-end-Medical-Chatbot-using-Llama2 - MLOps Project:

The End-to-End Medical Chatbot using Llama2 project aims to develop a generative AI chatbot that can accurately interact with users' medical queries and provide solutions. This project adopts a modular coding approach, leveraging various technologies to build an end-to-end solution. The primary technologies used in this project include:
🐍 Python: Python, a versatile and widely-used programming language for machine learning, is employed for data preprocessing, feature engineering, and model development.

📓 Jupyter Notebook: Jupyter Notebook provides an interactive and collaborative environment to explore and analyze the data, experiment with different algorithms, and fine-tune the model parameters.

🖥️ Visual Studio Code: Visual Studio Code, a powerful integrated development environment (IDE), is utilized for writing modular and scalable code. It enables efficient coding practices, debugging, and version control integration with Git, ensuring better collaboration among team members.

Sure, here are the descriptions in a similar format:

🔗 LangChain: LangChain is a framework that provides tools for building complex applications with language models. It simplifies the process of chaining multiple model calls together, enabling the creation of more sophisticated and nuanced interactions.


🌐 Flask:Flask, a lightweight web framework for Python, is used to build the web interface of the chatbot. It facilitates the development of web applications by providing essential tools and libraries, ensuring a smooth interaction between the user and the chatbot.

🦙 Meta Llama2: Meta Llama2 is an advanced language model developed by Meta, known for its ability to generate human-like text. It serves as the core engine of the medical chatbot, enabling it to understand and respond to medical queries with high accuracy and relevance.

🌲 Pinecone: Pinecone is a vector database optimized for similarity search and machine learning applications. It is employed to store and retrieve embedding vectors efficiently, enhancing the chatbot’s ability to find relevant responses quickly and accurately.

🧠 Hugging Face Sentence-Transformers: Hugging Face's sentence-transformers, particularly the `all-MiniLM-L6-v2` model, are used for generating high-quality sentence embeddings. These embeddings help in understanding the context and semantics of user queries, improving the chatbot's response accuracy.


🐙 GitHub: GitHub serves as the version control and collaboration platform, allowing team members to work together, track changes, and manage the project's codebase effectively.
# How to run?
### STEPS:

Clone the repository

```bash
Project repo: https://github.com/SOURAV7843/End-to-End-Medical-ChatBot
```

### STEP 01- Create a conda environment after opening the repository

```bash
conda create -n mchatbot python=3.8 -y
```

```bash
conda activate mchatbot
```

### STEP 02- install the requirements
```bash
pip install -r requirements.txt
```
###  Check all install the requirements
```bash
pip list
```
### Create a `.env` file in the root directory and add your Pinecone credentials as follows:

```ini
PINECONE_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
PINECONE_API_ENV = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```


### Download the quantize model from the link provided in model folder & keep the model in the model directory:

```ini
## Download the Llama 2 Model:

llama-2-7b-chat.ggmlv3.q4_0.bin


## From the following link:
https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGML/tree/main
```

```bash
# run the following command
python store_index.py
```

```bash
# Finally run the following command
python app.py
```

Now,
```bash
open up localhost:
```


### Techstack Used:

- Python
- LangChain
- Flask
- Meta Llama2
- Pinecone
