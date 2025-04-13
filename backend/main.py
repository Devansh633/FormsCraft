#main.py
# import json
# import pandas as pd
# import streamlit as st
# from llm_utils import quiz_chain
# from langchain_community.callbacks import get_openai_callback
# from pdf_utils import extract_text_from_pdf_by_sections
# from csv_utils import save_quiz_to_csv
# from response_utils import RESPONSE_JSON

# st.title("MCQ GENERATOR")

# uploaded_file = st.file_uploader("Upload PDF", type="pdf")
# if uploaded_file:
#     if st.button("Generate MCQs"):
#         # Extract text from PDF
#         sections = extract_text_from_pdf_by_sections(uploaded_file)
#         sections_list = list(sections)  # Convert generator to list
#         # Display sections for debugging
#         for section, text in sections_list:
#             st.write(f"Section: {section}")
#             st.write(text)
#             # Generate MCQs using the defined chain
#         with get_openai_callback() as cb:
#             response = quiz_chain({"text": sections_list, "response_json": json.dumps(RESPONSE_JSON)})
#         # Retrieve generated quiz
#         quiz = response.get("quiz")

#          # Check and display the raw response for debugging
#         st.write("Raw quiz response:")
#         st.write(quiz)


#         # Convert string to dictionary if quiz is a string
#         if isinstance(quiz, str):
#             quiz = json.loads(quiz)
#             # Save quiz data to CSV
#         save_quiz_to_csv(quiz, "mcq.csv")

#         df = pd.DataFrame.from_dict(quiz, orient='index')
#         st.write("Quiz:")
#         st.write(df)
        
#         # Provide download link for the CSV file
#         st.write("Download CSV:")
#         csv_data = df.to_csv(index=False)
#         st.download_button(label="Download", data=csv_data, file_name="mcq.csv", mime="text/csv")



import json
import pandas as pd
import streamlit as st
from llm_utils import quiz_chain
from langchain_community.callbacks import get_openai_callback
from pdf_utils import extract_text_from_pdf_by_sections
from csv_utils import save_quiz_to_csv
from response_utils import RESPONSE_JSON

st.title("MCQ GENERATOR")

uploaded_file = st.file_uploader("Upload PDF", type="pdf")
if uploaded_file:
    if st.button("Generate MCQs"):
        # Extract text from PDF
        sections = extract_text_from_pdf_by_sections(uploaded_file)
        sections_list = list(sections)  # Convert generator to list
        
        # Display sections for debugging
        for section, text in sections_list:
            st.write(f"Section: {section}")
            st.write(text)
        
        # Generate MCQs using the defined chain
        with get_openai_callback() as cb:
            response = quiz_chain({"text": sections_list, "response_json": json.dumps(RESPONSE_JSON)})
        
        # Retrieve generated quiz
        quiz = response.get("quiz")
        
        # Check and display the raw response for debugging
        st.write("Raw quiz response:")
        st.write(quiz)
        
        # Convert string to dictionary if quiz is a string
        if quiz:
            if isinstance(quiz, str):
                try:
                    quiz = json.loads(quiz)
                except json.JSONDecodeError as e:
                    st.error(f"Error decoding JSON: {e}")
                    st.stop()  # Stop execution if there's an error
            
            # Save quiz data to CSV
            save_quiz_to_csv(quiz, "mcq.csv")

            df = pd.DataFrame.from_dict(quiz, orient='index')
            st.write("Quiz:")
            st.write(df)

            # Provide download link for the CSV file
            st.write("Download CSV:")
            csv_data = df.to_csv(index=False)
            st.download_button(label="Download", data=csv_data, file_name="mcq.csv", mime="text/csv")
        else:
            st.error("The quiz data is empty or invalid. Please check the input and try again.")

