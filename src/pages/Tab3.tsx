import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { car, chevronBack, information, informationCircleOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {

  
  const [showIntro2, setShowIntro2] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [year, setYear] = useState<number>();
  const [transmission, settransmission] = useState<string>();
  const [doors, setDoors] = useState<number>();
  const [drivenwheels, setdrivenwheels] = useState<string>();
  const [size, setSize] = useState<string>();
  const [mpg, setMPG] = useState<number>();

  const [placeMake, setplaceMake] = useState('');
  const [placeModel, setplaceModel] = useState('');
  const [placeYear, setplaceYear] = useState('');
  const [placeTransmission, setplaceTransmission] = useState('');
  const [placeWheels, setplaceWheels] = useState('');
  const [placeDoors, setplaceDoors] = useState('');
  const [placeVSize, setplaceVSize] = useState('');
  const [placeMPG, setplaceMPG] = useState('');
  const [placeLink, setplaceLink] = useState('');

  var car_n = ""+placeLink+""


  function submitForm() {

    // POST
    fetch('/getRecomm', {

      // Declare what type of data we're sending
      headers: {
        'Content-Type': 'application/json'
      },

      // Specify the method
      method: 'POST',

      // A JSON payload
      body: JSON.stringify({
        // Form data goes here
        year,
        transmission,
        doors,
        drivenwheels,
        size,
        mpg
      })
    }).then(function (response) { // Return response
      return response.text();
  }).then(function (text) {
  
      // console.log('POST response: ');

      // Convert JSON toy TyeScript variable
      var parsedData = JSON.parse(text);
      console.log(parsedData);
      var x = parsedData.rec;
      console.log(x.Make);

      var parsedData2 = JSON.parse(x);

      // Assigne values
      setplaceMake(parsedData2.Make);
      setplaceModel(parsedData2.Model);
      setplaceYear(parsedData2.Year);
      setplaceTransmission(parsedData2['Transmission Type']);
      setplaceWheels(parsedData2['Driven Wheels']);
      setplaceDoors(parsedData2['Number of Doors']);
      setplaceVSize(parsedData2['Vehicle Style']);
      setplaceMPG(parsedData2.MPG);
      setplaceLink(parsedData2.Car_Name);

      // Show modal
      setShowModal(true);

  });

  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Back Button */}
          <IonButton color="danger" slot="start" className="back-button" href="/">
            <IonIcon icon={chevronBack} /> 
          </IonButton>
          {/* Page Header */}
          <IonTitle>Car Recommender</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Page Content */}
      <IonContent fullscreen>
        <IonCard className="tab3-card">
          <IonCardHeader>
            <IonCardTitle><h2>Choose Specifications ...</h2></IonCardTitle>
          </IonCardHeader>

          {/* Form for user to enter data */}
          <form>
            <IonList lines="full">

              {/* Enter Year */}
              <IonItem lines="full">
                <IonLabel position="floating">Year (yyyy)</IonLabel>
                <IonInput type="number" value={year} required onIonChange={e => setYear(parseInt(e.detail.value!, 10))}></IonInput>
              </IonItem>

              {/* Enter Transmission Type */}
              <IonItem lines="full">
                <IonLabel position="floating">Transmission Type</IonLabel>
                  <IonSelect interface="popover" value={transmission}  onIonChange={e => settransmission(e.detail.value!)}>
                    <IonSelectOption value="AUTOMATED MANUAL">AUTOMATED MANUAL</IonSelectOption>
                    <IonSelectOption value="AUTOMATIC">AUTOMATIC</IonSelectOption>
                    <IonSelectOption value="DIRECT DRIVE">DIRECT DRIVE</IonSelectOption>
                    <IonSelectOption value="MANUAL">MANUAL</IonSelectOption>
                  </IonSelect>
              </IonItem>

              {/* Enter Number of Doors */}
              <IonItem lines="full">
                <IonLabel position="floating">Number of Doors</IonLabel>
                  <IonSelect interface="popover" value={doors}  onIonChange={e => setDoors(e.detail.value!)}>
                    <IonSelectOption value="3">3</IonSelectOption>
                    <IonSelectOption value="4">4</IonSelectOption>
                    <IonSelectOption value="5">5</IonSelectOption>
                  </IonSelect>
              </IonItem>

              {/* Enter Driven Wheels */}
              <IonItem lines="full">
                <IonLabel position="floating">Driven Wheels</IonLabel>
                  <IonSelect interface="popover" value={drivenwheels}  onIonChange={e => setdrivenwheels(e.detail.value!)}>
                    <IonSelectOption value="all wheel drive">All Wheel Drive</IonSelectOption>
                    <IonSelectOption value="four wheel drive">Four Wheel Drive</IonSelectOption>
                    <IonSelectOption value="front wheel drive">Front Wheel Drive</IonSelectOption>
                    <IonSelectOption value="rear wheel drive">Rear Wheel Drive</IonSelectOption>
                  </IonSelect>
              </IonItem>

              {/* Enter Vehicle Size */}
              <IonItem lines="full">
                <IonLabel position="floating">Vehicle Size</IonLabel>
                  <IonSelect interface="popover" value={size} onIonChange={e => setSize(e.detail.value!)}>
                    <IonSelectOption value="Compact">Compact</IonSelectOption>
                    <IonSelectOption value="Large">Large</IonSelectOption>
                    <IonSelectOption value="Midsize">Midsize</IonSelectOption>
                  </IonSelect>
              </IonItem>

              {/* Enter MPG */}
              <IonItem lines="full">
                <IonLabel position="floating">Fuel Efficiency (mpg)</IonLabel>
                <IonInput type="number" value={mpg} required onIonChange={e => setMPG(parseInt(e.detail.value!, 10))}></IonInput>
              </IonItem>

              {/* Submit Button */}
              <IonItem>
                <IonButton className="recomm-but" color="success" size="default" onClick={() => submitForm()}>Recommend</IonButton>
              </IonItem>

            </IonList>
          </form>
        </IonCard>

        {/* Display Results Modal */}
        <IonModal isOpen={showModal} cssClass='my-custom-class'>

          <IonItem>
            <IonIcon icon={car} slot="start" />
            <IonLabel><h3>Recommended Car</h3></IonLabel>
          </IonItem>

          <div className="outputbox">
            <IonText color="warning">Make: </IonText>{placeMake}<br></br>
            <IonText color="warning">Model: </IonText>{placeModel}<br></br>
            <IonText color="warning">Year: </IonText>{placeYear}<br></br>
            <IonText color="warning">Transmission Type: </IonText>{placeTransmission}<br></br>
            <IonText color="warning">Driven Wheels: </IonText>{placeWheels}<br></br>
            <IonText color="warning">Number of Doors: </IonText>{placeDoors}<br></br>
            <IonText color="warning">Vehicle Style: </IonText>{placeVSize}<br></br>
            <IonText color="warning">MPG: </IonText>{placeMPG} mpg<br></br><br></br>
            <img className="car-pic" src={""+car_n+""} alt="car_image" />
            </div>
          <IonButton onClick={() => setShowModal(false)}>Close Car Info</IonButton>
        </IonModal>

        {/* Introduction and Information Modal */}
        <IonModal isOpen={showIntro2} cssClass='my-info-modal'>
          <IonItem>
            <IonIcon icon={information} slot="start" />
            <IonLabel color="warning"><h2>How to use</h2></IonLabel>
          </IonItem>

          <div className="infobox">
            Fill out the form with the specification you would like in a car
            and you will be recommanded a car that best fits your requirements.<br></br><br></br>
            <h2><IonText color="danger">Note!<br></br></IonText></h2>
            ~ Driven Wheels are the wheels of the car that are powered by the engine i.e. 2WD, 4WD.<br></br><br></br>
            ~ Fuel Efficiency value is based on the combinded MPG (Highway MPG and City MPG) of the car.

          </div>
          <IonButton onClick={() => setShowIntro2(false)}>Hide Info</IonButton>
        </IonModal>
     
      </IonContent>

      {/* Toolbar and Info Button */}
      <IonToolbar slot="bottom">
        <IonButton color="danger" className="toolbar-center" onClick={() => setShowIntro2(true)}>
          <IonIcon color="dark" size="large" slot="icon-only" icon={informationCircleOutline} />
        </IonButton>
      </IonToolbar>
    </IonPage>
  );
};

export default Tab3;
