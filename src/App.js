import { useState } from 'react';
import SearchForm from './components/SearchForm';
import RouteMap from './components/RouteMap';
import RouteDetails from './components/RouteDetails';
import { CONFIG } from './config';

function App() {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRouteSearch = async (origin, destination) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "Route Advisor"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1:free",
          "messages": [
            {
              "role": "system",
              "content": "Sen bir rota analiz uzmanısın. Kullanıcıya verdiğin yanıtları aşağıdaki formatta ver ve düşünme sürecini yanıta dahil etme:\n\n1. Mesafe ve Süre:\n[Bilgiler]\n\n2. Olası Trafik Noktaları:\n[Maddeler halinde]\n\n3. Alternatif Rotalar:\n[Maddeler halinde]\n\n4. Dikkat Edilecek Noktalar:\n[Maddeler halinde]\n\n5. Yoğun Saatler:\n[Detaylı bilgi]"
            },
            {
              "role": "user",
              "content": `${origin} konumundan ${destination} konumuna giderken detaylı rota analizi yapar mısın?`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setRoute(data.choices[0].message.content);
      } else {
        throw new Error('API yanıtı geçersiz format');
      }
    } catch (error) {
      console.error('Rota hesaplanırken hata oluştu:', error);
      setError('Rota hesaplanırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Akıllı Rota Planlayıcı
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SearchForm onSearch={handleRouteSearch} />
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            {error}
          </div>
        )}

        {route && !loading && (
          <div className="grid grid-cols-1 gap-6">
            <RouteMap route={route} />
            <RouteDetails route={route} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 