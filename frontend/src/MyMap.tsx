import './App.css'
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { eThreatLevel, ThreatLevelColors, eThreatType } from './enums'

interface target {
  id: string;
  type: eThreatType
  threat_level: eThreatLevel,
  updated_ago: number,
  updated_at: Date
  latitude: number
  longitude: number
}
const INITIAL_CENTER_X = -74.0242
const INITIAL_CENTER_Y = 40.6941
const INITIAL_ZOOM = 10.12

function MyMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  const [center_X, setCenter_X] = useState(INITIAL_CENTER_X)
  const [center_Y, setCenter_Y] = useState(INITIAL_CENTER_Y)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  const [targets, setTargets] = useState<target[]>([]);
  const [selectedTargets, setSelectedTargets] = useState<target>(null);
  const [updatedIds, setUpdatedIds] = useState([]);
  const [loadTargets, setLoadTargets] = useState(false);

  const popupRef = useRef(new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 25
  }));

  useEffect(() => {
    fetchInitialTargets()
  }, [])


  const formatUpdatedAgo = (date: Date) => {
    return Math.floor(((new Date()).getTime() - date.getTime()) / (1000));
  };
  useEffect(() => {
     fetchInitialTargets()
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXppbXV0YWkiLCJhIjoiY2xrcGJieW1iMHZ0ODNka3l1ZDc2czExdSJ9.bnfiBfbmpV9f_Qv-Z6tTwA'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [center_X, center_Y],
      zoom: zoom
    });
    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      setCenter_X(mapCenter.lng)
      setCenter_Y(mapCenter.lat)
      setZoom(mapZoom)
    })
    mapRef.current.on('load', () => {

      mapRef.current.addSource('points-data', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': createFeatures()
        }
      });

      mapRef.current.addLayer({
        'id': 'points-layer',
        'type': 'symbol',
        'source': 'points-data',
        'layout': {
          'icon-image': 'my-custom-icon',
          'icon-size': 2,
          'icon-allow-overlap': true,
        }
      });

      mapRef.current.loadImage("http:center_point.png",
        (error, image) => {
          if (error) throw error;
          mapRef.current.addImage('my-custom-icon', image);

          mapRef.current.on('mouseenter', 'points-layer', (e) => {
            mapRef.current.getCanvas().style.cursor = 'pointer';
            const feature = e.features[0];
            if (feature && feature.geometry && feature.geometry.type === 'Point' && feature.properties) {
              const { id, type } = feature.properties;
              const coordinates = feature.geometry.coordinates as [number, number];
              popupRef.current
                .setLngLat(coordinates)
                .setHTML(`<strong>ID:</strong> ${id}<br><strong>Type:</strong> ${type}`)
                .addTo(mapRef.current);
            }
          });

          mapRef.current.on('mouseleave', 'points-layer', () => {
            mapRef.current.getCanvas().style.cursor = '';
            popupRef.current.remove();
          });
        }
      );
    });
    return () => {
      mapRef.current?.remove()
    }
  }, [loadTargets])

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/stream');
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'update') {
        const updatedTargetsData = message.targets;
        setUpdatedIds(message.updatedIds)
        updatedTargetsData.forEach((t: target) => {
          t.updated_at = new Date(t.updated_at);
          t.updated_ago = formatUpdatedAgo(t.updated_at)
        });
        setTargets(updatedTargetsData);
        setTimeout(() => {
          setUpdatedIds([]);
        }, 1500);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      ws.close();
    };
  }, []);
  const fetchInitialTargets = async () => {
    try {
      const response = await fetch('http://localhost:4000/GET/targets');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const targets = await response.json();
      targets.forEach((t: target) => {
        t.updated_at = new Date(t.updated_at);
        t.updated_ago = formatUpdatedAgo(t.updated_at)
      });
      console.log(targets);
      setTargets(targets)
      setLoadTargets(true)
    } catch (error) {
      console.error('Failed to fetch initial targets:', error);
    }
  }

  const handleRowClick = (rowData: any) => {
    mapRef.current.flyTo({
      center: [rowData.data.latitude, rowData.data.longitude],
      zoom: INITIAL_ZOOM + 5
    })
  }

  const createFeatures = () => {
    let featuresArr: any[] = []
    targets.forEach(t => {
      featuresArr.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [t.latitude, t.longitude]
        },
        'properties': {
          'type': t.type,
          'id': t.id,
        }
      })
    })
    return featuresArr;
  }

  const ThreatLevelCell = (rowData: target) => {
    const color = ThreatLevelColors[rowData.threat_level]
    return (
      <span style={{ color: color, fontWeight: 'bold' }}>
        {rowData.threat_level}
      </span>
    );
  }

  return (
    <>
      <h2>Threat table</h2>
      <div className="card">
        <DataTable value={targets} tableStyle={{ minWidth: '50rem' }} onRowClick={handleRowClick}
          selectionMode="single"
          selection={selectedTargets}
          onSelectionChange={(e: any) => { setSelectedTargets(e.value); }}
          sortField="updated_ago" sortOrder={-1}
          rowClassName={(data: target) => ({ 'row-animated': updatedIds.includes(data.id) })}
        >
          <Column field="id" header="Id"></Column>
          <Column field="type" header="Type"></Column>
          <Column field="threat_level" header="Threat Level" body={ThreatLevelCell}></Column>
          <Column field="updated_ago" header="Updated Ago" body={(rowData: target) => { return <>{rowData.updated_ago} Seconds</> }}></Column>
        </DataTable>
      </div>
      <h2> Map</h2>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default MyMap