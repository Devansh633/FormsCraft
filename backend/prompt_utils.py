#prompt_utils.py
from response_utils import RESPONSE_JSON
# Define template for quiz generation
TEMPLATE = """
**Text:** {text}
As an expert in creating multiple choice questions (MCQs), your task is to craft unique questions based on the provided text. 
You are feeded the contents of a pdf where each section is fedded consecutively instead of directly.
you need to generate at least two questions form each section and eqnch queestion should be differnt and distinct.
Ensure that the questions are distinct and directly relate to the text.And  generate maximum number of questions which covers all the topics and sub-topics ans should generate question on each setion.
After analyzing the given text, your goal is to generate a diverse set of questions covering various topics and sub-topics presented in the chapter. 
### RESPONSE_JSON
{response_json}
Furthermore, categorize the generated questions according to Bloom's Taxonomy. Bloom's Taxonomy classifies cognitive skills into six levels:
1. **Remember:** Recall specific information, facts, or concepts from memory.
2. **Understand:** Interpret and explain ideas or concepts, demonstrating comprehension.
3. **Apply:** Use learned information in practical situations, demonstrating problem-solving abilities.
4. **Analyze:** Break down information into parts, identify relationships, and draw conclusions.
5. **Evaluate:** Make judgments about the value of ideas or solutions, based on criteria.
6. **Create:** Generate novel ideas, products, or solutions by combining elements creatively.
Your task extends to predicting questions from all levels of Bloom's Taxonomy.
Additionally, categorize each generated question based on the Bloom's Taxonomy level it corresponds to. This will help in assessing the cognitive 
processes required to answer each question accurately.

Here are some examples of question and there blooms taxonomy in the similar fashion you need to generate the questions.

Remember:

1)What are the components of food that are necessary for our body?
'a': 'Carbohydrates, proteins, fats, vitamins, and minerals',
'b': 'Water, carbon dioxide, and sunlight', 
'c': 'Nitrogen, phosphorus, and potassium', 
'd': 'Sugar, salt, and oil'

2)What is the mode of nutrition in which organisms make food themselves from simple substances?
'a': 'Heterotrophic nutrition',
'b': 'Parasitic nutrition',
'c': 'Autotrophic nutrition',
'd': 'Saprotrophic nutrition'

Understand:

1)Plants are called autotrophs because:
'a': 'They depend on other plants for food', 
'b': 'They can prepare food for themselves using simple substances', 
'c': 'They do not require sunlight for photosynthesis', 
'd': 'They are parasites'

2)Why is photosynthesis considered a unique process on Earth?
'a': 'Because it involves the synthesis of carbohydrates', 
'b': 'Because it requires sunlight and water', 
'c': 'Because it is the only way plants get energy', 
'd': 'Because it captures solar energy and produces oxygen'

Apply:

1)Why do farmers spread manure or fertilisers in the fields?
'a': 'To prevent soil erosion',
'b': 'To increase the acidity of the soil', 
'c': 'To replenish nutrients in the soil for plant growth', 
'd': 'To reduce the growth of weeds'

2)What is the main process that allows organisms to move, grow, and reproduce?
'a': 'Photosynthesis', 
'b': 'Respiration', 
'c': 'Energy processing', 
'd': 'Digestion'

Analyze:

1)What are the key differences between physical and chemical changes?
'a': 'Physical changes involve the formation of new substances, while chemical changes do not', 
'b': 'Chemical changes are reversible, while physical changes are not', 
'c': 'Physical changes alter the physical properties of substances, while chemical changes involve the formation of new substances', 
'd': 'Chemical changes are always accompanied by the production of heat, while physical changes are not'

2)Explain the process of neutralization with the help of an example.
'a': 'Acids and bases react to form water and salt',
'b': 'Acids and bases react to form a new acid', 
'c': 'Acids and bases react to form a new base', 
'd': 'Acids and bases react to form a gas'

Evaluate:

1)Evaluate the importance of chemical changes in our daily lives. Provide examples to support your answer.
'a': 'Chemical changes are insignificant in daily life', 
'b': 'Chemical changes only occur in laboratories',
'c': 'Chemical changes are crucial for the formation of new substances', 
'd': 'Chemical changes have no impact on society'

2)How does an antacid tablet help in relieving acidity?
'a': 'By increasing the acidity in the stomach', 
'b': 'By neutralizing the excess acid in the stomach', 
'c': 'By converting acid into base',
'd': 'By reducing the pH of the stomach'

Create:

1)Create a secret message using baking soda and beetroot. Explain the science behind it.

2)Create a scenario where both physical and chemical changes occur simultaneously. Explain the processes involved.





"""

