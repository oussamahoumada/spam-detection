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
        #remove punctuation and lowercase
        text = "".join([t.lower() for t in text if t not in string.punctuation])
        
        #tokenize
        tokens = text.split(" ") #"split demo" == ['split','demo']
        
        #filter out stopwords
        return " ".join(t for t in tokens if t not in ENGLISH_STOP_WORDS)

tfidf = TfidfVectorizer() 
Knn_classifier = KNeighborsClassifier()

#
def spamDetection():
    df = pd.read_csv("emails.csv")
    
    df['text'] = df['text'].apply(lambda text: preprocess(text))

    X = df['text']
    Y = df['spam']

    tfidf.fit(X)
    X_vectors = tfidf.transform(X)
    
    X_train,X_test,Y_train,Y_test = train_test_split(X_vectors,Y,test_size=0.2,random_state=42)
    
    Knn_classifier.fit(X_train,Y_train)
    Y_pred = Knn_classifier.predict(X_test)
    print("Accuracy : ",accuracy_score(Y_test,Y_pred))
    print("Precision : ",precision_score(Y_test,Y_pred))
    print("Recall : ",recall_score(Y_test,Y_pred))

def demo(txt):
    
    msg = [txt]
    processed = [preprocess(m) for m in msg]
    vectors = tfidf.transform(processed)
    result = Knn_classifier.predict(vectors)
    
    return result

spamDetection()