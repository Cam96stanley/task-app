from app.models import User
from app.extensions import ma

class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = User

user_schema = UserSchema()