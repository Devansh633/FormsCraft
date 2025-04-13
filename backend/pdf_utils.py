import fitz  # PyMuPDF

def extract_text_from_pdf_by_sections(uploaded_file):
    # Open the PDF file with PyMuPDF
    pdf_document = fitz.open(stream=uploaded_file.read(), filetype="pdf")
    raw_text = ''
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        raw_text += page.get_text("text")
    
    # Split text into lines
    lines = raw_text.splitlines()
    return lines



# #pdf_utils.py
# import fitz  # PyMuPDF
# import re

# def extract_text_from_pdf_by_sections(uploaded_file):
#     # Open the PDF file with PyMuPDF
#     pdf_document = fitz.open(stream=uploaded_file.read(), filetype="pdf")
#     raw_text = ''
#     for page_num in range(len(pdf_document)):
#         page = pdf_document.load_page(page_num)
#         raw_text += page.get_text("text")
    
#     # Split text into lines
#     lines = raw_text.splitlines()
#     return lines
#     # print(lines)
#     # Regular expression to detect section headers
#     section_pattern = re.compile(r'^\d+(\.\d+)*\s+.*')

#     current_section = None
#     buffer = []

#     for line in lines:
#         line = line.strip()
#         if section_pattern.match(line):
#             if current_section is not None:
#                 yield current_section, '\n'.join(buffer).strip()
#             current_section = line
#             buffer = []
#         elif current_section:
#             buffer.append(line)
#     print(buffer)
#     # Capture the last section
#     if current_section is not None:
#         yield current_section, '\n'.join(buffer).strip()
