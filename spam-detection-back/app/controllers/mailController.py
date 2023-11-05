# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from sqlalchemy import or_
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import mail
from ..models.api_models import mail_model, mail_input_model

mailNs = Namespace("Mail")

@mailNs.route("/<string:Adress>")
class mailAPI(Resource):
    @mailNs.marshal_list_with(mail_model)
    def get(self,Adress):
        req = mail.query.filter(or_(mail.sender==Adress,mail.reciever==Adress)).all()
        return req
    
@mailNs.route("/<string:reciever>/<string:sender>")
class mailAPI(Resource):
    @mailNs.expect(mail_model)
    @mailNs.marshal_with(mail_input_model)
    def post(self,reciever,sender):
        
        m = mail(
            sender=sender,
            reciever=reciever,
            type=mailNs.payload["type"],
            sujet=mailNs.payload["sujet"],
            content=mailNs.payload["content"],
            created_at=mailNs.payload["created_at"],
        )
        db.session.add(m)
        db.session.commit()
        
        return (m,201)