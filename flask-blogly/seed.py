from models import User, Post, Tag, PostTag, db, connect_db
from app import app


db.drop_all()
connect_db(app)
db.create_all()

User.query.delete()

user1 = User(first_name='Brent', last_name='Franklin', img_url="")
user2 = User(first_name='Jennifer', last_name='Lake', img_url="")
user3 = User(first_name='Joseph', last_name='Taylor', img_url="")

db.session.add(user1)
db.session.add(user2)
db.session.add(user3)

db.session.commit()

Post.query.delete()

post1 = Post(title="Test1", content="This is a test", user_id=user1.id)
post2 = Post(title="Test2", content="This is a test", user_id=user1.id)
post3 = Post(title="Test3", content="This is a test", user_id=user1.id)

post4 = Post(title="Test1", content="This is a test", user_id=user2.id)
post5 = Post(title="Test2", content="This is a test", user_id=user2.id)
post6 = Post(title="Test3", content="This is a test", user_id=user2.id)

post7 = Post(title="Test1", content="This is a test", user_id=user3.id)
post8 = Post(title="Test2", content="This is a test", user_id=user3.id)
post9 = Post(title="Test3", content="This is a test", user_id=user3.id)

db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.add(post4)
db.session.add(post5)
db.session.add(post6)
db.session.add(post7)
db.session.add(post8)
db.session.add(post9)

db.session.commit()

Tag.query.delete()

tag1 = Tag(name="fun")
tag2 = Tag(name="happy")
tag3 = Tag(name="excited")

db.session.add(tag1)
db.session.add(tag2)
db.session.add(tag3)

db.session.commit()


posttag1 = PostTag(post_id=post1.id, tag_id=tag1.id)
posttag2 = PostTag(post_id=post1.id, tag_id=tag2.id)
posttag3 = PostTag(post_id=post1.id, tag_id=tag3.id)
posttag4 = PostTag(post_id=post2.id, tag_id=tag1.id)
posttag5 = PostTag(post_id=post2.id, tag_id=tag2.id)
posttag6 = PostTag(post_id=post2.id, tag_id=tag3.id)
posttag7 = PostTag(post_id=post3.id, tag_id=tag1.id)
posttag8 = PostTag(post_id=post3.id, tag_id=tag2.id)
posttag9 = PostTag(post_id=post3.id, tag_id=tag3.id)

posttag11 = PostTag(post_id=post4.id, tag_id=tag1.id)
posttag12 = PostTag(post_id=post4.id, tag_id=tag2.id)
posttag13 = PostTag(post_id=post4.id, tag_id=tag3.id)
posttag14 = PostTag(post_id=post5.id, tag_id=tag1.id)
posttag15 = PostTag(post_id=post5.id, tag_id=tag2.id)
posttag16 = PostTag(post_id=post5.id, tag_id=tag3.id)
posttag17 = PostTag(post_id=post6.id, tag_id=tag1.id)
posttag18 = PostTag(post_id=post6.id, tag_id=tag2.id)
posttag19 = PostTag(post_id=post6.id, tag_id=tag3.id)

posttag21 = PostTag(post_id=post7.id, tag_id=tag1.id)
posttag22 = PostTag(post_id=post7.id, tag_id=tag2.id)
posttag23 = PostTag(post_id=post7.id, tag_id=tag3.id)
posttag24 = PostTag(post_id=post8.id, tag_id=tag1.id)
posttag25 = PostTag(post_id=post8.id, tag_id=tag2.id)
posttag26 = PostTag(post_id=post8.id, tag_id=tag3.id)
posttag27 = PostTag(post_id=post9.id, tag_id=tag1.id)
posttag28 = PostTag(post_id=post9.id, tag_id=tag2.id)
posttag29 = PostTag(post_id=post9.id, tag_id=tag3.id)


db.session.add(posttag1)
db.session.add(posttag2)
db.session.add(posttag3)
db.session.add(posttag4)
db.session.add(posttag5)
db.session.add(posttag6)
db.session.add(posttag7)
db.session.add(posttag8)
db.session.add(posttag9)

db.session.add(posttag11)
db.session.add(posttag12)
db.session.add(posttag13)
db.session.add(posttag14)
db.session.add(posttag15)
db.session.add(posttag16)
db.session.add(posttag17)
db.session.add(posttag18)
db.session.add(posttag19)

db.session.add(posttag21)
db.session.add(posttag22)
db.session.add(posttag23)
db.session.add(posttag24)
db.session.add(posttag25)
db.session.add(posttag26)
db.session.add(posttag27)
db.session.add(posttag28)
db.session.add(posttag29)

db.session.commit()
