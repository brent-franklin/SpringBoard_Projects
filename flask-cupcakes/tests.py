from unittest import TestCase

from app import app
from models import db, Cupcake

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()


CUPCAKE_DATA = {
    "flavor": "TestFlavor",
    "size": "TestSize",
    "rating": 5,
    "image": "http://test.com/cupcake.jpg"
}

CUPCAKE_DATA_2 = {
    "flavor": "TestFlavor2",
    "size": "TestSize2",
    "rating": 10,
    "image": "http://test.com/cupcake2.jpg"
}


class CupcakeViewsTestCase(TestCase):
    """Tests for views of API."""

    def setUp(self):
        """Make demo data."""

        Cupcake.query.delete()

        cupcake = Cupcake(**CUPCAKE_DATA)
        db.session.add(cupcake)
        db.session.commit()

        self.cupcake = cupcake

    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    def test_list_cupcakes(self):
        """Get all of the cupcakes from the database"""
        with app.test_client() as client:
            resp = client.get("/api/cupcakes")

            self.assertEqual(resp.status_code, 200)

            data = resp.json
            self.assertEqual(data, {
                "cupcakes": [
                    {
                        "id": self.cupcake.id,
                        "flavor": "TestFlavor",
                        "size": "TestSize",
                        "rating": 5,
                        "image": "http://test.com/cupcake.jpg"
                    }
                ]
            })

    def test_get_cupcake(self):
        """Get a single cupcake from the database"""
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            resp = client.get(url)

            self.assertEqual(resp.status_code, 200)
            data = resp.json
            self.assertEqual(data, {
                "cupcake": {
                    "id": self.cupcake.id,
                    "flavor": "TestFlavor",
                    "size": "TestSize",
                    "rating": 5,
                    "image": "http://test.com/cupcake.jpg"
                }
            })

    def test_create_cupcake(self):
        """Create and add a new cupcake to the database"""
        with app.test_client() as client:
            url = "/api/cupcakes"
            resp = client.post(url, json=CUPCAKE_DATA_2)

            self.assertEqual(resp.status_code, 201)

            data = resp.json

            # don't know what ID we'll get, make sure it's an int & normalize
            self.assertIsInstance(data['cupcake']['id'], int)
            del data['cupcake']['id']

            self.assertEqual(data, {
                "cupcake": {
                    "flavor": "TestFlavor2",
                    "size": "TestSize2",
                    "rating": 10,
                    "image": "http://test.com/cupcake2.jpg"
                }
            })

            self.assertEqual(Cupcake.query.count(), 2)

    def test_update_cupcake(self):
        """Update an existing cupcake on the database"""
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            UPDATE_CUPCAKE_DATA = {
                "flavor": "NewFlavor",
                "size": "NewSize",
                "rating": "1"
            }
            resp = client.patch(url, json=UPDATE_CUPCAKE_DATA)

            self.assertEqual(resp.status_code, 200)

            data = resp.json

            self.assertEqual(data, {
                "cupcake": {
                    "id": self.cupcake.id,
                    "flavor": "NewFlavor",
                    "size": "NewSize",
                    "rating": 1,
                    "image": "http://test.com/cupcake.jpg"
                }
            })

    def test_delete_cupcake(self):
        """Delete a cupcake from the database"""
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            resp = client.delete(url)

            self.assertEqual(resp.status_code, 200)
            data = resp.json
            self.assertEqual(data, {"Message": "Deleted"})

    def test_get_cupcake_404(self):
        """Gettings a non-existant cupcake responds with a 404"""
        with app.test_client() as client:
            url = f"/api/cupcakes/1000"
            resp = client.get(url)

            self.assertEqual(resp.status_code, 404)

    def test_update_cupcake_404(self):
        """Updating a non-existant cupcake responds with a 404"""
        with app.test_client() as client:
            url = f"/api/cupcakes/1000"
            UPDATE_CUPCAKE_DATA = {
                "flavor": "NewFlavor",
                "size": "NewSize",
                "rating": "1"
            }
            resp = client.patch(url, json=UPDATE_CUPCAKE_DATA)

            self.assertEqual(resp.status_code, 404)

    def test_delete_cupcake_404(self):
        """Deleting a non-existant cupcake responds with a 404"""
        with app.test_client() as client:
            url = f"/api/cupcakes/1000"
            resp = client.delete(url)

            self.assertEqual(resp.status_code, 404)
