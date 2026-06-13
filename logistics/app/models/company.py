from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    Text,
    func,
)

from app.db.session import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True)

    email = Column(String(150), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    company_name = Column(String(200), nullable=True)
    emergency_contact = Column(String(20), nullable=True)
    description = Column(Text, nullable=True)

    is_setup_complete = Column(Boolean, default=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )