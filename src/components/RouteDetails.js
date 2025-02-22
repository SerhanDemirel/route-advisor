function RouteDetails({ route }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Alternatif Rotalar ve Öneriler</h2>
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="whitespace-pre-line text-gray-700">{route}</p>
      </div>
    </div>
  );
}

export default RouteDetails; 