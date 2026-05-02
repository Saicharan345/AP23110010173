# Notification System Design

## Overview

This system is built to fetch notifications from an external API and show the most important ones to users. Since users often receive many notifications, the idea is to highlight the most relevant ones first based on their importance and how recent they are.

---

## Architecture

The design is kept simple and modular so that it is easy to understand and extend later:

* **API Layer** – Responsible for fetching notifications from the external service.
* **Service Layer** – Handles processing, sorting, and selecting the top notifications.
* **Logging Middleware** – Tracks important actions and errors throughout the application.

---

## Workflow

1. The application sends a request to the notifications API.
2. The API returns a list of notifications.
3. Each notification includes details like ID, type, message, and timestamp.
4. Based on the type of notification, a priority is assigned:

   * Placement notifications are most important.
   * Result notifications come next.
   * Event notifications have the lowest priority.
5. The notifications are then sorted:

   * First by priority (higher priority first)
   * Then by time (latest notifications first)
6. From this sorted list, the top 10 notifications are selected.
7. These top notifications are displayed to the user.

---

## Priority Logic

To keep things simple, a numeric priority system is used:

* Placement → 3
* Result → 2
* Event → 1

This makes sorting straightforward and efficient.

---

## Logging Strategy

A reusable logging middleware is used to track what is happening inside the application.

Logs are created for:

* When the application starts
* When the API request is made
* When data is successfully fetched
* After sorting is completed
* If any error occurs

This helps in debugging and understanding the system behavior later.

---

## Scalability Considerations

The current system is lightweight and efficient:

* It does not store data in a database, which reduces complexity.
* All processing is done in memory, making it fast.
* In the future, features like pagination, filtering, or caching can be added easily.

---

## Error Handling

Basic error handling is included to make the system reliable:

* API responses are checked before processing.
* If something goes wrong, it is logged using the logging middleware.
* The system avoids crashing and handles failures gracefully.

---

## Conclusion

This design ensures that users always see the most important notifications first. It is simple, efficient, and easy to expand in the future while maintaining clear structure and proper logging.
