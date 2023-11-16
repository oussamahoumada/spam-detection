# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from sqlalchemy import or_
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import mail
from ..spamDetectionProcess.process import demo
from ..models.api_models import mail_model, mail_input_model

mailNs = Namespace("Mail")

@mailNs.route("/<string:Adress>")
class mailAPI(Resource):
    @mailNs.marshal_list_with(mail_model)
    def get(self,Adress):
        req = mail.query.filter(or_(mail.sender==Adress,mail.reciever==Adress)).all()
        return req
    
@mailNs.route("/")
class mailAPI(Resource):
    @mailNs.expect(mail_input_model)
    @mailNs.marshal_with(mail_model)
    def post(self):       
        m = mail(
            sender=mailNs.payload["sender"],
            sujet = mailNs.payload["sujet"],
            content = mailNs.payload["content"],
            reciever = mailNs.payload["reciever"],
            created_at = mailNs.payload["created_at"],
            type = checkMail(mailNs.payload["content"]),
        )
        db.session.add(m)
        db.session.commit()
        
        return (m,201)

def checkMail(content):
    if(demo(content) == 0):
        result = "mail"
        
    if(demo(content) == 1):
        result = "spam"
    
    return result