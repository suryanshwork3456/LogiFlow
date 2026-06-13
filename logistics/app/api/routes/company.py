from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


from pydantic import BaseModel

class CompanyLogin(BaseModel):
    email: str
    password: str

from app.db.session import get_db
from app.models.company import Company

from app.schemas.company import (
    CompanyCreate,
    CompanySetup,
    CompanyOut,
)

router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)


@router.get("/")
async def test():
    return {"message": "companies router working"}


@router.post("/register", response_model=CompanyOut)
async def register_company(
    data: CompanyCreate,
    db: AsyncSession = Depends(get_db),
):
    existing = await db.execute(
        select(Company).where(
            Company.email == data.email
        )
    )

    existing_company = existing.scalar_one_or_none()

    if existing_company:
        raise HTTPException(
            status_code=400,
            detail="Company already exists"
        )

    company = Company(
        email=data.email,
        password=data.password,
        is_setup_complete=False,
    )

    db.add(company)

    await db.commit()
    await db.refresh(company)

    return company

@router.post("/{company_id}/setup", response_model=CompanyOut)
async def setup_company(
    company_id: int,
    data: CompanySetup,
    db: AsyncSession = Depends(get_db),
):
    company = await db.get(Company, company_id)

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    company.company_name = data.company_name
    company.emergency_contact = data.emergency_contact
    company.description = data.description
    company.is_setup_complete = True

    await db.commit()
    await db.refresh(company)

    return company

@router.get("/{company_id}", response_model=CompanyOut)
async def get_company(
    company_id: int,
    db: AsyncSession = Depends(get_db),
):
    company = await db.get(Company, company_id)

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


@router.post("/login")
async def company_login(
    data: CompanyLogin,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Company).where(Company.email == data.email)
    )

    company = result.scalar_one_or_none()

    if not company:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
            )
    if data.password != company.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "company_id": company.id,
        "company_name": company.company_name,
        "is_setup_complete": company.is_setup_complete
    }