import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent
} from "@mui/material";
import { Log } from "../../logging_middleware/logger.js";

function priority(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
}

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        await Log("frontend", "info", "component", "Fetching notifications");

        const data = await fetchNotifications();

        if (!data || data.length === 0) {
          await Log("frontend", "warn", "component", "No notifications received");
          setNotifications([]);
          return;
        }

        const sorted = [...data].sort((a, b) => {
          if (priority(b.Type) !== priority(a.Type)) {
            return priority(b.Type) - priority(a.Type);
          }
          return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        setNotifications(sorted);

        await Log("frontend", "info", "component", "Notifications loaded successfully");

      } catch (err) {
        setError("Failed to load notifications");
        await Log("frontend", "error", "component", "Error loading notifications");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    return n.Type === filter;
  });

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Notifications
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </div>

      {loading && (
        <Typography align="center">Loading...</Typography>
      )}

      {error && (
        <Typography align="center" color="error">
          {error}
        </Typography>
      )}

      {!loading && !error && filtered.map((n) => (
        <Card
          key={n.ID}
          style={{
            marginTop: 15,
            borderRadius: 12,
            padding: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <CardContent>
            <Typography variant="h6" color="primary">
              {n.Type}
            </Typography>
            <Typography>{n.Message}</Typography>
            <Typography variant="caption">{n.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;