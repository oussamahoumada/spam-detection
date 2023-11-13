# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from flask_restx import Resource, Namespace
from flask import Response
import secrets

from ..extensions import db
from ..models.models import account,person
from ..models.api_models import account_model,account_input_model

accountNs = Namespace("Authentication")

class c_token :
    global token

@accountNs.route("/login/<string:mailAdress>/<string:passWord>")
class accountAPI(Resource):
    @accountNs.marshal_list_with(account_model)
    def get(self, mailAdress, passWord):
        req = account.query.filter(account.mailAdress == mailAdress, account.passWord == passWord).first()
        if(req):
            req.token = secrets.token_hex()
            c_token.token = req.token
            return req
        
        return "error",204
    
@accountNs.route("/register")
class accountAPI(Resource):
    @accountNs.expect(account_input_model)
    @accountNs.marshal_with(account_model)
    def post(self):
        pers = person(
            name=accountNs.payload["name"],
            gender=accountNs.payload["gender"],
            dateNaissance=accountNs.payload["dateNaissance"]
        )
        db.session.add(pers)
        db.session.commit()
        
        acc = account(
            pers_id=pers.idPers,
            passWord=accountNs.payload["passWord"],
            mailAdress=accountNs.payload["mailAdress"],
        )
        db.session.add(acc)
        db.session.commit()

        if(acc):
            return (acc,201)
        
        return "error",406
'''
def verify():
    if((hasattr(c_token,"token"))==True):
        if(c_token.token != None):
            return True
    return False

@accountNs.route("/logout")
class logoutAPI(Resource):
    @accountNs.marshal_list_with({})
    def logout():
        if(verify()):
            c_token.token = None
'''