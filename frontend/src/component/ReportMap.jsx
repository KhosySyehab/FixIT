import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getStatusColor = (status) => {
  switch(status) {
    case 'pending': return 'red';
    case 'progress': return 'orange';
    case 'done': return 'green';
    default: return 'blue';
  }
};

const createColoredIcon = (color) => {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export default function ReportMap({ reports = [] }) {
  const center = [-6.2, 106.8]; // Jakarta center

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <MapContainer center={center} zoom={12} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map((report) => (
          <Marker
            key={report._id}
            position={[report.latitude, report.longitude]}
            icon={createColoredIcon(getStatusColor(report.status))}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold">{report.title}</h3>
                <p className="text-gray-600">{report.description}</p>
                <p className="text-xs mt-2">
                  <span className={`px-2 py-1 rounded text-white text-xs font-semibold
                    ${report.status === 'pending' ? 'bg-red-500' : 
                      report.status === 'progress' ? 'bg-orange-500' : 
                      'bg-green-500'}`}>
                    {report.status}
                  </span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
