from flask import request, jsonify
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from app.models import User
from app.blueprints.users import user_bp
from app.blueprints.users.schemas import user_schema