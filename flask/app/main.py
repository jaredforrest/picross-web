from typing import List
from flask import Flask, Response, redirect, render_template, url_for, abort
from flask_cors import CORS
from sqlalchemy.orm import scoped_session
from flask import request
from ua_parser import user_agent_parser

from sqlalchemy import exc
#from flask_minify import Minify
from flask_compress import Compress


from . import models
from .database import SessionLocal, engine
from .user_agent import is_old_browser

import greenlet

models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)

app.config['COMPRESS_BR_LEVEL'] = 11
app.config['COMPRESS_MIMETYPES'] = 	['text/html','text/css','text/xml','application/json','application/javascript','text/javascript']
Compress(app)
#Minify(app=app, html=True, js=True, cssless=True)

app.config['TEMPLATES_AUTO_RELOAD'] = True
CORS(app)
#app.session = scoped_session(SessionLocal, scopefunc=_app_ctx_stack.__ident_func__)
app_session = scoped_session(SessionLocal, scopefunc=greenlet.getcurrent)


@app.route("/")
def main():
    return f"See the data at {url_for('show_records')}"


@app.route("/puzzles/")
def show_records():
    puzzles = app_session.query(models.Record).all()
    print(puzzles)
    return render_template('list.html', puzzles = puzzles)


@app.route("/puzzle/<int:puzzle_id>")
def get_puzzle(puzzle_id: int):
    record = app_session.query(models.Record).filter(models.Record.id == puzzle_id).first()
    if record:
        #cool = record.data
        #print(cool)
        #num = id(2)
        #print(id)
        #return jsonify(record.to_dict())
        return render_template('index.html', side_nums = record.data["side_nums"], top_nums = record.data["top_nums"])
    else:
        return str(puzzle_id)

@app.route("/new_puzzle/<int:width>x<int:height>")
def new_puzzle(width: int, height: int):
    is_old = is_old_browser(request.headers.get('User-Agent', ''))
    print(is_old)
    if width > 100 or height > 100 or width < 1 or height < 1:
        return "Size out of range"
    else:
        return render_template('new.html', side_nums = [[]] * width, top_nums = [[]] * height, is_old_browser=is_old)

@app.route("/add_new", methods=['POST'])
def add_new():
    data = request.get_json(force=True)
    if data:
        level_name = data["name"]
        level_data = parse_data(data["data"])

        if not is_valid_level_name(level_name):
            print("asf")
            abort(400)

        if not level_data:
            print("aasdjfjifaldfjilsf")
            abort(400)

        name_exists = app_session.query(models.Record).filter(models.Record.name == level_name).scalar() is not None
        if name_exists:
            abort(409)

        data_exists = app_session.query(models.Record).filter(models.Record.data == level_data).scalar() is not None
        if data_exists:
            abort(409)

        print(level_name, level_data)
        app_session.add(models.Record(name=level_name, data=level_data))
        try:
            app_session.commit()
        except exc.IntegrityError as e:
            print(e)
            abort(500)
    return "Hooray", 201


@app.route("/valid_name")
def check_valid_level_name():
    level_name = request.args.get("name")
    if level_name:
        if not is_valid_level_name(level_name):
            return "Name should be alphanumeric"
        name_exists = app_session.query(models.Record).filter(models.Record.name == level_name).scalar() is not None
        if name_exists:
            return "Name already exists"
        else:
            return ""
    return ""

@app.route("/file_upload", methods=['GET', 'POST'])
def file_upload():
    if request.method == 'POST':
        name = request.form.get('levelname')
        data = request.files.get('file')

        if data:
            if not name:
                name = data.filename
            print(data.filename)
            print(data.stream.read())
            return redirect('https://www.google.com')
            #resp = Response("Foo bar baz")
            #resp.headers['Access-Control-Allow-Origin'] = '*'
            #resp.headers['Location'] = 'https://www.google.com'
        return ""
    elif request.method == 'GET':
        # parse_non(file)
        # add file to database
        return render_template('file.html')
    else:
        print(request.method)
        return ""


def is_valid_level_name(level_name: str):
    return level_name.isalnum()
    # (not any(x.isspace() for x in level_name))

def parse_data(data: list[list[list[int]]]) -> models.GridData | None:
    is_valid_type = (isinstance(data, list) and
    isinstance(data[0], list) and
    isinstance(data[1], list) and
    all([isinstance(l, list) for l in data[0]]) and
    all([isinstance(l, list) for l in data[1]]) and
    all([all([isinstance(i, int) for i in l]) for l in data[0]]) and
    all([all([isinstance(i, int) for i in l]) for l in data[1]]))

    if not is_valid_type:
        return None
    return {"side_nums": data[0], "top_nums": data[1]}


@app.teardown_appcontext
def remove_session(*args, **kwargs):
    app_session.remove()
