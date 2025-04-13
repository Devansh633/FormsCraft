#llm_utils.py
import os
from key import openai_api_key

from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.callbacks import get_openai_callback
from prompt_utils import TEMPLATE
from response_utils import RESPONSE_JSON

from langchain_community.llms import OpenAI



# Set OpenAI API key
os.environ["OPENAI_API_KEY"] = 'OPENAI_API_KEY'

# Initialize ChatOpenAI
llm = ChatOpenAI(openai_api_key=openai_api_key, model_name="gpt-3.5-turbo", temperature=0.5)

# Initialize PromptTemplate
quiz_generation_prompt = PromptTemplate(input_variables=["text","response_json"],template=TEMPLATE)

# Initialize LLMChain
quiz_chain = LLMChain(llm=llm, prompt=quiz_generation_prompt, output_key="quiz", verbose=True)
