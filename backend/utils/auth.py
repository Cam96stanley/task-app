from flask_bcrypt import Bcrypt
from functools import wraps
from jose import jwt
from datetime import datetime, timedelta, timezone
from flask import abort, current_app, jsonify, request
import jose
from app.models import Task

bcrypt = Bcrypt()

def hash_password(plain_password: str) -> str:
  return bcrypt.generate_password_hash(plain_password).decode("utf-8")

def check_password(plain_password: str, hashed_password: str) -> bool:
  return bcrypt.check_password_hash(hashed_password, plain_password)

def generate_token(user):
  payload = {
    "sub": str(user.id),
    "exp": datetime.now(timezone.utc) + timedelta(days=1)
  }

  token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
  return token

def token_required(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    token = None
    
    if "Authorization" in request.headers:
      auth_header = request.headers["Authorization"]
      parts = auth_header.split(" ")
      if len(parts) == 2 and parts[0] == "Bearer":
        token = parts[1]
      
    if not token:
      return jsonify({"message": "Token is missing"}), 401
    
    try:
      data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
      user_id = data["sub"]
    
    except jose.exceptions.ExpiredSignatureError:
      return jsonify({"message": "Token has expired!"}), 401
    
    except jose.exceptions.JWTError:
      return jsonify({"message": "Invalid token!"}), 401
    
    kwargs["user_id"] = user_id
    return f(*args, **kwargs)
  return decorated

def get_user_task_or_404(task_id, user_id):
  task = Task.query.filter_by(id=task_id, user_id=user_id).first()
  if not task:
    abort(404, description="Task not found or not authorized")
  return task