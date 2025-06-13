from flask import request, jsonify
from marshmallow import ValidationError
from app.blueprints.tasks import task_bp
from app.models import db, Task
from app.blueprints.tasks.schemas import task_schema, tasks_schema
from utils.auth import get_user_task_or_404, token_required

@task_bp.route("/", methods=["POST"])
@token_required
def create_task(user_id):
  try:
    task_data = request.json
    task_data["user_id"] = user_id
    
    task = task_schema.load(task_data)
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify(task_schema.dump(task)), 201
  
  except ValidationError as e:
    return jsonify(e.messages), 400

@task_bp.route("/<int:task_id>", methods=["GET"])
@token_required
def get_task(task_id, user_id):
  task = get_user_task_or_404(task_id, user_id)
  return jsonify(task_schema.dump(task)), 200

@task_bp.route("/", methods=["GET"])
@token_required
def get_tasks(user_id):
  tasks = Task.query.filter_by(user_id=user_id).all()
  
  return jsonify(tasks_schema.dump(tasks)), 200