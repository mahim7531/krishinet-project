import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [readings, setReadings] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [posts, setPosts] = useState([]);
  
  const [author, setAuthor] = useState('');
  const [plantName, setPlantName] = useState('');
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const sensorRes = await axios.get('http://localhost:5000/api/sensors/latest');
      setReadings(sensorRes.data);

      const leaderRes = await axios.get('http://localhost:5000/api/leaderboard');
      setLeaderboard(leaderRes.data);

      const postRes = await axios.get('http://localhost:5000/api/community/posts');
      setPosts(postRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!author || !plantName || !message) return;
    try {
      await axios.post('http://localhost:5000/api/community/posts', { author, plantName, message });
      setAuthor('');
      setPlantName('');
      setMessage('');
      fetchData();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const latest = readings[0] || {};

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-10 font-sans">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">🌱 KrishiNet - Smart Community Farming Hub</h1>

      {latest.soilMoisture < 30 && (
        <div className="bg-red-600/20 border border-red-500 text-red-200 p-4 rounded-xl mb-8 animate-pulse">
          ⚠️ <strong>SOS Alert:</strong> {latest.deviceId} এর মাটি শুকিয়ে গেছে ({latest.soilMoisture}%)! দ্রুত পানি দিন।
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-sm">Soil Moisture</p>
              <h2 className="text-3xl font-bold text-blue-400 mt-1">{latest.soilMoisture ?? '--'}%</h2>
              <span className="text-xs text-slate-400 mt-1 block">Status: {latest.status}</span>
            </div>
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-sm">Temperature</p>
              <h2 className="text-3xl font-bold text-orange-400 mt-1">{latest.temperature ?? '--'}°C</h2>
            </div>
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
              <p className="text-slate-400 text-sm">Air Humidity</p>
              <h2 className="text-3xl font-bold text-teal-400 mt-1">{latest.humidity ?? '--'}%</h2>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-emerald-300">💬 Community Plant Feed</h3>
            <form onSubmit={handlePostSubmit} className="mb-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="আপনার নাম" value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
                <input type="text" placeholder="গাছের নাম" value={plantName} onChange={(e) => setPlantName(e.target.value)} className="bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <textarea placeholder="গাছের অবস্থা শেয়ার করুন..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500" rows="2"></textarea>
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-sm font-medium transition">পোস্ট করুন</button>
            </form>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {posts.map(post => (
                <div key={post._id} className="bg-slate-900 p-4 rounded-lg border border-slate-700/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-emerald-400 text-sm">{post.author} <span className="text-xs text-slate-400 font-normal">({post.plantName})</span></span>
                    <span className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{post.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-emerald-300">🏆 Green Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((item, index) => (
              <div key={item.deviceId} className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">#{index + 1} {item.deviceId}</p>
                  <span className="text-xs text-slate-400">Moisture: {item.soilMoisture}%</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-sm">{item.score} pts</span>
                  <span className="block text-[10px] text-slate-400">{item.health}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;