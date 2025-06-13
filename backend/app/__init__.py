from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException
from app.models import db
from app.extensions import ma
from app.blueprints.users import user_bp
from app.blueprints.tasks import task_bp

def create_app(config_name):
  app = Flask(__name__)
  app.config.from_object(f"config.{config_name}")
  
  db.init_app(app)
  ma.init_app(app)
  
  app.register_blueprint(user_bp, url_prefix="/users")
  app.register_blueprint(task_bp, url_prefix="/tasks")
  
  @app.errorhandler(HTTPException)
  def handle_http_exception(e):
    response = e.get_response()
    response.data = jsonify({
      "error": e.name,
      "message": e.description,
      "code": e.code
    }).data
    
    response.content_type = "application/json"
    return response
  
  return app