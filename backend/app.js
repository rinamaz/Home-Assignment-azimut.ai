const PORT = 4000;
const { targets } = require('./targets.js');
const cors = require('cors');

const http = require('http')
const express = require('express');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/GET/targets', (req, res) => {
  const data = targets
  res.json(data);
});
const wss = new WebSocket.Server({ server, path: '/stream' });

wss.on('connection', ws => {
  const interval = setInterval(() => {
    const numMutations = Math.floor(Math.random() * 3) + 1;
    const updatedIds = [];
    for (let i = 0; i < numMutations; i++) {
      let index = Math.floor(Math.random() * targets.length)
      targets[index].updated_at = Date.now();
      targets[index].threat_level = ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)];
      updatedIds.push(targets[index].id)
    }
    ws.send(JSON.stringify({ type: 'update', targets: targets, updatedIds: updatedIds }));
  }, 3000);

  ws.on('close', () => {
    clearInterval(interval);
  });

  ws.on('error', error => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
});

app.use((req, res) => {
  res.status(404).send('דף לא נמצא - 404 מ-Express\n');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`HTTP targets endpoint: http://localhost:${PORT}/GET/targets`);
  console.log(`WebSocket stream endpoint: ws://localhost:${PORT}/stream`);
});