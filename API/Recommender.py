from __future__ import absolute_import, division, print_function
import numpy as np
import pandas as pd
import io
import scipy
from scipy import spatial

# Column names
column_names2 = ['Make', 'Model', 'Year', 'Engine Fuel Type', 'Engine HP', 'Engine Cylinders', 'Transmission Type',
                 'Driven Wheels', 'Number of Doors',
                 'Market Category', 'Vehicle Size', 'Vehicle Style', 'Highway MPG', 'City MPG', 'Popularity', 'MSRP']

# Read in dataset
df2 = pd.read_csv("./data/data2.csv", skiprows=1, header=None, names=column_names2, engine="python", skipinitialspace=True)

# Make copy of df2 and clean it up for display
dfnice = df2.copy()

# Drop columns
dfnice.drop(['Engine Fuel Type'], axis='columns', inplace=True)
dfnice.drop(['Engine HP'], axis='columns', inplace=True)
dfnice.drop(['Engine Cylinders'], axis='columns', inplace=True)
dfnice.drop(['Market Category'], axis='columns', inplace=True)
dfnice.drop(['Popularity'], axis='columns', inplace=True)
dfnice.drop(['MSRP'], axis='columns', inplace=True)

dfnice["Number of Doors"].fillna(5, inplace=True)

# Calculate the combined MPG
dfnice['MPG'] = (2 * dfnice['Highway MPG'] * dfnice['City MPG']) / (dfnice['Highway MPG'] + dfnice['City MPG'])
dfnice['MPG'] = dfnice['MPG'].round(decimals=2)
dfnice.pop('Highway MPG')
dfnice.pop('City MPG')

# Fix missing values
dfnice['Transmission Type'] = dfnice['Transmission Type'].str.replace('UNKNOWN', 'MANUAL')

# Fix door numbers
dfnice["Number of Doors"] = dfnice['Number of Doors'].replace(4, 5)
dfnice["Number of Doors"] = dfnice['Number of Doors'].replace(3, 4)
dfnice["Number of Doors"] = dfnice['Number of Doors'].replace(2, 3)

# Fix value names
dfnice["Driven Wheels"] = dfnice['Driven Wheels'].replace('all wheel drive', 'All-Wheel Drive')
dfnice["Driven Wheels"] = dfnice['Driven Wheels'].replace('four wheel drive', 'Four-Wheel Drive')
dfnice["Driven Wheels"] = dfnice['Driven Wheels'].replace('front wheel drive', 'Front-Wheel Drive')
dfnice["Driven Wheels"] = dfnice['Driven Wheels'].replace('rear wheel drive', 'Rear-Wheel Drive')

dfnice["Transmission Type"] = dfnice['Transmission Type'].replace('AUTOMATED_MANUAL', 'AUTOMATED-MANUAL')
dfnice["Transmission Type"] = dfnice['Transmission Type'].replace('DIRECT_DRIVE', 'DIRECT-DRIVE')

dfnice["Vehicle Style"] = dfnice['Vehicle Style'].replace('2dr Hatchback', '3-Door Hatchback')
dfnice["Vehicle Style"] = dfnice['Vehicle Style'].replace('2dr SUV', '3-Door SUV')
dfnice["Vehicle Style"] = dfnice['Vehicle Style'].replace('4dr Hatchback', '5-Door Hatchback')
dfnice["Vehicle Style"] = dfnice['Vehicle Style'].replace('4dr SUV', '5-Door SUV')

# Drop unnecessary columns from df2
df2.drop(['Engine Fuel Type'], axis='columns', inplace=True)
df2.drop(['Engine HP'], axis='columns', inplace=True)
df2.drop(['Engine Cylinders'], axis='columns', inplace=True)
df2.drop(['Market Category'], axis='columns', inplace=True)
df2.drop(['Popularity'], axis='columns', inplace=True)
df2.drop(['MSRP'], axis='columns', inplace=True)
df2.drop(['Vehicle Style'], axis='columns', inplace=True)

df2.drop(['Make'], axis='columns', inplace=True)
df2.drop(['Model'], axis='columns', inplace=True)

# Fill in missing values with correct values
df2["Number of Doors"].fillna(5, inplace=True)
df2['Transmission Type'] = df2['Transmission Type'].str.replace('UNKNOWN','MANUAL')

# Calculate the combined MPG
df2['MPG'] = (2 * df2['Highway MPG'] * df2['City MPG']) / (df2['Highway MPG'] + df2['City MPG'])
df2.pop('Highway MPG')
df2.pop('City MPG')

# Convert Transmission Type to continuous data
transmission_type = df2.pop('Transmission Type')
df2['AUTOMATED MANUAL'] = (transmission_type == 'AUTOMATED_MANUAL') * 1.0
df2['AUTOMATIC'] = (transmission_type == 'AUTOMATIC') * 1.0
df2['DIRECT DRIVE'] = (transmission_type == 'DIRECT_DRIVE') * 1.0
df2['MANUAL'] = (transmission_type == 'MANUAL') * 1.0

# Convert Driven Wheels to continuous data
driven_wheels = df2.pop('Driven Wheels')
df2['All Wheel Drive'] = (driven_wheels == 'all wheel drive') * 1.0
df2['Four Wheel Drive'] = (driven_wheels == 'four wheel drive') * 1.0
df2['Front Wheel Drive'] = (driven_wheels == 'front wheel drive') * 1.0
df2['Rear Wheel Drive'] = (driven_wheels == 'rear wheel drive') * 1.0

# Convert Vehicle Size to continuous data
vehicle_size = df2.pop('Vehicle Size')
df2['Compact'] = (vehicle_size == 'Compact') * 1.0
df2['Large'] = (vehicle_size == 'Large') * 1.0
df2['Midsize'] = (vehicle_size == 'Midsize') * 1.0

# Fix door numbers
df2["Number of Doors"] = df2['Number of Doors'].replace(4, 5)
df2["Number of Doors"] = df2['Number of Doors'].replace(3, 4)
df2["Number of Doors"] = df2['Number of Doors'].replace(2, 3)

# Drop duplicate values from df2
df2 = df2.drop_duplicates()

def prep2(car2):
    # Convert Transmission Type to continuous data
    transmission2 = car2.pop('Transmission Type')
    car2['AUTOMATED MANUAL'] = (transmission2 == 'AUTOMATED MANUAL') * 1.0
    car2['AUTOMATIC'] = (transmission2 == 'AUTOMATIC') * 1.0
    car2['DIRECT DRIVE'] = (transmission2 == 'DIRECT DRIVE') * 1.0
    car2['MANUAL'] = (transmission2 == 'MANUAL') * 1.0

    # Convert Driven Wheels to continuous data
    drivenwheels2 = car2.pop('Driven Wheels')
    car2['All Wheel Drive'] = (drivenwheels2 == 'all wheel drive') * 1.0
    car2['Four Wheel Drive'] = (drivenwheels2 == 'four wheel drive') * 1.0
    car2['Front Wheel Drive'] = (drivenwheels2 == 'front wheel drive') * 1.0
    car2['Rear Wheel Drive'] = (drivenwheels2 == 'rear wheel drive') * 1.0

    # Convert Vehicle Size to continuous data
    size2 = car2.pop('Vehicle Size')
    car2['Compact'] = (size2 == 'Compact') * 1.0
    car2['Large'] = (size2 == 'Large') * 1.0
    car2['Midsize'] = (size2 == 'Midsize') * 1.0

    return car2


def compare(car2):
    ary = scipy.spatial.distance.cdist(df2, car2, metric='euclidean')
    ans = df2[ary == ary.min()]

    return ans
