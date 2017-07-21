from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

app = Flask(__name__)

engine = create_engine('sqlite:///restaurantmenu.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/')
@app.route('/restaurants/<int:restaurant_id>/')
def restaurantMenu(restaurant_id):
    restaurant = session.query(Restaurant).filter_by(id = restaurant_id).one()
    items = session.query(MenuItem).filter_by(restaurant_id = restaurant.id)
    output = ''
    for i in items:
        output += i.name
        output += '<br>'
        output += i.price
        output += '<br>'
        output += i.description
        output += '<br><br>'
    return output

# Task 1: Create route for newMenuItem function here
@app.route('/restaurants/<int:restaurant_id>/new')
def newMenuItem(restaurant_id):
    # try:
    #     restaurant = session.query(Restaurant).filter_by(id = restaurant_id).one()
    #     output = ''
    #     output += restaurant.name
    #     output += ' already exists.  Choose another index.'
    # except:
    #     output = ''
    #     output += 'Enter the name of the new restaurant below.'
    # return output
    return "page to create a new menu item.  Task 1 complete!"

# Task 2: Create route for editMenuItem function here

@app.route('/restaurants/edit/<int:restaurant_id>/<int:menu_id>')
def editMenuItem(restaurant_id, menu_id):
    # restaurant = session.query(Restaurant).filter_by(id = restaurant_id).one()
    # item = session.query(MenuItem).filter_by(id = menu_id).one()
    # output = ''
    # output += item.name
    # output += '<br>'
    # output += item.price
    # output += "<br>"
    # output += item.description
    # output += "<br><br>"
    # return output


    return "page to edit a menu item.  Take 2 complete!"

# Task 3: Create a route for deleteMenuItem function here
@app.route('/restaurants/delete/<int:restaurant_id>/<int:menu_id>')
def deleteMenuItem(restaurant_id, menu_id):
    # restaurant = session.query(Restaurant).filter_by(id = restaurant_id).one()
    # item = session.query(MenuItem).filter_by(id = menu_id).one()
    # output = ''
    # output += item.name
    # output += '<br>'
    # output += item.price
    # output += "<br>"
    # output += item.description
    # output += "<br><br>"
    # return output

    return "page to delete a menu item.  Task 3 complete!"


if __name__=='__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)
