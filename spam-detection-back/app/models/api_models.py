# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from ..extensions import api
from flask_restx import fields

personne_model = api.model("person",{
    'name' : fields.String,
    'dateNaissance' : fields.Date,

    #'comptes' : fields.List(fields.Nested(compte_model)),
})

account_model = api.model("account",{
    'pers_id' : fields.Integer,
    'mailAdress' : fields.String,
    'token' : fields.String,
    
    'pers':fields.List(fields.Nested(personne_model)),
})

account_input_model = api.model("accountInput",{
    'name' : fields.String,
    'passWord' : fields.String,
    'mailAdress' : fields.String,
    'dateNaissance' : fields.Date,    
})

mail_model = api.model("mail",{
    'idMail' : fields.String,	
    'type' : fields.String,	
    'sujet' : fields.String,
    'sender' : fields.String,
    'content' : fields.String,	
    'created_at' : fields.Date,
    'reciever' : fields.String,	
})

mail_input_model = api.model("mailInput",{
    'sujet' : fields.String,
    'sender' : fields.String,
    'content' : fields.String,
    'reciever' : fields.String,	
    'created_at' : fields.Date,	
})

login_input_model = api.model("login_input",{
    'passWord' : fields.String,
    'mailAdress' : fields.String,
})

mail_delete_model = api.model("mail_delete_input",{
    'ids' : fields.Raw(),
    'mail' : fields.String,
})

mail_update_model = api.model("mail_update_input",{
    'idMail' : fields.Integer,
    'type' : fields.String,
})

all_spams_delete_model = api.model("all_spams_delete_input",{
    'mail' : fields.String,
})