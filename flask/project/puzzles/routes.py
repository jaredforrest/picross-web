from werkzeug.datastructures import MultiDict
from flask import abort, render_template, request

from project import app_session, is_old_browser, max_sub_array, pad_to_matrix
from project.models import GridData, Level
from sqlalchemy import exc

from project.puzzles.parse import is_valid_level_name, parse_and_validate_data

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


@puzzles_blueprint.get('/puzzles/')
def list_puzzles():
    puzzles = app_session.query(Level).all()
    print(puzzles)
    return render_template('list.html', puzzles = puzzles)

@puzzles_blueprint.route("/puzzles/add", methods=['GET', 'POST'])
def add_new():
    if request.method == 'POST':
        data = request.get_json(force=True)
        if data:
            level_name = data["name"]
            level_data = parse_and_validate_data(data["data"])

            if not is_valid_level_name(level_name):
                print("Invalid Level Name")
                abort(400)

            if not level_data:
                print("Invalid Puzzle Data")
                abort(400)

            name_exists = app_session.query(Level).filter(
                    Level.name == level_name).scalar() is not None
            if name_exists:
                print("Puzzle with the same name already exists")
                abort(409)

            data_exists = app_session.query(Level).filter(
                    Level.data == level_data).scalar() is not None
            if data_exists:
                print("Puzzle already exists")
                abort(409)

            print(level_name, level_data)
            app_session.add(Level(name=level_name, data=level_data))
            try:
                app_session.commit()
            except exc.IntegrityError as e:
                print(e)
                abort(500)
        return "Hooray", 201
    else:
        ret = get_width_height(request.args)
        if not ret:
            abort(400)
        width, height = ret

        is_old = is_old_browser(request.headers.get('User-Agent', ''))
        side_nums = [[]] * height
        top_nums = [[]] * width
        padded_side_nums = pad_to_matrix(side_nums, (width + 3) // 2)
        padded_top_nums = pad_to_matrix(top_nums, (height + 3) // 2)
        transposed_padded_top_nums = list(zip(*padded_top_nums))
        return render_template('new.html', side_nums = side_nums, top_nums = top_nums, 
                padded_side_nums = padded_side_nums,
                transposed_padded_top_nums = transposed_padded_top_nums,
                is_old_browser=is_old)

@puzzles_blueprint.get("/valid_name")
def check_valid_level_name():
    level_name = request.args.get("name")
    if level_name:
        if not is_valid_level_name(level_name):
            return "Name should be alphanumeric"
        name_exists = app_session.query(Level).filter(
                Level.name == level_name).scalar() is not None
        if name_exists:
            return "Name already exists"
        else:
            return ""
    return ""

@puzzles_blueprint.get("/puzzle/<int:puzzle_id>")
def get_puzzle(puzzle_id: int):
    record = app_session.query(Level).filter(Level.id == puzzle_id).first()
    if record:
        is_old = is_old_browser(request.headers.get('User-Agent', ''))
        grid_data: GridData = record.data
        side_nums = grid_data["side_nums"]
        top_nums = grid_data["top_nums"]
        padded_side_nums = pad_to_matrix(side_nums, max_sub_array(side_nums) + 1)
        padded_top_nums = pad_to_matrix(top_nums, max_sub_array(top_nums) + 1)
        transposed_padded_top_nums = list(zip(*padded_top_nums))
        return render_template('index.html', side_nums = side_nums, top_nums = top_nums,
                padded_side_nums = padded_side_nums,
                transposed_padded_top_nums = transposed_padded_top_nums,
                is_old_browser=is_old)
    else:
        return str(puzzle_id)


## TODO delete puzzle
## TODO? edit puzzle
