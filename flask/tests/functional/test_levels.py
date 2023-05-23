from project import create_app
import os


def test_home_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/puzzles' page is requested (GET)
    THEN check that the response is valid
    """
    # Set the Testing configuration prior to creating the Flask application
    os.environ['CONFIG_TYPE'] = 'config.TestingConfig'
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.get('/puzzles')
        assert response.status_code == 200
        assert b"<div role=\"banner\"><a href=\"/puzzles\">Picross Online</a></div>" in response.data
