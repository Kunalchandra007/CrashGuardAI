"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { DelhiAccidentPoint } from "@/datas/delhiAccidentData";

type Props = {
  points?: DelhiAccidentPoint[];
};

const mapPin = new Icon({
  iconUrl: "/assets/MapPin.png",
  iconSize: [25, 35],
});

const fallbackPoint = {
  id: "delhi-center",
  area: "Delhi",
  accidents: 0,
  latitude: 28.6139,
  longitude: 77.209,
};

export default function CustomMap({ points = [] }: Props) {
  const markers = points.length > 0 ? points : [fallbackPoint];

  return (
    <div className="overflow-hidden h-[320px] rounded-md border-2">
      <MapContainer
        className="w-full h-full"
        center={[28.6139, 77.209]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((point) => (
          <Marker
            key={point.id}
            position={[point.latitude, point.longitude]}
            icon={mapPin}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">{point.area}</p>
                <p>Fatal accidents: {point.accidents}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
