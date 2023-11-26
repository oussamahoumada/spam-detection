# -*- coding: utf-8 -*-
"""
@author: oussama
"""
import string 
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from sklearn.metrics import accuracy_score, recall_score, precision_score 

#Remove punctuation and ENGLISH_STOP_WORDS(array contain the stop words)
def preprocess(text):
    #remove punctuation and lowercase (filter)
    text = "".join([t.lower() for t in text if t not in string.punctuation])
    
    lst = text.split(" ")
    
    #filter out stopwords
    return " ".join(t for t in lst if t not in ENGLISH_STOP_WORDS)

tfidf = TfidfVectorizer() 
Knn_classifier = KNeighborsClassifier()
import os

cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd)  # Get all the files in that directory
#print("Files in %r: %s" % (cwd, files))

def spamDetection():
    df = pd.read_csv(cwd+"/app/spamDetectionProcess/emails.csv")
    
    df['text'] = df['text'].apply(lambda text: preprocess(text))

    X = df['text']
    Y = df['spam']

    tfidf.fit(X)
    X_vectors = tfidf.transform(X)
    
    X_train,X_test,Y_train,Y_test = train_test_split(X_vectors,Y,test_size=0.2,random_state=42)
    
    Knn_classifier.fit(X_train,Y_train)
    Y_pred = Knn_classifier.predict(X_test)
    '''print("Accuracy : ",accuracy_score(Y_test,Y_pred))
    print("Precision : ",precision_score(Y_test,Y_pred))
    print("Recall : ",recall_score(Y_test,Y_pred))'''

def mail_check(txt):
    
    msg = [txt]
    processed = [preprocess(m) for m in msg]
    vectors = tfidf.transform(processed)
    result = Knn_classifier.predict(vectors)
    
    return result
