from project.models import GridData, Level

def test_new_user():
    """
    GIVEN a Level model
    WHEN a new Puzzle is created
    THEN check the author, name, and data fields are defined correctly
    """
    puzzle = Level(author='FakeUser', name='FakeLevel', data=GridData(side_nums=[[]], top_nums=[[]]))
    assert puzzle.author == 'FakeUser'
    assert puzzle.name == 'FakeLevel'
    assert puzzle.data == GridData(side_nums=[[]], top_nums=[[]])

