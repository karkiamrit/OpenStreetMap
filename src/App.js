import './App.css';
import Lflt from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { Component } from 'react';
import markerImg from '../node_modules/leaflet/src/images/marker.svg';

var myIcon = Lflt.icon({
  iconUrl: markerImg,//iconUrl:'img/map-marker.png',//default: marker with a spinning indicator
  iconSize: [25, 41],//size of the marker
  iconAnchor: [12.5, 41],//top left corner of the marker
  popupAnchor: [0, -41],//bottom right corner of the '+' symbol
});



class App extends Component {
  state = {
    location: {
      lat: 27.6974,
      lng: 85.3318
    },
    isLoaded: false, // Track whether geolocation data is loaded,
    zoom: 3
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        isLoaded: true, // Geolocation data is loaded,
        zoom: 13
      });
    }, () => {
      console.log('uh oh...Location was denied')
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
          this.setState({
            location: {
              lat: location.latitude,
              lng: location.longitude
            },
            isLoaded:true,
            zoom:13
          })
        }

        );

    }

    );
  }

  render() {
    const { location, isLoaded } = this.state;
    const position = [location.lat, location.lng];
    if (!isLoaded) {
      return( <div></div>);
    }
    return (

      <MapContainer className='map' center={position} zoom={this.state.zoom} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIcon}>
          <Popup>
            A marker <br /> Your Location
          </Popup>
        </Marker>
      </MapContainer>


    );
  }
}

export default App;
