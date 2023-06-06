from project.models import GridData

# Pretty self explanatory. Checks the input data is in the correct form
# then converts it to the database format
def parse_and_validate_data(data: list[list[list[int]]]) -> GridData | None:
    is_valid_type = (isinstance(data, list) and
    isinstance(data[0], list) and
    isinstance(data[1], list) and
    all(isinstance(elem, list) for elem in data[0]) and
    all(isinstance(elem, list) for elem in data[1]) and
    all(all(isinstance(elem, int) for elem in lst) for lst in data[0]) and
    all(all(isinstance(elem, int) for elem in lst) for lst in data[1]))

    if not is_valid_type:
        return None
    return {"side_nums": data[0], "top_nums": data[1]}

# Currently the only requirement is that the data is alphanumeric
def is_valid_level_name(level_name: str):
    return level_name.isalnum()
    # (not any(x.isspace() for x in level_name))
