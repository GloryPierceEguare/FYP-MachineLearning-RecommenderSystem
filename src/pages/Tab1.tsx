import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonModal, IonItem, IonLabel } from '@ionic/react';
import './Tab1.css';
import { car, information, informationCircleOutline, water } from 'ionicons/icons';

const Tab1: React.FC = () => {

  const [showIntro3, setShowIntro3] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><h1>Auto-Efficiency</h1></IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Page Content */}
      <IonContent fullscreen>

        <div className="middle">
          {/* Logo */}
          <div className="photo">
            <br></br><br></br>
            <img src={ require("../data/favicon.png") } alt="logo_image"/>
          </div>
          <br></br><br></br>
      
          {/* Fuel Efficiency Prediction Button */}
          <IonButton color="warning" expand="block" size="large" href="/tab2">
            <IonIcon slot="start" size="default" icon={water} />
            Fuel Efficiency
          </IonButton>

          {/* Divider */}
          <div>
            <img src={ require("../data/pic.png") } alt="divider_image" className="left-image" height="15" width="30%"/>
            <img src={ require("../data/pic.png") } alt="divider_image" className="right-image" height="15" width="30%"/>
            <p className="ordiv">OR</p>
          </div>
          {/* C:\Users\Glory Pierce Eguare\FYP\public\assets\data */}
              
          {/* Car Recommender Button */}
          <IonButton color="success" expand="block" size="large" href="/tab3">
            <IonIcon slot="start" size="default" icon={car} />
            Car Recommender
          </IonButton>
        </div>

        {/* Introduction and Information Modal */}
        <IonModal isOpen={showIntro3} cssClass='my-info-modal'>
          <IonItem>
            <IonIcon icon={information} slot="start" />
            <IonLabel color="warning"><h2>How to use</h2></IonLabel>
          </IonItem>

          <div className="infobox">
            <h3>Welcome to Auto-Efficiency!</h3><br></br>
            An app that can predict the fuel efficiency of your car based on its specifications or recommend you a car based off your preferences.<br></br><br></br>
            <img src={ require("../data/white-div.png") } alt="divider_image" className="middle_divider" height="4" width="80%"/><br></br>
            Click the 'Fuel Efficiency' button and follow the instructions to generate a prediction.<br></br><br></br>
            <img src={ require("../data/white-div.png") } alt="divider_image" className="middle_divider" height="4" width="80%"/><br></br>
            Click the 'Car Recommender' button and follow the instructions to be recommended a car.
          </div>
          <IonButton onClick={() => setShowIntro3(false)}>Hide Info</IonButton>
        </IonModal>
    
      </IonContent>

      {/* Toolbar and Info Button */}
      <IonToolbar slot="bottom">
        <IonButton color="danger" className="toolbar-center" onClick={() => setShowIntro3(true)}>
          <IonIcon color="dark" size="large" slot="icon-only" icon={informationCircleOutline} />
        </IonButton>
      </IonToolbar>
    </IonPage>
  );
};

export default Tab1;
