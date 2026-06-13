from pydantic import BaseModel
from typing import Optional


class CompanyCreate(BaseModel):
    email: str
    password: str


class CompanySetup(BaseModel):
    company_name: str
    emergency_contact: Optional[str] = None
    description: Optional[str] = None


class CompanyOut(BaseModel):
    id: int
    email: str
    company_name: Optional[str]
    emergency_contact: Optional[str]
    description: Optional[str]
    is_setup_complete: bool

    class Config:
        from_attributes = True