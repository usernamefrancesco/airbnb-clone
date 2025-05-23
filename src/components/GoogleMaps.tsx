"use client";
import React, { useEffect, useState } from "react";
import {
  InfoWindow,
  Map,
  APIProvider,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import countries from "world-countries";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface LatLon {
  lat: number;
  lng: number;
}

const GoogleMapComponent = ({ citta }: { citta: string | undefined }) => {
  const [lanlon, setLanLong] = useState<LatLon>();
  if (!citta) return;


  function findCountry() {
    const cittaTrovata = countries.find((x) => x.name.common === citta);
    if (!cittaTrovata) return;
    setLanLong({
      lat: cittaTrovata.latlng[0],
      lng: cittaTrovata.latlng[1],
    });
  }
useEffect(()=> findCountry(), [citta])


  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-[400px] rounded-2xl overflow-hidden">
        <Map zoom={6} center={lanlon} mapId={"554ce37a93c49794cfc8974c"}>
          <AdvancedMarker position={lanlon} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMapComponent;
