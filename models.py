"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


# As a convenience, if we run this module interactively, the method below will leave you in a state of being able to work with the database directly.
# So that we can use Flask-SQLAlchemy, we'll make a Flask app
if __name__ == "__main__":
    from app import app
    connect_db(app)

DEFAULT_IMAGE = "https://tinyurl.com/demo-cupcake"


class Cupcake(db.Model):
    """create a Cupcake model"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE)

    def __repr__(self):
        return f"Cupcake {self.id} - {self.flavor} Flavor - Size {self.size} - {self.rating} Rating"

    def serialize(self):
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }
