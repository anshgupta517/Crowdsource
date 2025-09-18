import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Style, Stroke } from 'ol/style';
import { MOCK_ISSUES } from '../../data/mockData';

const OpenLayersMap = ({ issues = [] }) => {
  const mapRef = useRef();
  const mapInstance = useRef(null);

  useEffect(() => {
    // Clean up previous map instance completely
    if (mapInstance.current) {
      mapInstance.current.setTarget(null);
      mapInstance.current = null;
    }

    // Durg, Chhattisgarh coordinates (default location)
    const defaultCenter = [81.2849, 21.1938]; // Durg coordinates

    console.log('Creating map with issues:', issues);
    console.log('Issues count:', issues.length);

    // Create fresh VectorSource every time
    const vectorSource = new VectorSource();
    
    // Process issues and create features
    const features = [];
    
    if (issues && issues.length > 0) {
      issues.forEach((issue, index) => {
        if (issue.coordinates && 
            typeof issue.coordinates.lat === 'number' && 
            typeof issue.coordinates.lng === 'number') {
          
          console.log(`Processing issue ${index}:`, issue.coordinates);
          
          const feature = new Feature({
            geometry: new Point(fromLonLat([issue.coordinates.lng, issue.coordinates.lat])),
            id: issue.id || index,
            title: issue.title || `Issue ${index + 1}`
          });
          
          features.push(feature);
        } else {
          console.warn(`Invalid coordinates for issue ${index}:`, issue);
        }
      });
    }

    console.log('Created features:', features.length);

    // Add all features to the vector source
    if (features.length > 0) {
      vectorSource.addFeatures(features);
    }

    // Create the vector layer with the populated source
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 12,
          fill: new Fill({ 
            color: 'rgba(255, 0, 0, 0.8)' 
          }),
          stroke: new Stroke({
            color: 'rgba(255, 255, 255, 1)',
            width: 2
          })
        }),
      }),
      zIndex: 1000 // High z-index to ensure markers are on top
    });

    // Determine map center
    let mapCenter = fromLonLat(defaultCenter);
    let mapZoom = 12;

    // If we have features, optionally center on the first one or calculate bounds
    if (features.length > 0) {
      // Option 1: Center on first feature
      // mapCenter = features[0].getGeometry().getCoordinates();
      
      // Option 2: Keep default center (Durg) - recommended for consistency
      mapCenter = fromLonLat(defaultCenter);
      mapZoom = features.length === 1 ? 15 : 12; // Zoom closer if only one marker
    }

    // Create the map with base layer and vector layer
    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          zIndex: 0
        }),
        vectorLayer
      ],
      view: new View({
        center: mapCenter,
        zoom: mapZoom,
        projection: 'EPSG:3857'
      }),
    });

    console.log('Map created successfully with', features.length, 'markers');

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
    };
  }, [issues]); // Re-run when issues prop changes

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: '100%', 
        width: '100%',
        border: '1px solid #fff',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5'
      }}
    />
  );
};

// Demo component with sample data for Durg area
const MapDemo = () => {
  const [currentIssues, setCurrentIssues] = React.useState([]);

  // Sample issues around Durg, Chhattisgarh

  React.useEffect(() => {
    // Simulate loading issues after component mount
    const timer = setTimeout(() => {
      setCurrentIssues(MOCK_ISSUES);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addRandomIssue = () => {
    const newIssue = {
      id: Date.now(),
      title: `New Issue ${currentIssues.length + 1}`,
      coordinates: {
        lat: 21.1938 + (Math.random() - 0.5) * 0.01, // Random within ~500m
        lng: 81.2849 + (Math.random() - 0.5) * 0.01
      }
    };
    setCurrentIssues(prev => [...prev, newIssue]);
  };

  const clearIssues = () => {
    setCurrentIssues([]);
  };

  return (
    <div style={{ padding: '10px', maxWidth: '1000px', margin: '0 auto', height: '95%'}}>
      <div style={{ marginBottom: '0' }}>
        <h2 className='text-white'>Map - Durg, Chhattisgarh</h2>
      </div>
      
      <OpenLayersMap issues={currentIssues} />
      
    </div>
  );
};

export default MapDemo;