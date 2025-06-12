from flask import request, jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from app.models import db, User
from app.blueprints.users import user_bp
from app.blueprints.users.schemas import user_schema, return_user_schema
from utils.auth import hash_password, check_password, generate_token, token_required


@user_bp.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  
  if not data or not data.get("email") or not data.get("password"):
    return jsonify({"error": "Email and password are required"}), 400
  
  user = db.session.query(User).filter_by(email=data["email"]).first()
  
  if not user or not check_password(data["password"], user.password):
    return jsonify({"error": "Invalid email or password"}), 401
  
  token = generate_token(user)
  
  return jsonify({
    "message": "User logged in successfully",
    "token": token,
    "user": {
      "id": user.id,
      "email": user.email,
      "name": user.name
    }
  }), 200


@user_bp.route("/", methods=["POST"])
def create_user():
  try:
    user = user_schema.load(request.json)
    user.password = hash_password(user.password)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify(return_user_schema.dump(user)), 201
  
  except IntegrityError as e:
    db.session.rollback()
    return jsonify({"error": "Email already exists"}), 409
  
  except ValidationError as e:
    return jsonify(e.messages)
  
  except Exception as e:
    db.session.rollback()
    print(str(e))
    return jsonify({"error": "An unexpected error occured"}), 500