from ua_parser import user_agent_parser
import re

def is_old_browser(user_agent: str) -> bool:
    result = re.search(r"Trident\/(\d+)", user_agent)
    if result:
        return True
    result = re.search(r"Edge\/(\d+)", user_agent)
    if result and int(result.group(1)) < 14:
        return True
    result = re.search(r"Chrome\/(\d+)", user_agent)
    if result and int(result.group(1)) < 42:
        return True
    result = re.search(r"Firefox\/(\d+)", user_agent)
    if result and int(result.group(1)) < 40:
        return True
    print(user_agent)
    return False
