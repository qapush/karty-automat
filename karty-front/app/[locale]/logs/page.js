import { useEffect, useState } from "react";

const LogsPage = () => {
  const [logs, setLogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/pm2-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs);
      } else {
        setError("Failed to load logs.");
      }
    } catch (err) {
      setError("Error fetching logs.");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) return <div>Loading logs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Application Logs (PM2)</h1>
      <pre>{logs}</pre>
    </div>
  );
};

export default LogsPage;
