# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import account,person
from ..models.api_models import account_model,account_input_model

accountNs = Namespace("Account")

@accountNs.route("")
class accountAPI(Resource):
    @accountNs.marshal_list_with(account_model)
    def get(self):
        return account.query.all()
    
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

        return (acc,201)
