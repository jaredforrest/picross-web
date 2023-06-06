"""
The puzzles Blueprint handles the creation, modification, deletion,
and viewing of books for the users of this application.
"""
from flask import Blueprint


api_blueprint = Blueprint('api', __name__, template_folder='templates')

from . import routes

