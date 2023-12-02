# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from sqlalchemy import and_, or_, delete
from flask_restx import Resource, Namespace

from ..extensions import db
from ..models.models import mail
from ..spamDetectionProcess.process import mail_check
from ..models.api_models import mail_model, mail_input_model, mail_delete_model, mail_update_model, all_spams_delete_model

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
            getMail = mail.query.filter(mail.idMail == i['id']).first()

            if(getMail.sender == mailNs.payload["mail"]):
                getMail.sender = None

            if(getMail.reciever == mailNs.payload["mail"]):
                getMail.reciever = None

            db.session.flush()
            db.session.commit()

        '''
        mail_del = delete(mail).where(mail.idMail.in_(lst))
        db.session.execute(mail_del)
        db.session.commit()
        '''
        return "delete success",200

@mailNs.route("/delete_all_spams")
class mailAPI(Resource):
    @mailNs.expect(all_spams_delete_model)
    def post(self):
        Adress =  mailNs.payload["mail"]
        mail_del = delete(mail).where(and_(mail.type=="spam", mail.sender==Adress))
        db.session.execute(mail_del)
        db.session.commit()

        mail_del = delete(mail).where(and_(mail.type=="spam", mail.reciever==Adress))
        db.session.execute(mail_del)
        db.session.commit()
        return "success, all spams are deleted",200

def checkMail(content):
    if(mail_check(content) == 0):
        result = "mail"
        
    if(mail_check(content) == 1):
        result = "spam"
    
    return result