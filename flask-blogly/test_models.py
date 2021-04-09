from unittest import TestCase
from app import app
from models import db, User, Post, Tag, PostTag

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

db.drop_all()
db.create_all()

USER_DATA = {
    "first_name": 'Brent',
    "last_name": 'Franklin',
    "img_url": "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
}


class UserModelTestCase(TestCase):
    """Tests for User model"""

    def setUp(self):
        """Clear Database"""
        User.query.delete()
        self.user = User(**USER_DATA)

        db.session.add(self.user)
        db.session.commit()

    def tearDown(self):
        """Clean up transactions"""
        db.session.rollback()

    def test_full_name(self):
        """Check full name method works"""
        self.assertEqual(self.user.full_name(), "Brent Franklin")

    def test_get_single_user(self):
        """Get single user from the database"""
        with app.test_client() as client:
            response = client.get(f"/user_detail/{self.user.id}")
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)

            self.assertIn(self.user.full_name(), html)

    def test_edit_user(self):
        """Check edit user method redirects"""
        with app.test_client() as client:
            response = client.post(f"/edit_user/{self.user.id}", data={
                "first_name": "Brent-edited",
                "last_name": "Franklin-edited",
                "img_url": ""
            })

            self.assertEqual(response.status_code, 302)

    def test_edit_user_redirected(self):
        """Check edit user method works"""
        with app.test_client() as client:
            response = client.post(f"/edit_user/{self.user.id}", follow_redirects=True, data={
                "first_name": "Brent-edited",
                "last_name": "Franklin-edited",
                "img_url": ""
            })
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn("Brent-edited Franklin-edited", html)
            self.assertIn(
                "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png", html)


POST_DATA = {
    "title": "Post Title",
    "content": "Post Content"
}


class PostModelTestCase(TestCase):
    """Test for Post model"""

    def setUp(self):
        """Clear Database"""
        User.query.delete()
        Post.query.delete()

        self.user = User(**USER_DATA)
        db.session.add(self.user)
        db.session.commit()

        self.post = Post(**POST_DATA, user_id=self.user.id)
        db.session.add(self.post)
        db.session.commit()

    def tearDown(self):
        """Clean up transactions"""
        db.session.rollback()

    def test_get_single_post(self):
        """Get a single post from the database"""
        with app.test_client() as client:
            response = client.get(f"/post_detail/{self.post.id}")
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)

            self.assertIn('Post Title', html)
            self.assertIn('Post Content', html)
            self.assertIn('Brent Franklin', html)

    def test_delete_post_redirect(self):
        """Delete a single post then redirect"""
        with app.test_client() as client:
            response = client.post(f"/delete_post/{self.post.id}")
            self.assertEqual(response.status_code, 302)

    def test_post_shows_on_profile(self):
        """The post title should show on the users profile"""
        with app.test_client() as client:
            response = client.get(f"user_detail/{self.user.id}")
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)

            self.assertIn("Post Title", html)

    def test_delete_post(self):
        """Post title should not show on profile anymore"""
        with app.test_client() as client:
            id = self.post.id
            response = client.post(f"/delete_post/{id}", follow_redirects=True)
            html = response.get_data(as_text=True)
            self.assertEqual(response.status_code, 200)

            self.assertNotIn("Post Title", html)


TAG_DATA = {
    "name": "Like"
}


class TagModelTestCase(TestCase):
    """Test for Tag model"""

    def setUp(self):
        """Clear Database"""
        User.query.delete()
        Post.query.delete()
        Tag.query.delete()

        self.user = User(**USER_DATA)
        db.session.add(self.user)
        db.session.commit()

        self.post = Post(**POST_DATA, user_id=self.user.id)
        db.session.add(self.post)
        db.session.commit()

        self.tag = Tag(**TAG_DATA)
        db.session.add(self.tag)
        db.session.commit()

        PostTag.add_post_tag(PostTag(post_id=self.post.id, tag_id=self.tag.id))

    def tearDown(self):
        """Clean up transactions"""
        db.session.rollback()

    def test_tag_list(self):
        """Test tag list shows added tag"""
        with app.test_client() as client:
            response = client.get(f"/tag_list/")
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)

            self.assertIn('Like', html)

    def test_tag_shows_on_post(self):
        """Test that the tag is showing on the post"""
        with app.test_client() as client:
            response = client.get(f"/post_detail/{self.post.id}")
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)

            self.assertIn('Like', html)

    def test_post_shows_on_tag(self):
        """Test that the post is showing on the tag"""
        with app.test_client() as client:
            response = client.get(f"/tag_detail/{self.tag.id}")
            self.assertEqual(response.status_code, 200)
            html = response.get_data(as_text=True)

            self.assertIn('Post Title', html)
