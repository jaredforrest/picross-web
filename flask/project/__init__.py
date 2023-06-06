import logging
from logging.handlers import RotatingFileHandler
import re

from flask import Flask
from flask.logging import default_handler

from flask_cors import CORS
# remove in production
from flask_compress import Compress


import greenlet
from sqlalchemy.orm import scoped_session
from . import models
from .database import SessionLocal, engine

# -------------
# Configuration
# -------------

# SQLAlchemy setup
models.Base.metadata.create_all(bind=engine)
app_session = scoped_session(SessionLocal, scopefunc=greenlet.getcurrent)


# ----------------------------
# Application Factory Function
# ----------------------------

def create_app():
    
    # Create the Flask application
    app = Flask(__name__)
    
    # Compression remove in production
    app.config['COMPRESS_BR_LEVEL'] = 11
    app.config['COMPRESS_MIMETYPES'] = ['text/html','text/css','text/xml',
            'application/json','application/javascript','text/javascript']
    Compress(app)
    #Minify(app=app, html=True, js=True, cssless=True)
    
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 300
    CORS(app)
    #app.session = scoped_session(SessionLocal, scopefunc=_app_ctx_stack.__ident_func__)

    register_blueprints(app)

    return app


# ----------------
# Helper Functions
# ----------------

def register_blueprints(app):
    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    from project.puzzles import puzzles_blueprint
    from project.api import api_blueprint

    app.register_blueprint(puzzles_blueprint)
    app.register_blueprint(api_blueprint)


def configure_logging(app):
    # Logging Configuration
    if app.config['LOG_WITH_GUNICORN']:
        gunicorn_error_logger = logging.getLogger('gunicorn.error')
        app.logger.handlers.extend(gunicorn_error_logger.handlers)
        app.logger.setLevel(logging.DEBUG)
    else:
        file_handler = RotatingFileHandler('instance/flask-user-management.log',
                                           maxBytes=16384,
                                           backupCount=20)
        file_formatter = logging.Formatter(
                '%(asctime)s %(levelname)s %(threadName)s-%(thread)d:' +
                '%(message)s [in %(filename)s:%(lineno)d]')
        file_handler.setFormatter(file_formatter)
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

    # Remove the default logger configured by Flask
    app.logger.removeHandler(default_handler)

    app.logger.info('Starting the Flask User Management App...')


# Whether the browser supports fetch and css variables

MIN_EDGE = 16
MIN_CHROME = 49
MIN_FIREFOX = 40
def is_old_browser(user_agent: str) -> bool:
    result = re.search(r"Trident\/(\d+)", user_agent)
    if result:
        return True
    result = re.search(r"Edge\/(\d+)", user_agent)
    if result and int(result.group(1)) < MIN_EDGE:
        return True
    result = re.search(r"Chrome\/(\d+)", user_agent)
    if result and int(result.group(1)) < MIN_CHROME:
        return True
    result = re.search(r"Firefox\/(\d+)", user_agent)
    if result and int(result.group(1)) < MIN_FIREFOX:
        return True
    print(user_agent)
    return False

# Adds padding of 0 to the start of each list in input
def pad_to_matrix(lst: list[list[int]], padding: int):
    return [pad_list(elem, padding) for elem in lst]

# add extra padding to a list
def pad_list(lst: list[int], padding: int):
    extra = padding - len(lst)
    return ([0] * extra) + lst

# Find the length of the longest list in a list of lists
def max_sub_array(arr: list[list]):
    return max([len(e) for e in arr])

