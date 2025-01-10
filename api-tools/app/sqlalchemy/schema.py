from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func

Base = declarative_base()

class ToothTimer(Base):
    """Relation for couting ended teeth brushing sessions."""
    __tablename__ = "tooth_timer"
    id = Column(Integer, primary_key=True)
    time = Column(DateTime, nullable=False, server_default=func.now())
    def __repr__(self):
        return f"ToothTimer(id={self.id!r}, time={self.time!r})"

# AI Created Examples:

# class User(Base):
#     __tablename__ = "user_account"
#     id = Column(Integer, primary_key=True)
#     name = Column(String(30))
#     fullname = Column(String)
#     addresses = relationship(
#         "Address", back_populates="user", cascade="all, delete-orphan"
#     )
#     def __repr__(self):
#         return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

# class Address(Base):
#     __tablename__ = "address"
#     id = Column(Integer, primary_key=True)
#     email_address = Column(String, nullable=False)
#     user_id = Column(Integer, ForeignKey("user_account.id"), nullable=False)
#     user = relationship("User", back_populates="addresses")
#     def __repr__(self):
#         return f"Address(id={self.id!r}, email_address={self.email_address!r})"