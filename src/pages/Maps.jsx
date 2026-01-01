import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import {
  Filter,
  Layers,
  Info,
  Search,
  MapPin,
  TreeDeciduous,
  ThermometerSun,
  Ruler,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mouse,
  Minus,
  Plus
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component untuk fit bounds saat data berubah
function FitBounds({ data }) {
  const map = useMap();

  useEffect(() => {
    if (data && data.features && data.features.length > 0) {
      const bounds = L.geoJSON(data).getBounds();
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [data, map]);

  return null;
}

// Component untuk mengatur scroll wheel zoom secara dinamis
function ScrollZoomHandler({ enabled }) {
  const map = useMap();

  useEffect(() => {
    if (enabled) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
  }, [enabled, map]);

  return null;
}

export default function Maps() {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false);
  const [baseLayer, setBaseLayer] = useState('osm');
  const [showScrollInfo, setShowScrollInfo] = useState(true);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const mapRef = useRef(null);
  const [stats, setStats] = useState({
    total: 0,
    healthy: 0,
    damaged: 0,
    dry: 0,
    avgTemp: 0,
  });

  const handleZoom = useCallback((direction) => {
    if (!mapRef.current) return;

    if (direction === 'in') {
      mapRef.current.zoomIn();
    } else {
      mapRef.current.zoomOut();
    }
  }, []);

  // Load GeoJSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/trees.json');
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();
        setTreeData(data);
        calculateStats(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading tree data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate statistics
  const calculateStats = (data) => {
    if (!data || !data.features) return;

    const features = data.features;
    const healthy = features.filter(f => f.properties.condition === 'Sehat').length;
    const damaged = features.filter(f => f.properties.condition === 'Rusak').length;
    const dry = features.filter(f => f.properties.condition === 'Kering').length;

    const totalTemp = features.reduce((sum, f) => sum + (f.properties.temperature || 0), 0);
    const avgTemp = features.length > 0 ? (totalTemp / features.length).toFixed(1) : 0;

    setStats({
      total: features.length,
      healthy,
      damaged,
      dry,
      avgTemp,
    });
  };

  // Filter data berdasarkan kondisi dan search
  const getFilteredData = () => {
    if (!treeData) return null;

    let filtered = { ...treeData };

    // Filter by condition
    if (selectedCondition !== 'all') {
      filtered.features = treeData.features.filter(
        f => f.properties.condition === selectedCondition
      );
    }

    // Filter by search
    if (searchQuery) {
      filtered.features = filtered.features.filter(f => {
        const props = f.properties;
        const query = searchQuery.toLowerCase();
        return (
          props.species?.toLowerCase().includes(query) ||
          props.location?.toLowerCase().includes(query) ||
          props.id?.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  };

  // Style untuk marker berdasarkan kondisi
  const getMarkerColor = (condition) => {
    switch (condition) {
      case 'Sehat': return '#22c55e';
      case 'Rusak': return '#eab308';
      case 'Kering': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Style untuk GeoJSON point
  const pointToLayer = (feature, latlng) => {
    const condition = feature.properties.condition;
    const diameter = feature.properties.diameter || 30;

    return L.circleMarker(latlng, {
      radius: Math.min(diameter / 5, 15),
      fillColor: getMarkerColor(condition),
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    });
  };

  // Content untuk popup
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const props = feature.properties;
      const popupContent = `
        <div style="min-width: 200px; font-family: Inter, sans-serif;">
          <div style="border-bottom: 2px solid ${getMarkerColor(props.condition)}; padding-bottom: 8px; margin-bottom: 8px;">
            <div style="font-weight: 700; font-size: 16px; color: #1e293b; margin-bottom: 4px;">
              🌳 ${props.species || 'Unknown'}
            </div>
            <div style="font-size: 12px; color: #64748b; font-style: italic;">
              ${props.species_latin || ''}
            </div>
          </div>

          <div style="display: grid; gap: 6px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">ID:</span>
              <span style="font-weight: 600; color: #1e293b;">${props.id}</span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Diameter:</span>
              <span style="font-weight: 600; color: #1e293b;">${props.diameter} cm</span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Kondisi:</span>
              <span style="font-weight: 700; color: ${getMarkerColor(props.condition)};">
                ${props.condition}
              </span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Suhu Sekitar:</span>
              <span style="font-weight: 600; color: #1e293b;">${props.temperature}°C</span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: #64748b;">Skor Ekologi:</span>
              <span style="font-weight: 600; color: #1e293b;">⭐ ${props.ecological_score}/5</span>
            </div>
          </div>

          <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #64748b; margin-bottom: 2px;">📍 Lokasi:</div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 500;">${props.location}</div>
          </div>

          ${props.notes ? `
            <div style="margin-top: 8px; padding: 8px; background: #f1f5f9; border-radius: 6px; font-size: 12px; color: #475569;">
              💬 ${props.notes}
            </div>
          ` : ''}

          <div style="margin-top: 8px; font-size: 11px; color: #94a3b8; text-align: center;">
            Survey: ${props.survey_date} | ${props.surveyor}
          </div>
        </div>
      `;

      layer.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="flex flex-col h-screen pt-20">

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-slate-200 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'w-0' : 'w-80'
        }`}>
          {/* Sidebar Header */}
          <div className="bg-primary-600 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6" />
              <h2 className="font-bold text-xl">Kontrol Peta</h2>
            </div>
            <p className="text-sm text-primary-100">
              Filter dan eksplorasi data pohon
            </p>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Search */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Cari Pohon
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari spesies, lokasi, atau ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Statistik Data
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                  <div className="text-xs text-slate-600">Total Pohon</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{stats.healthy}</div>
                  <div className="text-xs text-green-700">Sehat</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{stats.damaged}</div>
                  <div className="text-xs text-yellow-700">Rusak</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{stats.dry}</div>
                  <div className="text-xs text-red-700">Kering</div>
                </div>
              </div>
              <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-700 mb-1">Suhu Rata-rata</div>
                <div className="text-2xl font-bold text-blue-600">{stats.avgTemp}°C</div>
              </div>
            </div>

            {/* Filter by Condition */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Kondisi
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCondition('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedCondition === 'all'
                      ? 'border-slate-500 bg-slate-50 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={selectedCondition === 'all' ? 'text-slate-700' : 'text-slate-700'}>
                      Semua Pohon
                    </span>
                    {selectedCondition === 'all' && (
                      <span className="text-slate-600">✓</span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setSelectedCondition('Sehat')}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedCondition === 'Sehat'
                      ? 'border-green-500 bg-green-50 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={selectedCondition === 'Sehat' ? 'text-green-700' : 'text-slate-700'}>
                      Sehat
                    </span>
                    {selectedCondition === 'Sehat' && (
                      <span className="text-green-600">✓</span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setSelectedCondition('Rusak')}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedCondition === 'Rusak'
                      ? 'border-yellow-500 bg-yellow-50 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={selectedCondition === 'Rusak' ? 'text-yellow-700' : 'text-slate-700'}>
                      Rusak
                    </span>
                    {selectedCondition === 'Rusak' && (
                      <span className="text-yellow-600">✓</span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setSelectedCondition('Kering')}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedCondition === 'Kering'
                      ? 'border-red-500 bg-red-50 font-semibold'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={selectedCondition === 'Kering' ? 'text-red-700' : 'text-slate-700'}>
                      Kering
                    </span>
                    {selectedCondition === 'Kering' && (
                      <span className="text-red-600">✓</span>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Legend */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Legenda Peta
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-white shadow"></div>
                  <span className="text-sm text-slate-700">Pohon Sehat</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-white shadow"></div>
                  <span className="text-sm text-slate-700">Pohon Rusak</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow"></div>
                  <span className="text-sm text-slate-700">Pohon Kering</span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-600 mb-2">Ukuran lingkaran = diameter batang</div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <span className="text-xs text-slate-600">Kecil</span>
                    <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                    <span className="text-xs text-slate-600">Sedang</span>
                    <div className="w-6 h-6 rounded-full bg-primary-500"></div>
                    <span className="text-xs text-slate-600">Besar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Map Container */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-slate-600 font-semibold">Memuat data peta...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-50">
              <div className="text-center max-w-md">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Data</h3>
                <p className="text-slate-600">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && treeData && (
            <MapContainer
              center={[0.5383, 101.4617]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              scrollWheelZoom={false}
              ref={mapRef}
            >
              <ScrollZoomHandler enabled={scrollZoomEnabled} />
              {baseLayer === 'osm' ? (
              <TileLayer
                  key="osm"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              ) : (
                <TileLayer
                  key="google"
                  attribution='Imagery © <a href="https://www.google.com/maps">Google</a>'
                  url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                  maxZoom={20}
                />
              )}

              {filteredData && filteredData.features && filteredData.features.length > 0 && (
                <>
                  <GeoJSON
                    key={`${selectedCondition}-${searchQuery}`}
                    data={filteredData}
                    pointToLayer={pointToLayer}
                    onEachFeature={onEachFeature}
                  />
                  <FitBounds data={filteredData} />
                </>
              )}
            </MapContainer>
          )}

          {/* Map Style Selector + Control Buttons */}
          <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-3 w-60 max-w-[70vw]">
            {/* Layer Switcher */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-lg px-3 py-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                <span>Mode Peta</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { id: 'osm', label: 'Standard' },
                  { id: 'satellite', label: 'Satelit' },
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setBaseLayer(option.id === 'osm' ? 'osm' : 'satellite')}
                    className={`px-2 py-1.5 rounded-lg border-2 text-xs font-semibold transition-all ${
                      baseLayer === option.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

          {/* Control Buttons */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-lg px-3 py-2">
            <button
                onClick={() => setControlsCollapsed(!controlsCollapsed)}
                className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wide"
              >
                <span>Kontrol</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${controlsCollapsed ? '-rotate-90' : ''}`}
                />
            </button>

              {!controlsCollapsed && (
                <>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => handleZoom('out')}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
                      title="Zoom Out"
                      type="button"
                    >
                      <Minus className="w-4 h-4" />
                      Zoom Out
                    </button>
                    <button
                      onClick={() => handleZoom('in')}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
                      title="Zoom In"
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                      Zoom In
                    </button>
            <button
              onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all border-2 ${
                scrollZoomEnabled
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                      title={scrollZoomEnabled ? 'Scroll Zoom aktif' : 'Scroll Zoom mati'}
                    >
                      <Mouse className="w-4 h-4" />
                      Scroll
                    </button>
                    <button
                      onClick={() => setShowScrollInfo(!showScrollInfo)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all border-2 ${
                        showScrollInfo
                          ? 'border-slate-200 text-slate-600'
                          : 'border-slate-300 text-slate-400'
                      }`}
                      title={showScrollInfo ? 'Sembunyikan tips scroll' : 'Tampilkan tips scroll'}
                    >
                      <Info className="w-4 h-4" />
                      Info
                    </button>
                  </div>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="w-full mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    title={sidebarCollapsed ? 'Tampilkan sidebar' : 'Sembunyikan sidebar'}
                  >
                    {sidebarCollapsed ? (
                      <>
                        <ChevronRight className="w-4 h-4" />
                        Tampilkan Sidebar
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="w-4 h-4" />
                        Sembunyikan Sidebar
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Scroll Zoom Info Toast */}
          {!scrollZoomEnabled && showScrollInfo && (
            <div className="absolute top-6 right-6 z-[1000] bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Scroll Zoom Disabled</div>
                  <div className="text-xs text-slate-300">
                    Gunakan <kbd className="bg-slate-700 px-1 rounded">Ctrl</kbd> + Scroll untuk zoom map, atau klik icon 🖱️
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Result Count */}
          {!loading && !error && filteredData && (
            <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200 z-[1000]">
              <span className="text-sm text-slate-600">
                Menampilkan <span className="font-bold text-primary-600">{filteredData.features.length}</span> pohon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
