# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from flask import Flask
from .extensions import api,db
from .controllers.mailController import mailNs
from .controllers.accountController import accountNs

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/spam_detection_db"
    
    api.init_app(app)
    db.init_app(app) 

    api.add_namespace(accountNs)
    api.add_namespace(mailNs)
    
    return app