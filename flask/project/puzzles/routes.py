from werkzeug.datastructures import MultiDict
from flask import render_template

from . import puzzles_blueprint


# --------------
# Helper
# --------------

MAX_SIZE = 100
def get_width_height(args: MultiDict[str, str]):

    width = args.get('width')
    height = args.get('height')
    if not width or not height:
        return None
    try:
        width = int(width)
        height = int(height)
    except ValueError:
        return None

    if width and height and 0 < width <= MAX_SIZE and 0 < height <= MAX_SIZE:
        return width, height
    else:
        return None



# ------
# Routes
# ------

#@books_blueprint.route('/')
#def index():
#    # If the user is already logged in, redirect to the list of books
#    if current_user.is_authenticated:
#        return redirect(url_for('books.list_books'))
#
#    return render_template('books/index.html')

@puzzles_blueprint.get('/puzzles')
@puzzles_blueprint.get("/puzzle/<int:puzzle_id>")
@puzzles_blueprint.get("/puzzle/add")
def get_puzzle(puzzle_id = None):
    return render_template('global.html')


## TODO delete puzzle
## TODO? edit puzzle
