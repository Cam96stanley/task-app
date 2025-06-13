from marshmallow_enum import EnumField
from app.extensions import ma
from app.models import Task, Status

class TaskSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Task
    load_instance = True
    include_fk = True
  
  id = ma.auto_field(dump_only=True)
  created_at = ma.auto_field(dump_only=True)
  user_id = ma.auto_field(load_only=True)
  status = EnumField(Status, by_value=True)

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)