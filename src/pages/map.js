import 'bootstrap-icons/font/bootstrap-icons.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
import React, { useState } from 'react';

// create custom icon
const customIcon = new Icon({
  iconUrl: require("./téléchargé.png"),
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// markers
const markers = [
  {
    geocode: [36.8157032,10.0426300],
    popUp: "EyaFashion"
  },
  
];

function Footer() {
  
  return (
    
    <footer className="fff">
      <div className="contact-info">
        <h6 className="Contact">CONTACT</h6>
        <h2 className="cont">Contact US</h2>
        <div className="contact-info-item">
          <i id="loc" className="bi bi-geo-alt"></i>
          <span><p className="lo">MY Brand</p></span>
        </div>
        <div className="contact-info-item">
          <i id="mess" className="bi bi-envelope"></i>
          <span><p className="M">myBrand@contact.tn</p></span>
        </div>
        <div className="contact-info-item">
          <i id="te" className="bi bi-telephone"></i>
          <span><p>Tél: +216 00000000</p></span>
        </div>
        <div className="contact-info-item">
          <i id="te" className="bi bi-like"></i>
          <a className="t" href="#"><i className="fab fa-linkedin"></i></a>
          <a className="t" href="#"><i className="fab fa-facebook"></i></a>
          <a className="t" href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
     
      <div className="contact-form">
        <label htmlFor="nom">Prénom</label>
        <div className="name-fields">
          <input type="text" id="nom" required />
          <div className="name-">
            <label htmlFor="nom">Nom de famille</label>
            <input type="text" id="prenom" required />
          </div>
        </div>
        <label htmlFor="email">E-mail *</label>
        <input type="email" id="email" required />
        <label htmlFor="message">Laissez-nous un message…</label>
        <textarea id="message" required></textarea>
        <button type="submit">Envoyer</button>
      </div>
      
    </footer>
  );
}


function Map() {
  
  return (
    <div>
      
      <Footer /> {/* Render the Footer component */}
     
		  <MapContainer center={[36.8157032,10.0426385]} zoom={13} className='leaflet-container'>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* WATERCOLOR CUSTOM TILES */}
     

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}

        {/* Hard coded markers */}
        
      </MarkerClusterGroup>
    </MapContainer>
    <footer class="ff">
      <p>&copy; 2023 My Brand</p>
    </footer>
    </div>
  );
}

export default Map;
