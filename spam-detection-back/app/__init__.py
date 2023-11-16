# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from flask import Flask
from flask_cors import CORS

from .extensions import api,db
from .controllers.mailController import mailNs
from .controllers.accountController import accountNs
from .spamDetectionProcess.process import spamDetection

spamDetection()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/spam_detection_db"
    CORS(app, resources={r"/Authentication/*": {"origins": "*"}})
    CORS(app, resources={r"/Mail/*": {"origins": "*"}})
    
    api.init_app(app)
    db.init_app(app) 

    api.add_namespace(accountNs)
    api.add_namespace(mailNs)
    
    return app