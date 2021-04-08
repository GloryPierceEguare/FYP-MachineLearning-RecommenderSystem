# FYP-MachineLearning-RecommenderSystem
Auto-Efficiency – Machine Learning for Predictive Analysis and Car Recommender System

The Project was built in an Anaconda Environment, so here are the steps to replicate it.

1. There is a yml file containing the Anaconda Environment called 'FYP_TensorFlow.yml'.

2. Import this environment into Anaconda Navigator to rebuild it.

3. Open Visual Studio Code from the Anaconda Navigator Environment

*** Must have node, and ionic installed on your machine ***
Run : npm install -g @ionic/cli 
to install ionic to your machine

To start the enviroment run in the integrated terminal:

conda activate FYP_TensorFlow

To deploy the application run the following 3 commands from two separate terminals:

ionic serve --lab

and

conda activate FYP_TensorFlow
          +
npm run start-flask-api

The first command deploys the front-end of the application and the second and third
will deploy the Flask API and back-end

