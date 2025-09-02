from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
# import joblib
import numpy as np
# import xgboost as xgb
import pickle
from sentence_transformers import SentenceTransformer , util

# model = joblib.load("bert_model_for_xgboost.pkl")
# le=joblib.load('le_model_for_xgboost.pkl')
# bst = joblib.load("xgboost_bert_model.pkl")


model = SentenceTransformer('all-MiniLM-L6-v2')

with open("ats_data.pkl", "rb") as f:
    data = pickle.load(f)

centroids = data["centroids"]
job_labels = data["job_labels"]

# def predictJob(sample_resume,target_job):
    
#     sample_vec = model.encode([sample_resume], convert_to_tensor=False)
#     dvec = xgb.DMatrix(sample_vec)

#     probas = bst.predict(dvec)[0]  
#     classes = le.classes_
#     job_probs = dict(zip(classes, probas))
#     chance = job_probs.get(target_job, 0) * 100
#     # print(f"Chance of {target_job}: {chance:.2f}%")
#     top3 = sorted(job_probs.items(), key=lambda x: x[1], reverse=True)[:3]

#     print("Top 3 job matches:")
#     for job, prob in top3:
#         print(f"{job}: {prob*100:.2f}%")

#     results = {
#         "target_job_chance": round(float(chance),2),
#         "top3_jobs": [{"job": job, "probability": round(float(prob) * 100,2)} for job, prob in top3]
#     }

#     return results

def closest_job_name(query, model, labels):
    q_emb = model.encode([query], convert_to_tensor=True)
    label_embs = model.encode(labels, convert_to_tensor=True)
    sims = util.cos_sim(q_emb, label_embs)[0]
    best_idx = sims.argmax().item()
    return labels[best_idx], (sims[best_idx].item() + 1) / 2  # normalize to 0–1

def score_resume(text, model, centroids):
    q = model.encode([text], convert_to_tensor=False)[0]
    sims = {}
    for label, cent in centroids.items():
        s = util.cos_sim(q, cent).item()
        sims[label] = (s + 1) / 2   # normalize
    return dict(sorted(sims.items(), key=lambda x: x[1], reverse=True))




class InputString(BaseModel):
    skills : str
    target_job : str

app =FastAPI()



@app.post("/predict")
async def predict_job(skillset : InputString):
    print(skillset.skills)
    all_scores = score_resume(skillset.skills, model, centroids)
    closest_job, _ = closest_job_name(skillset.target_job, model, job_labels)
    target_prob = all_scores.get(closest_job, 0.0)
    top3 = list(all_scores.items())[:3]
    top3_json = [{"job": job, "probability": round(score*100, 2)} for job, score in top3]

    return {
        "target_job": closest_job,
        "target_job_chance": round(target_prob*100, 2),
        "top3_jobs": top3_json
    }

if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=7860)