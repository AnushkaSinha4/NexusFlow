import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from './services/api';

function Home() {
  const [status, setStatus] = useState('checking...');

  useEffect(() => {
    api
      .get('/health')
      .then((res) => setStatus(res.data.message))
      .catch(() => setStatus('Backend not reachable'));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold text-cyan-400">NexusFlow</h1>
      <p className="mt-2 text-slate-300">Visual IoT Telemetry &amp; Rule Engine</p>
      <p className="mt-6 rounded bg-slate-800 px-4 py-2 text-sm">
        API status: <span className="font-semibold text-emerald-400">{status}</span>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}