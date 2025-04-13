from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from pdf_utils import extract_text_from_pdf_by_sections
from csv_utils import save_quiz_to_csv
from llm_utils import quiz_chain, get_openai_callback
from response_utils import RESPONSE_JSON

app = Flask(__name__)
CORS(app)

def convert_quiz_string_to_json(quiz_string):
    # First, parse the quiz string into a dictionary
    quiz_data = json.loads(quiz_string)

    # Iterate through each question and format it properly
    quiz_json = {}
    for key, value in quiz_data.items():
        question = {
            "mcq": value["mcq"],
            "options": value["options"],
            "correct": value["correct"],
            "Bloom's Taxonomy": value["Bloom's Taxonomy"]
        }
        quiz_json[key] = question

    return quiz_json

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # print("Received file: ", file.filename)
        lines = extract_text_from_pdf_by_sections(file)
        # print("Extracted lines: ", lines)  # Debugging print statement
        
        with get_openai_callback() as cb:
            response = quiz_chain({"text": lines, "response_json": json.dumps(RESPONSE_JSON)})
        
        quiz = response.get("quiz")
        quiz = convert_quiz_string_to_json(quiz)
        # print("Generated quiz: ", quiz)  # Debugging print statement

        return jsonify({'mcqs': quiz})

    except Exception as e:
        print("Error occurred: ", str(e))  # Debugging print statement
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
