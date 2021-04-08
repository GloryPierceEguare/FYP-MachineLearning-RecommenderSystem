import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonList, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonModal, IonIcon, IonText } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { chevronBack, information, informationCircleOutline, water } from 'ionicons/icons';
const Tab2: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [cylinders, setNumber1] = useState<number>();
  const [displacement, setNumber2] = useState<number>();
  const [horsepower, setNumber3] = useState<number>();
  const [weight, setNumber4] = useState<number>();
  const [acceleration, setNumber5] = useState<number>();
  const [model_year, setNumber6] = useState<number>();
  const [origin, setText1] = useState<string>();


  const [placeholder, setPlaceholder] = useState('');
  const [placeholder2, setPlaceholder2] = useState('');
  
  const [placevol_l, setPlacevol_l] = useState('');
  const [placevol_g, setPlacevol_g] = useState('');
  const [placediesel, setPlacediesel] = useState('');
  const [placepetrol, setPlacepetrol] = useState('');
  
  function submitNumber() {

    // POST
    fetch('/getform', {

      // Declare what type of data we're sending
      headers: {
        'Content-Type': 'application/json'
      },

      // Specify the method
      method: 'POST',

      // A JSON payload
      body: JSON.stringify({
        cylinders,
        displacement,
        horsepower,
        weight,
        acceleration,
        model_year,
        origin
      })
    }).then(function (response) { // Return response
      return response.text();
  }).then(function (text) {
  
      // Convert the data out of JSON
      var parsedData = JSON.parse(text);

      // Display result and open the result modal
      setPlaceholder(parsedData.sum);
      setPlaceholder2(parsedData.sum2);

      setPlacevol_l(parsedData.vol_l);
      setPlacevol_g(parsedData.vol_g);
      setPlacediesel(parsedData.price_d);
      setPlacepetrol(parsedData.price_p);

      setShowModal(true)
  });

  }

  return (
    <IonPage>
      <IonHeader>
        {/* Toolbar */}
        <IonToolbar>
          {/* Back Button */}
          <IonButton color="danger" slot="start" className="back-button" href="/">
            <IonIcon icon={chevronBack} /> 
          </IonButton>
          {/* Page Header */}
          <IonTitle><h4>Calculate Fuel Efficiency</h4></IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Page Content */}
      <IonContent fullscreen>
        <IonCard className="tab2-card">
          <IonCardHeader>
            <IonCardTitle><h2>Enter Car Details ...</h2></IonCardTitle>
          </IonCardHeader>

          {/* User form */}
          <form>
            <IonList lines="full">

              {/* Enter Engine Cylinders */}
              <IonItem lines="full">
                <IonLabel position="floating">Number of Engine Cylinders</IonLabel>
                <IonInput type="number"  value={cylinders} min="0" onIonChange={e => setNumber1(parseInt(e.detail.value!, 10))}></IonInput>
              </IonItem>

              {/* Enter Engine Displacement */}
              <IonItem lines="full">
                <IonLabel position="floating">Engine Size (litres)</IonLabel>
                <IonInput type="number" step="0.1" value={displacement} min="0" onIonChange={e => setNumber2(parseFloat(e.detail.value!))}></IonInput>
              </IonItem>

              {/* Enter Horsepower */}
              <IonItem lines="full">
                <IonLabel position="floating">Horsepower (HP)</IonLabel>
                <IonInput type="number" step="0.1" value={horsepower} min="0" onIonChange={e => setNumber3(parseFloat(e.detail.value!))}></IonInput>
              </IonItem>

              {/* Enter Car Weight */}
              <IonItem lines="full">
                <IonLabel position="floating">Weight (kg)</IonLabel>
                <IonInput type="number" step="0.1" value={weight} min="0" onIonChange={e => setNumber4(parseFloat(e.detail.value!))}></IonInput>
              </IonItem>

              {/* Enter Acceleration */}
              <IonItem lines="full">
              {/* Acceleration (m/s sq.) */}
                <IonLabel position="floating">Acceleration (0-60 secs)</IonLabel>
                <IonInput type="number" step="0.1" value={acceleration} min="0" onIonChange={e => setNumber5(parseFloat(e.detail.value!))}></IonInput>
              </IonItem>

              {/* Enter Model Year */}
              <IonItem lines="full">
                <IonLabel position="floating">Model Year (yyyy)</IonLabel>
                <IonInput type="number" value={model_year} min="0" max="2020" onIonChange={e => setNumber6(parseInt(e.detail.value!, 10))}></IonInput>
              </IonItem>

              {/* Enter Car Origin */}
              <IonItem lines="full">
                <IonLabel position="floating">Origin</IonLabel>
                <IonSelect interface="popover" value={origin}  onIonChange={e => setText1(e.detail.value!)}>
                  <IonSelectOption value="USA">USA</IonSelectOption>
                  <IonSelectOption value="Europe">Europe</IonSelectOption>
                  <IonSelectOption value="Asia">Asia</IonSelectOption>
                </IonSelect>
              </IonItem>

              {/* Submit Button */}
              <IonItem>
                <IonButton color="warning" size="default" onClick={() => submitNumber()}>Predict Fuel Efficiency</IonButton>
              </IonItem>
            
            </IonList>
          </form>
        </IonCard>

        {/* Dislay Results Modal */}
        <IonModal isOpen={showModal} cssClass='my-tab1-modal'>
          <IonItem>
            <IonIcon icon={water} slot="start" />
            <IonLabel><h3>Predicted Fuel Efficiency</h3></IonLabel>
          </IonItem>

          {/* Predicted Results */}
          <div className="outputbox">
            <div className="outputbox2">
              Combined Fuel Economy:
            </div>
            {placeholder}<IonText color="warning"> MPG</IonText><br></br>
            {placeholder2}<IonText color="warning"> km/L</IonText><br></br>
          </div>
          <img src={ require("../data/white-div.png") } alt="divider_image" className="middle_divider" height="4" width="80%"/>

          {/* Further Analysis */}
          <div className="outputbox1">
            Average Yearly Driving Distance Ireland: <br></br> 
            <IonText color="danger">17,000 km </IonText>or <IonText className="red-text">10,563 miles</IonText><br></br><br></br>
            Yearly Fuel Volume Required:<br></br> 
            {placevol_l} <IonText color="secondary">Litres</IonText><br></br> 
            {placevol_g} <IonText className="blue-text">Gallons</IonText><br></br><br></br>
            Fuel Cost Per Year:<br></br> 
            €{placediesel} <IonText color="success">- Diesel</IonText><br></br>
            €{placepetrol} <IonText className="green-text">- Petrol</IonText>
          </div>
          <IonButton onClick={() => setShowModal(false)}>Hide Prediction</IonButton>
        </IonModal>


        {/* Introduction and Information Modal */}
        <IonModal isOpen={showIntro} cssClass='my-info-modal'>
          <IonItem>
            <IonIcon icon={information} slot="start" />
            <IonLabel color="warning"><h2>How to use</h2></IonLabel>
          </IonItem>

          <div className="infobox">
            Fill out the form with your car specifications to get a predicted
            fuel efficiency value based off these specifications.<br></br><br></br>
            <h2><IonText color="danger">Note!<br></br></IonText></h2>
            ~ Engine Size can also be refered to as the engine displacement i.e. 1.5L Engine.<br></br><br></br>
            ~ Acceleration is the time it takes for the car to accelerate 60mph or 100kmh and this 
            value can be entered in seconds.<br></br><br></br>
            ~ Origin is the geographical area that the car brand originates from.

          </div>
          <IonButton onClick={() => setShowIntro(false)}>Hide Info</IonButton>
        </IonModal>

      </IonContent>

      {/* Toolbar and Info Button */}
      <IonToolbar slot="bottom">
        <IonButton color="danger" className="toolbar-center" onClick={() => setShowIntro(true)}>
          <IonIcon color="dark" size="large" slot="icon-only" icon={informationCircleOutline} />
        </IonButton>
      </IonToolbar>
    </IonPage>
  );
};

export default Tab2;
