Live Maritime Tracking Dashboard

This project implements a real-time maritime tracking dashboard with a focus on an excellent user experience, clear component structure, and responsiveness. It features a live table of targets and an interactive map, both updated in real-time via WebSockets.

Clone the repository:

git clone <your-repository-url>
cd <your-repository-name>
Build and run the Docker containers:

docker-compose up --build
This command will:

Build the Docker images for both the frontend and backend services.
Start the backend server on http://localhost:4000.
Start the frontend development server, accessible at http://localhost:3000.
How to Test
Once the Docker containers are up and running:

Access the Dashboard: Open your web browser and navigate to http://localhost:3000.
Observe Real-time Updates:
The live table will display maritime targets with their ID, type, threat level, and how long ago they were updated. The updated_ago column should be sorted in descending order, and the threat_level will be color-coded (e.g., red for HIGH).
The interactive map will show markers for each target.
Every 3 seconds, you should observe updates to a few targets on both the table and the map. Rows and markers should animate to highlight these changes.
Interact with the Table and Map:
Select a row in the live table: The map should automatically pan and zoom to the corresponding marker.
Hover over a marker on the map: A tooltip should appear, displaying the target's ID and type.
Trade-offs and Considerations
Backend Simplicity: The backend logic is intentionally kept minimal, focusing solely on generating and mutating random target data for real-time streaming. In a production environment, this would involve connecting to actual data sources (e.g., AIS data feeds, external APIs) and more robust data management.
Random Data Generation: The use of random target mutation is for demonstration purposes. Real-world scenarios would require more sophisticated algorithms for simulating realistic maritime traffic patterns and threat level changes.

Map Performance with Many Markers: While Mapbox is highly optimized, rendering thousands or tens of thousands of markers can impact performance. Strategies like marker clustering or server-side tiling would be necessary for large-scale deployments.
Error Handling and Robustness: The current implementation might have basic error handling. A production-ready application would require comprehensive error management on both frontend and backend to handle network issues, malformed data, and server failures gracefully.
Potential Improvements
Advanced Filtering and Search: Add functionality to filter targets by type, threat level, or search by ID in the table.
Time-based Playback: Implement a feature to replay past target movements based on historical data.
More Sophisticated Backend Data Simulation: Create more realistic target movement patterns, collision detection, or simulated environmental factors.
User Authentication and Authorization: Secure the dashboard by implementing login functionality and role-based access control.
Persistence: Store target data in a database to persist information even if the server restarts.
Geofencing and Alerts: Allow users to define geographic zones and receive alerts when targets enter or exit these zones.
Performance Optimizations:
Frontend: Implement React.memo or useMemo/useCallback hooks to prevent unnecessary re-renders of components. Optimize Mapbox rendering for large datasets (e.g., using source and layer updates instead of re-rendering all markers).
Backend: Optimize the data generation and mutation logic for better performance.
 