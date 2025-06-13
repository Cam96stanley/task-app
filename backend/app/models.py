from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Enum, DateTime
from datetime import datetime, timezone
import enum

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

class Status(enum.Enum):
  NOT_STARTED = "not_started"
  IN_PROGRESS = "in_progress"
  COMPLETED = "completed"

class User(db.Model):
  __tablename__ = "users"
  
  id: Mapped[int] = mapped_column(primary_key=True)
  name: Mapped[str] = mapped_column(db.String(150), nullable=False)
  email: Mapped[str] = mapped_column(db.String(150), nullable=False)
  password: Mapped[str] = mapped_column(db.String(150), nullable=False)
  
  tasks = db.relationship("Task", back_populates="user", cascade="all, delete-orphan")


class Task(db.Model):
  __tablename__ = "tasks"
  
  id: Mapped[int] = mapped_column(primary_key=True)
  user_id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), nullable=False)
  title: Mapped[str] = mapped_column(db.String(250), nullable=False)
  description: Mapped[str] = mapped_column(db.String(1000))
  status: Mapped[Status] = mapped_column(
    Enum(Status),
    nullable=False,
    default=Status.NOT_STARTED
  )
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True),
    nullable=False,
    default=lambda: datetime.now(timezone.utc)
  )
  
  user = db.relationship("User", back_populates="tasks")