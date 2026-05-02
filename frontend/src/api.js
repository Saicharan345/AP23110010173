const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWljaGFyYW5fYmFnYWRpQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNjk5NywiaWF0IjoxNzc3NzA2MDk3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNmM1MjJmMmQtZGYwZS00YjMxLWI4ZjUtOWRhNWYwYmQxNDhhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYmFnYWRpIHNhaSBjaGFyYW4iLCJzdWIiOiJhNDBmODZmMS0yZWQ3LTQzZDQtOTcyOS0xNjQ5MzczMzY3OTAifSwiZW1haWwiOiJzYWljaGFyYW5fYmFnYWRpQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJiYWdhZGkgc2FpIGNoYXJhbiIsInJvbGxObyI6ImFwMjMxMTAwMTAxNzMiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJhNDBmODZmMS0yZWQ3LTQzZDQtOTcyOS0xNjQ5MzczMzY3OTAiLCJjbGllbnRTZWNyZXQiOiJ1YUJXVnVDZWFuSnZoQnp3In0.5Uj2gRKkpI2yhx1hCMQp7S7NqcHnd4b5c4PlslmuUO8";

export async function fetchNotifications() {
  const res = await fetch("http://20.207.122.201/evaluation-service/notifications", {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });

  if (!res.ok) {
    console.error("API failed");
    return [];
  }

  const data = await res.json();

  console.log("RAW API:", data); 

  return data.notifications; 
}