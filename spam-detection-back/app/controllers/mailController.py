# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from sqlalchemy import or_, delete
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import mail
from ..spamDetectionProcess.process import mail_check
from ..models.api_models import mail_model, mail_input_model, mail_delete_model, mail_update_model

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
    
    @mailNs.expect(mail_update_model)
    def put(self):

        getMail = mail.query.filter(mail.idMail == mailNs.payload["idMail"]).first()       
        getMail.type = mailNs.payload["type"]

        db.session.flush()
        db.session.commit()
        
        return ("update success",201)
    
@mailNs.route("/delete")
class mailAPI(Resource):
    @mailNs.expect(mail_delete_model)
    def post(self):
        lst=[]
        for i in mailNs.payload["ids"]:
            lst.append(i['id'])
        mail_del = delete(mail).where(mail.idMail.in_(lst))
        db.session.execute(mail_del)
        db.session.commit()
        return "delete success",200

@mailNs.route("/delete_all_spams")
class mailAPI(Resource):
    def get(self):
        mail_del = delete(mail).where(mail.type=="spam")
        db.session.execute(mail_del)
        db.session.commit()
        return "success, all spams are deleted",200

def checkMail(content):
    if(mail_check(content) == 0):
        result = "mail"
        
    if(mail_check(content) == 1):
        result = "spam"
    
    return result