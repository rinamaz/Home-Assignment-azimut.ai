// MyMap.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyMap from './MyMap';
import mapboxgl from 'mapbox-gl'; 

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 'target1',
        type: 'SHIP',
        threat_level: 'LOW',
        updated_at: new Date().toISOString(),
        latitude: -74.0242,
        longitude: 40.6941,
      },
      {
        id: 'target2',
        type: 'AIRCRAFT',
        threat_level: 'HIGH',
        updated_at: new Date().toISOString(),
        latitude: -74.0,
        longitude: 40.7,
      },
    ]),
  })
) as jest.Mock;

describe('MyMap Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('selecting a table row zooms the map to the correct marker', async () => {
    render(<MyMap />);

    await waitFor(() => {
      expect(screen.getByText('target1')).toBeInTheDocument();
      expect(screen.getByText('target2')).toBeInTheDocument();
    });

    const target2Row = screen.getByText('target2').closest('tr');
    expect(target2Row).toBeInTheDocument();

    fireEvent.click(target2Row!);
   await waitFor(() => {
      const mockMapConstructor = mapboxgl.Map as jest.Mock;
      expect(mockMapConstructor.mock.results[0].value.flyTo).toHaveBeenCalledWith({
        center: [40.7, -74.0],
        zoom: 15.12,
      });
    });
  });
});