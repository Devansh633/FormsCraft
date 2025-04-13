# csv_utils.py
import csv

def save_quiz_to_csv(quiz, filename):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['question', 'options', 'correct_answer', "Bloom's Taxonomy"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for _, question_data in quiz.items():
            question = question_data['mcq']
            options = ', '.join(question_data['options'].values())
            correct_answer = question_data['correct']
            bloom_taxonomy = question_data["Bloom's Taxonomy"]
            writer.writerow({'question': question, 'options': options, 'correct_answer': correct_answer, "Bloom's Taxonomy": bloom_taxonomy})
