import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

export default function SafeMap({
  center = [-6.2, 106.8],
  zoom = 13,
  reports = [],
  onMarkerClick = null,
  onMapClick = null,
  showClickMarker = false,
  height = "h-96"
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const clickMarker = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Jika map sudah ada, hapus terlebih dahulu
      if (map.current) {
        map.current.remove();
      }

      // Buat map baru
      map.current = L.map(mapContainer.current).setView(center, zoom);

      // Tambah tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map.current);

      // Fix marker icons
      const DefaultIcon = L.icon({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Tambah report markers
      reports.forEach((report) => {
        const lat = report.latitude || -6.2;
        const lng = report.longitude || 106.8;
        
        const marker = L.marker([lat, lng], { icon: DefaultIcon })
          .bindPopup(`
            <div class="text-sm">
              <p class="font-bold">${report.title}</p>
              <p class="text-gray-600 text-xs">${report.description?.substring(0, 50) || ''}...</p>
              <div class="mt-2 flex gap-1 flex-wrap">
                <span class="px-2 py-1 rounded text-xs font-semibold text-white ${
                  report.status === 'pending' ? 'bg-red-500' :
                  report.status === 'progress' ? 'bg-yellow-500' :
                  'bg-green-500'
                }">
                  ${report.status}
                </span>
                <span class="px-2 py-1 rounded text-xs font-semibold bg-blue-500 text-white">
                  ${report.category}
                </span>
              </div>
              <p class="text-gray-600 text-xs mt-2">👍 ${report.votes || 0} votes</p>
            </div>
          `)
          .addTo(map.current);

        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(report._id));
        }
      });

      // Handle map click untuk location picker
      if (onMapClick && showClickMarker) {
        map.current.on('click', (e) => {
          const coords = [e.latlng.lat, e.latlng.lng];
          onMapClick(coords);

          // Update/create click marker
          if (clickMarker.current) {
            clickMarker.current.remove();
          }

          const clickIcon = L.icon({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          clickMarker.current = L.marker(coords, { icon: clickIcon })
            .bindPopup('📍 Report Location Selected')
            .addTo(map.current)
            .openPopup();
        });
      }
    } catch (error) {
      console.error('Leaflet error:', error);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [reports, center, zoom, onMarkerClick, onMapClick, showClickMarker]);

  return (
    <div className={`${height} rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700`}>
      <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
