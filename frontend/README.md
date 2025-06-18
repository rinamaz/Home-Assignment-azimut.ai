Stack Choices
Frontend
React + Vite: Chosen for its fast development server, component-based architecture, and efficient rendering, which are crucial for a real-time dashboard.
Mapbox GL JS: Required for displaying interactive maps and managing dynamic markers. Its performance and extensive API make it suitable for this application.
Tailwind CSS: Selected for its utility-first approach, allowing for rapid UI development and easy customization without writing extensive custom CSS.
Recharts: (Potential addition for data visualization, if a more complex "threat level over time" graph were needed, though not explicitly required for initial scope).
WebSockets API: For real-time communication with the backend, enabling instant updates of maritime targets.
Backend
FastAPI: Chosen for its high performance, ease of use, and built-in support for WebSockets. Its automatic interactive API documentation (Swagger UI) also aids in development and testing.
Python: The language for FastAPI, known for its readability and rich ecosystem of libraries.
Testing
Jest + React Testing Library: Standard combination for React applications. Jest provides the test runner, and React Testing Library encourages testing components as users would interact with them, ensuring robust UI tests.
Setup
To get the project up and running, follow these steps:

Clone the repository:

Bash

git clone https://github.com/rinamaz/Home-Assignment-azimut.ai.git
cd maritime-tracking-dashboard
Docker Compose: The simplest way to run both the frontend and backend is using Docker Compose.

docker-compose up --build
This command will:

Build the Docker images for both the frontend and backend.
Start the backend server (FastAPI) on http://localhost:4000.
Start the frontend (React) development server, typically accessible at http://localhost:3000 (or another available port).
Manual Setup (Alternative):

Backend
Navigate to the backend directory: cd backend
Install dependencies: pip install -r requirements.txt
Run the server: uvicorn main:app --host 0.0.0.0 --port 4000
Frontend
Navigate to the frontend directory: cd frontend
Install dependencies: npm install (or yarn install)
Create a .env file in the frontend directory and add your Mapbox public access token:
VITE_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
Run the development server: npm run dev (or yarn dev)
How to Test
Frontend Unit Tests
To run the React unit tests for the table row color coding:

Navigate to the frontend directory: cd frontend
Run the tests: npm test (or yarn test)
Frontend Integration Tests
To run the integration tests for selecting a row and zooming to the marker:

Ensure both the frontend and backend are running.
Navigate to the frontend directory: cd frontend
Run the tests: npm test -- -t "integration" (or yarn test -- -t "integration")
Note: Specific test commands might vary slightly based on the exact test file setup. Adjust the -t flag to match your integration test description or file name.
Trade-offs and Improvements
Trade-offs made during development:
Minimal Backend Logic: The backend is intentionally kept simple to focus on feeding the frontend with data. In a production environment, this would involve more sophisticated data handling, persistence, and perhaps a dedicated database.
No Dedicated State Management Library (Redux/Zustand): For this scale, React's useState and useReducer combined with useContext are sufficient to manage global state and real-time updates without the overhead of a larger state management library. For a very large application, one might be considered.
Simple Threat Level Logic: The threat level generation and color coding are basic. A real-world scenario would involve complex algorithms for threat assessment.
Basic Animation: Row and marker animations are straightforward. More sophisticated animations could be achieved with libraries like Framer Motion or React Spring.
Potential Improvements:
Robust Error Handling and UI Feedback: Implement more comprehensive error boundaries and user-friendly messages for network issues or data discrepancies.
Scalable Backend Architecture: For a large number of targets, consider a more robust message broker (e.g., Kafka, RabbitMQ) and a more sophisticated data storage solution (e.g., PostgreSQL, MongoDB).
Performance Optimizations:
Virtualization for Large Tables: If the number of targets grows significantly, implement React Window or React Virtualized for the table to improve rendering performance.
Mapbox Optimization: Optimize Mapbox layers and source updates for very high-frequency data streams.
User Authentication and Authorization (JWT): As per the bonus stretch, implementing a full JWT flow for secure access to the dashboard and API endpoints.
Advanced Filtering and Sorting:
Frontend: More advanced table filtering (e.g., by type, threat level range) and multi-column sorting.
Backend: Implement server-side filtering and sorting for very large datasets to reduce frontend load.
Persistence: Implement localStorage or a similar mechanism to remember the last selected row and map view.
Geofencing and Alerts: Add functionality to define areas of interest and trigger alerts when targets enter or exit these areas.
Historical Data View: Store historical target data and allow users to view past movements or events.
More Sophisticated Threat Assessment: Incorporate more data points and algorithms for a more accurate threat level calculation.
Accessibility (A11y): Ensure the dashboard is accessible to users with disabilities by following WCAG guidelines.