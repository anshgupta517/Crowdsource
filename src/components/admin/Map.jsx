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
import Overlay from 'ol/Overlay';
import { Circle as CircleStyle, Fill, Style } from 'ol/style';

const OpenLayersMap = ({ issues }) => {
  const mapRef = useRef();
  const popupRef = useRef();
  const popupContentRef = useRef();
  const popupCloserRef = useRef();
  const mapInstance = useRef(null);
  const vectorLayer = useRef(null);
  const vectorSource = useRef(new VectorSource());

  const styleFunction = (feature) => {
    return new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ff0000', // Hardcoded red color
        }),
      }),
    });
  };

  useEffect(() => {
    vectorSource.current.clear();
    issues.forEach((issue) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([issue.coordinates.lng, issue.coordinates.lat])),
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
      });
      vectorSource.current.addFeature(feature);
    });
  }, [issues]);

  useEffect(() => {
    if (!mapInstance.current) {
      vectorLayer.current = new VectorLayer({
        source: vectorSource.current,
        style: styleFunction,
      });

      const popup = new Overlay({
        element: popupRef.current,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });

      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer.current,
        ],
        view: new View({
          center: fromLonLat([81.28, 21.19]), // Durg, Chhattisgarh
          zoom: 13,
        }),
        overlays: [popup],
      });

      const closer = popupCloserRef.current;
      closer.onclick = () => {
        popup.setPosition(undefined);
        closer.blur();
        return false;
      };

      mapInstance.current.on('singleclick', (event) => {
        const feature = mapInstance.current.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          popup.setPosition(coordinates);
          popupContentRef.current.innerHTML = `<strong>${feature.get('title')}</strong><p>${feature.get('description')}</p>`;
        } else {
          popup.setPosition(undefined);
          closer.blur();
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
      <div ref={popupRef} className="ol-popup">
        <a href="#" ref={popupCloserRef} className="ol-popup-closer"></a>
        <div ref={popupContentRef}></div>
      </div>
    </div>
  );
};

export default OpenLayersMap;