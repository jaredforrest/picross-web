from flask import abort, render_template, request

from project import app_session, is_old_browser, max_sub_array, pad_to_matrix
from project.models import GridData, Level
from sqlalchemy import exc

from project.puzzles.parse import is_valid_level_name, parse_and_validate_data

from . import api_blueprint


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

def puzzle_to_dict(puzzle: Level):
    return {
            "id": puzzle.id,
            "name": puzzle.name,
            "author": puzzle.author,
            "width": len(puzzle.data["top_nums"]),
            "height": len(puzzle.data["side_nums"]),
            }

@api_blueprint.get("/api/puzzle_list")
def get_puzzle_list():

    puzzles = app_session.query(Level).all()
    puzzles = list(map(puzzle_to_dict, puzzles))
    return puzzles

@api_blueprint.route("/api/puzzle_add", methods=['GET', 'POST'])
def add_new():
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
#    else:
#        ret = get_width_height(request.args)
#        if not ret:
#            abort(400)
#        width, height = ret
#
#        is_old = is_old_browser(request.headers.get('User-Agent', ''))
#        side_nums = [[]] * height
#        top_nums = [[]] * width
#        padded_side_nums = pad_to_matrix(side_nums, (width + 3) // 2)
#        padded_top_nums = pad_to_matrix(top_nums, (height + 3) // 2)
#        transposed_padded_top_nums = list(zip(*padded_top_nums))
#        return render_template('new.html', side_nums = side_nums, top_nums = top_nums, 
#                padded_side_nums = padded_side_nums,
#                transposed_padded_top_nums = transposed_padded_top_nums,
#                is_old_browser=is_old)

@api_blueprint.get("/valid_name")
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

@api_blueprint.get("/api/puzzle")
def get_puzzle():

    puzzle_id = request.args.get("id")

    if not puzzle_id:
        return "Invalid Request", 400

    try:
        puzzle_id = int(puzzle_id)
    except:
        return "Invalid Request", 400

    record = app_session.query(Level).filter(Level.id == puzzle_id).first()

    if not record:
        return "No such level", 400

    grid_data = record.data
    side_nums = grid_data["side_nums"]
    top_nums = grid_data["top_nums"]

    return {"sideNums": side_nums, "topNums": top_nums}
    



## TODO delete puzzle
## TODO? edit puzzle
