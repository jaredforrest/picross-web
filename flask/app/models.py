from typing import TypedDict
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
        return bson.loads(value)

class Record(Base):
    __tablename__ = "Puzzles"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    author = Column(String, nullable=True)
    data = Column(JSONEncodedDict, unique=True, nullable=False)

    def to_dict(self):
        return {
                column.name: getattr(self, column.name) for column in self.__table__.columns
        }
