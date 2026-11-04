from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fuel_calculator import calculate_fuel

app = FastAPI(
    title="Smart Fuel Assist",
    description="Fuel estimation for Rapido Captain",
    version="1.0"
)


class FuelRequest(BaseModel):
    initial_fuel: float = Field(...,ge=0)
    distance: float = Field(...,ge=0)
    mileage: float = Field(...,gt=0)


@app.get("/")
def home():
    return {"message": "Smart Fuel Assist API is running"}


@app.post("/calculate-fuel")
def fuel_prediction(data: FuelRequest):

    try:
        return calculate_fuel(
            data.initial_fuel,
            data.distance,
            data.mileage
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )