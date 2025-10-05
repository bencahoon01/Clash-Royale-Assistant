// gui/src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [elixir, setElixir] = useState(0);
  const [opponentName, setOpponentName] = useState("Connecting...");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      console.log("Connected to AI engine!");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setOpponentName(data.opponent.name);
      setElixir(data.live_stats.opponent_elixir);
    };

    ws.onclose = () => {
      console.log("Disconnected from AI engine.");
      setOpponentName("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h1>Clash Royale AI Coach</h1>
      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontSize: '1.2rem' }}>Opponent: {opponentName}</p>
        <p style={{ fontSize: '4rem', color: '#D946EF', fontWeight: 'bold', margin: 0 }}>
          {elixir}
        </p>
        <p style={{ color: '#6c757d' }}>Opponent Elixir</p>
      </div>
    </div>
  );
}

export default App;