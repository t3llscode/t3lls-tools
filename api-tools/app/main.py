from fastapi import FastAPI  # type: ignore - installed via Dockerfile (?)
from typing import Union
import datetime

from .sqlalchemy.schema import ToothTimer
from sqlalchemy.orm import Session

from fastapi import HTTPException
from fastapi import Depends

app = FastAPI()

# # # Dependency

def get_db():
    pass # TODO: implement this function to return a database session

# # # Routes

@app.get("/online")
def read_root():
    return {"msg": "Hello World!"}

@app.get("/timercount")
def read_root():
    return {"count": 12}

@app.post("/timer")
def create_timer(db: Session = Depends(get_db)):
    # Create a new timer with current timestamp
    new_timer = ToothTimer(date=datetime.datetime.now())
    db.add(new_timer)
    db.commit()
    db.refresh(new_timer)
    return new_timer

@app.get("/timers")
def get_timers(start_date: str = None, end_date: str = None, db: Session = Depends(get_db)):
    try:
        query = db.query(ToothTimer)
        
        # Filter by date range if provided
        if start_date:
            start_datetime = datetime.datetime.fromisoformat(start_date)
            query = query.filter(ToothTimer.date >= start_datetime)
        
        if end_date:
            end_datetime = datetime.datetime.fromisoformat(end_date)
            query = query.filter(ToothTimer.date <= end_datetime)
        
        timers = query.all()
        return {"timers": timers, "count": len(timers)}
    
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use ISO format (YYYY-MM-DDTHH:MM:SS).")

print("started...")