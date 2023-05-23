"""
The puzzles Blueprint handles the creation, modification, deletion,
and viewing of books for the users of this application.
"""
from flask import Blueprint


puzzles_blueprint = Blueprint('puzzles', __name__, template_folder='templates')

from . import routes

