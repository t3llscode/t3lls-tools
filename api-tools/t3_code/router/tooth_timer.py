from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from t3_code.orm.basics import get_db

router = APIRouter(
    prefix="/tooth_timer",
    tags=["Tooth Timer API"]
)

@router.post("/test")
async def test(req: dict, db: AsyncSession = Depends(get_db)):
    return {
        "status": "success",
        "message": "test endpoint",
        "data": req
    }