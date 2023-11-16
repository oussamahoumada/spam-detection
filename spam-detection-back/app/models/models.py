# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from ..extensions import db

class person(db.Model):
    name = db.Column(db.String(250))
    dateNaissance = db.Column(db.Date)
    idPers = db.Column(db.Integer, primary_key=True)

    accounts = db.relationship("account",back_populates="pers")

class account(db.Model):
    passWord = db.Column(db.String(250))
    pers_id = db.Column(db.ForeignKey("person.idPers"))
    mailAdress = db.Column(db.String(250), primary_key=True)

    pers = db.relationship("person",back_populates="accounts")

class mail(db.Model):
    created_at = db.Column(db.Date)
    type = db.Column(db.String(250))
    sujet = db.Column(db.String(250))
    content = db.Column(db.String(250))
    idMail = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.ForeignKey("account.mailAdress"))
    reciever = db.Column(db.ForeignKey("account.mailAdress"))