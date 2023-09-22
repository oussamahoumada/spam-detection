# -*- coding: utf-8 -*-
"""
@author: oussama
"""
from flask_cors import CORS
from flask import Flask , request, jsonify
from spamDetectionProcess import demo

app=Flask(__name__,template_folder="templates")
app.config["DEBUG"] = True
CORS(app)

@app.route('/postMeth',methods=['POST'])
def postMeth():
    result = "Something went wrong"
    data = request.data.decode('UTF-8')
    
    txt = eval(data)['txt']
    
    if(demo(txt) == 0):
        result = "HAM"
        
    if(demo(txt) == 1):
        result = "SPAM"
        
    return jsonify(result)
    
@app.route('/heroes',methods=['GET'])
def getheroes():
    return jsonify([{'id':1,'name':"oussama"}])   
 
if __name__ == '__main__':
    from waitress import serve
    serve(app,host='127.0.0.1',port=5005)
    print("begin")