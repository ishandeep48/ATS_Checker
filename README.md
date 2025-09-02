# 📌 ATS Checker

A **full-stack application** that helps users optimize their resumes by checking their compatibility with a job description.

---

## 📄 About the Project
The **ATS Checker** is a web application designed to assist job seekers in creating **ATS-friendly resumes**.  
It works by analyzing a user's **resume (PDF upload)** and a provided **job description**, then uses a **machine learning model** to generate a **compatibility score**.  

This score helps users understand how well their resume matches the job requirements, allowing them to make targeted improvements.

---

## ✨ Features
- **Resume & Job Description Upload** → Easily upload your resume and paste the job description you are applying for.  
- **ATS Score Generation** → Receive an instant compatibility score to see how well your resume matches the job description.  
- **User-Friendly Interface** → A clean and intuitive front-end built with React.  
- **Secure File Handling** → Backend securely processes your resume to generate the score.  

---
## NOTE
THE code which was used for training AI model is present at https://github.com/ishandeep48/ATS_Model 


## 🚀 Getting Started
This project consists of **three main parts**:  
1. **React Front-end**  
2. **Express.js Back-end**  
3. **Python-based ML API**  

You need to set up each one to run the full application.

---

### ✅ Prerequisites
- **Node.js** (v14 or higher)  
- **npm**  
- **Python 3.8+**  
- **pip**  

---

### ⚡ Installation

1. **Clone the Repository**
  ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
  ```
2. **Set up the Front-End**
  ```bash
    cd FrontEnd
    npm install
  ```
3. **Set up the Back-End**
```bash
  cd ../BackEnd
  npm install
```
4. **Set up the Model API**
```bash
  cd ../Model_API
  pip install -r requirements.txt
```

**YOU CAN USE YOUR MODEL HOSTED SOMEWHERE ELSE DIRECTLY NOW**
```bash
  Model_API=Your Model API URL
```

## Technologies Used
Front-end: React, Vite, Tailwind CSS

Back-end (Node.js): Express.js, CORS, Multer

Back-end (Python/ML): FastAPI, Hugging Face Transformers (BERT), XGBoost, scikit-learn, pdfplumber


## License
***
    ATS Checker  © 2025 by Ishan Deep is licensed under CC BY-NC-ND 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/
***


