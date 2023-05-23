from typing import Any, TypedDict
from sqlalchemy import Column, Integer, LargeBinary, String
from .database import Base

from sqlalchemy.types import TypeDecorator
import bson

class GridData(TypedDict):
    side_nums: list[list[int]]
    top_nums: list[list[int]]

class JSONEncodedDict(TypeDecorator[GridData]):

    impl = LargeBinary

    cache_ok = True

    def process_bind_param(self, value: GridData, dialect):
        return bson.dumps(value)

    def process_result_value(self, value: bytes, dialect)-> GridData:
        ret = parse_and_validate_grid_data(bson.loads(value))
        if ret:
            return ret
        else:
            raise

class Level(Base):
    __tablename__ = "Puzzles"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    author = Column(String, nullable=True)
    data = Column(JSONEncodedDict, unique=True, nullable=False)

    def to_dict(self):
        return {
            column.name: getattr(self, column.name) for column in self.__table__.columns
        }

def parse_and_validate_grid_data(data: Any) -> GridData | None:
    is_valid_type = (isinstance(data, dict) and
    isinstance(data.get("side_nums") , list) and
    isinstance(data.get("top_nums") , list) and
    all(isinstance(elem, list) for elem in data["side_nums"]) and
    all(isinstance(elem, list) for elem in data["top_nums"]) and
    all(all(isinstance(elem, int) for elem in lst) for lst in data["side_nums"]) and
    all(all(isinstance(elem, int) for elem in lst) for lst in data["top_nums"]))

    if not is_valid_type:
        return None
    return {"side_nums": data[0], "top_nums": data[1]}
