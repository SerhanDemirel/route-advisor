import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';

function RouteMap({ route }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="prose max-w-none">
        <h3 className="text-2xl font-semibold mb-4 text-blue-800">Rota Analizi</h3>
        <div className="bg-blue-50 rounded-lg p-4 whitespace-pre-wrap">
          {route.split('\n').map((line, index) => {
            if (line.match(/^\d\./)) {
              return <h4 key={index} className="font-bold mt-4 mb-2 text-blue-700">{line}</h4>;
            }
            return <p key={index} className="text-gray-700 mb-2">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default RouteMap; 