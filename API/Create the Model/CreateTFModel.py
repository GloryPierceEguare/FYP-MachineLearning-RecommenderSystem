from __future__ import absolute_import, division, print_function

import pandas as pd
import keras as tf
from tensorflow import keras
import tensorflow as tf
import seaborn as sns
from tensorflow.keras import layers
import matplotlib.pyplot as plt

# Column names
c_names = ['MPG', 'Cylinders', 'Displacement', 'Horsepower', 'Weight', 'Acceleration', 'Model Year', 'Origin',
           'Name']

# Read in dataset
df = pd.read_csv("auto-mpg.csv", skiprows=1, header=None, names=c_names, na_values="?", comment='\t',
                 sep="\s*,\s*", engine="python", skipinitialspace=True)

# Get rid of 'Name' column
df.drop(['Name'], axis='columns', inplace=True)

# Get rid of all the columns of missing values since there is only 6
df = df.dropna()

# Fix the year format
df['Model Year'] = df['Model Year'] + 1900

# Pairplot diagram
sns.pairplot(df, diag_kind="kde")
plt.show()

# Convert Origin to a one-hot column
origin = df.pop('Origin')
df['USA'] = (origin == 1) * 1.0
df['Europe'] = (origin == 2) * 1.0
df['Asia'] = (origin == 3) * 1.0
print(df)

# Create train and test split
train_df = df.sample(frac=0.8, random_state=0)
test_df = df.drop(train_df.index)

# Describe training data
train_info = train_df.describe()
train_info.pop("MPG")
train_info = train_info.transpose()
print(train_info)

# Separate target value from dfs
train_heads = train_df.pop('MPG')
test_heads = test_df.pop('MPG')


# Normalisation function
def norm(x):
    return (x - train_info['mean']) / train_info['std']


# Normalise training and testing data
norm_train_data = norm(train_df)
norm_test_data = norm(test_df)

# print(norm_train_data)


# Build the TensorFlow model
def build_model():
    # 3 layer model
    model = keras.Sequential([
        layers.Dense(64, activation=tf.nn.relu, input_shape=[len(train_df.keys())]),
        layers.Dense(64, activation=tf.nn.relu),
        layers.Dense(1)])

    # Define optimizer
    optimizer = tf.keras.optimizers.RMSprop(0.001)

    model.compile(loss='mse',
                  optimizer=optimizer,
                  metrics=['mae', 'mse'])
    return model


# Call function to build model
# model = build_model()

# Print the summary of the model
# print(model.summary())

# Train the model with 1000 epochs
EPOCHS = 1000

# training_day = model.fit(
#     norm_train_data, train_heads,
#     epochs=EPOCHS, validation_split = 0.2, verbose=0,
# )
# print('Done training!')

# Retrain the model but with an early stop so it doesn't loose accuracy
model = build_model()

early_stop = keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)

training_day = model.fit(
    norm_train_data,
    train_heads, epochs=EPOCHS,
    validation_split=0.2, verbose=0,
    callbacks=[early_stop]
)
print('Done training!')

# Test how model is doing overall
loss, mae, mse = model.evaluate(norm_test_data, test_heads, verbose=0)
print("Mean Absolute Error for Model: {:5.2f} MPG".format(mae))

# Visualise the predictions compared to the actual mpg
test_predictions = model.predict(norm_test_data).flatten()
plt.scatter(test_heads, test_predictions)
plt.xlabel('Real Values of MPG')
plt.ylabel('Prediction Values of MPG')
plt.axis('equal')
plt.axis('square')
plt.xlim([0,plt.xlim()[1]])
plt.ylim([0,plt.ylim()[1]])
_= plt.plot([-100, 100], [-100, 100])
plt.show()

# Save the model to a HDF5 file
model.save('tf_model.h5')

# def prep(car):
#     print(car)
#
#     # Convert Origin to continuous data
#     origin1 = car.pop('Origin')
#     car['USA'] = (origin1 == 1) * 1.0
#     car['Europe'] = (origin1 == 2) * 1.0
#     car['Asia'] = (origin1 == 3) * 1.0
#
#     car1 = norm(car)
#
#     # Load tensorflow model
#     reconstructed_model = keras.models.load_model("tf_model.h5")
#
#     prediction = reconstructed_model.predict(car1)
#     print(prediction)
#
#
# if __name__ == "__main__":
#     cylinders = 8
#     displacement = 307.0
#     horsepower = 130.0
#     weight = 3504
#     acceleration = 12.0
#     model_year = 70
#     origin = 1
#
#     car = pd.DataFrame({"Cylinders": [cylinders],
#                         "Displacement": [displacement],
#                         "Horsepower": [horsepower],
#                         "Weight": [weight],
#                         "Acceleration": [acceleration],
#                         "Model Year": [model_year],
#                         "Origin": [origin]})
#
#     prep(car)
