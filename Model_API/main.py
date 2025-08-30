from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
import joblib
import numpy as np
import xgboost as xgb

model = joblib.load("bert_model_for_xgboost.pkl")
le=joblib.load('le_model_for_xgboost.pkl')
bst = joblib.load("xgboost_bert_model.pkl")



def predictJob(sample_resume,target_job):
    
    sample_vec = model.encode([sample_resume], convert_to_tensor=False)
    dvec = xgb.DMatrix(sample_vec)

    probas = bst.predict(dvec)[0]  
    classes = le.classes_
    job_probs = dict(zip(classes, probas))
    chance = job_probs.get(target_job, 0) * 100
    # print(f"Chance of {target_job}: {chance:.2f}%")
    top3 = sorted(job_probs.items(), key=lambda x: x[1], reverse=True)[:3]

    print("Top 3 job matches:")
    for job, prob in top3:
        print(f"{job}: {prob*100:.2f}%")

    results = {
        "target_job_chance": round(float(chance),2),
        "top3_jobs": [{"job": job, "probability": round(float(prob) * 100,2)} for job, prob in top3]
    }

    return results

class InputString(BaseModel):
    skills : str
    target_job : str

app =FastAPI()



@app.post("/predict")
async def predict_job(skillset : InputString):
    print(skillset.skills)
    result = predictJob(skillset.skills,skillset.target_job)
    return result


if __name__ == "__main__":
    uvicorn.run(app , host="0.0.0.0" , port=8000)