from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, os
import numpy as np
import logging
import json
import pandas as pd
import keras as tf
from tensorflow import keras
from keras.models import Sequential
from keras import models
import pathlib
from Recommender import *
from imageSearch import *
from MachineLearning import *


app = Flask(__name__)
CORS(app)

# Fuel Efficinecy Prediction API call
@app.route('/getform', methods=['GET', 'POST'])
def get_data():

    # The user input
    input = request.get_json()

    # convert user data to dataframe
    car = pd.DataFrame({"Cylinders": [input["cylinders"]],
                        "Displacement": [input["displacement"]],
                        "Horsepower": [input["horsepower"]],
                        "Weight": [input["weight"]],
                        "Acceleration": [input["acceleration"]],
                        "Model Year": [input["model_year"]],
                        "Origin": [input["origin"]]
                        })
            
    # Pass user entered data to preparation funtion
    res = prep(car)

    # Remove outer brackets
    res2 = str(res)[1:-1] 
    res3 = str(res2)[1:-1] 

    # Convert MPG to kpl and reduce to two demicimal place
    litre = float(res3) / 2.353
    litre = format(litre, '.2f')

    res3 = format(float(res3), '.2f')

    # Calculate the yearly volume of fuel
    fuel_vol_l = 17000 / float(litre)
    fuel_vol_g = float(fuel_vol_l) / 3.785
    

    # Calculate yearly Fuel Price
    diesel = float(fuel_vol_l) * 1.338
    petrol = float(fuel_vol_l) * 1.249
    
    # Add commas and fix decimal place
    fuel_vol_l = format(fuel_vol_l, ',.2f')
    fuel_vol_g = format(fuel_vol_g, ',.2f')
    diesel = format(diesel, ',.2f')
    petrol = format(petrol, ',.2f')

    # return {'sum': res3}
    return {'sum': res3, 'sum2':litre, 'vol_l':fuel_vol_l, 'vol_g':fuel_vol_g, 'price_d':diesel, 'price_p':petrol}


# Car Recommender API call
@app.route('/getRecomm', methods=['GET', 'POST'])
def get_data2():

    recommInput = request.get_json()

    # convert user data to dataframe
    car2 = pd.DataFrame({"Year": [recommInput["year"]],
                        "Number of Doors": [recommInput["doors"]],
                        "MPG": [recommInput["mpg"]],
                        "Transmission Type": [recommInput["transmission"]],
                        "Driven Wheels": [recommInput["drivenwheels"]],
                        "Vehicle Size": [recommInput["size"]]
                        })

    # Pass user entered data to preparation funtion
    prep2(car2)         

    rescomp = compare(car2)     

    # Locate car details from clean dataframe
    idx = rescomp.index[0]

    clean = dfnice.iloc[idx]

    # Layout of the car name 
    Car_Name = clean["Year"].astype(str) + " " + clean["Make"] + " " + clean["Model"]

    # Call download_images from imageSearch
    Car_N = search_for_images(Car_Name)

    # Add image link column to the end of the dataframe
    clean["Car_Name"] = Car_N

    # Convert to JSON
    json = clean.to_json()

    return {'rec': json}



if __name__ == "__main_":
    app.run(debug=True)
