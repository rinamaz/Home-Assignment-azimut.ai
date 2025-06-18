// __mocks__/mapbox-gl.ts

const mockMap = {
  on: jest.fn(),
  remove: jest.fn(),
  getCenter: jest.fn(() => ({ lng: 0, lat: 0 })),
  getZoom: jest.fn(() => 10),
  addSource: jest.fn(),
  addLayer: jest.fn(),
  loadImage: jest.fn((url, callback) => callback(null, {})), // Mock loadImage
  addImage: jest.fn(),
  getCanvas: jest.fn(() => ({ style: { cursor: '' } })),
  flyTo: jest.fn(), // זה מה שנצטרך לבדוק
};

const mockPopup = {
  setLngLat: jest.fn().mockReturnThis(),
  setHTML: jest.fn().mockReturnThis(),
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
};

const mapboxgl = {
  Map: jest.fn(() => mockMap),
  Popup: jest.fn(() => mockPopup),
  accessToken: '',
};

module.exports = mapboxgl;