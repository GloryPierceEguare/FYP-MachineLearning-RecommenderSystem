import pathlib
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

c_names = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight', 'Acceleration', 'Model Year', 'Origin',
                'Name']

# Read in dataset
prep_df = pd.read_csv("./data/auto-mpg.csv", skiprows=1, header=None, names=c_names, na_values="?", comment='\t',
                 sep="\s*,\s*", engine="python", skipinitialspace=True)

# Get rid of 'Name' column
prep_df.drop(['Name'], axis='columns', inplace=True)

# Get rid of all the columns of missing values since there is only 6
prep_df = prep_df.dropna()

# Convert Origin to a one-hot column
origin = prep_df.pop('Origin')

prep_df['USA'] = (origin == 1) * 1.0
prep_df['Europe'] = (origin == 2) * 1.0
prep_df['Asia'] = (origin == 3) * 1.0

# Fix layout of year
prep_df['Model Year'] = prep_df['Model Year'] + 1900

# Change format of displacement from cu to litres
prep_df['Displacement'] = prep_df['Displacement'] / 61.0237441

# Create train and test df (drop train df from test based on index)
train_df = prep_df.sample(frac=0.8, random_state=0)
test_df = prep_df.drop(train_df.index)

# Describe train_info
train_info = train_df.describe()
train_info.pop("MPG")

train_info = train_info.transpose()

# Normalisation function
def norm(x):
    return (x - train_info['mean']) / train_info['std']

# Car preparation function
def prep(car):

    # Change fromat of weight from lbs to kg
    car['Weight'] = car['Weight'] / 0.45359237

    # Convert Origin to continuous data
    origin1 = car.pop('Origin')
   
    car['USA'] = (origin1 == 'USA') * 1.0
    car['Europe'] = (origin1 == 'Europe') * 1.0
    car['Asia'] = (origin1 == 'Asia') * 1.0

    car1 = norm(car)

    # Load tensorflow model
    reconstructed_model = keras.models.load_model("./data/tf_model.h5")

    # Make prediction
    prediction = reconstructed_model.predict(car1)
    return prediction