const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Daten-Dateien
const DATA_DIR = path.join(__dirname, 'data');
const MARKERS_FILE = path.join(DATA_DIR, 'markers.json');
const DISTRICTS_FILE = path.join(DATA_DIR, 'districts.json');
const ROADS_FILE = path.join(DATA_DIR, 'roads.json');

// Erstelle data Verzeichnis wenn nicht vorhanden
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialisiere Dateien wenn nicht vorhanden
if (!fs.existsSync(MARKERS_FILE)) {
    fs.writeFileSync(MARKERS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(DISTRICTS_FILE)) {
    fs.writeFileSync(DISTRICTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(ROADS_FILE)) {
    fs.writeFileSync(ROADS_FILE, JSON.stringify([]));
}

// Hilfsfunktionen
function readMarkers() {
    const data = fs.readFileSync(MARKERS_FILE, 'utf8');
    return JSON.parse(data);
}

function writeMarkers(markers) {
    fs.writeFileSync(MARKERS_FILE, JSON.stringify(markers, null, 2));
}

function readDistricts() {
    const data = fs.readFileSync(DISTRICTS_FILE, 'utf8');
    return JSON.parse(data);
}

function writeDistricts(districts) {
    fs.writeFileSync(DISTRICTS_FILE, JSON.stringify(districts, null, 2));
}

function readRoads() {
    const data = fs.readFileSync(ROADS_FILE, 'utf8');
    return JSON.parse(data);
}

function writeRoads(roads) {
    fs.writeFileSync(ROADS_FILE, JSON.stringify(roads, null, 2));
}

// API Endpoints - Markers
app.get('/api/markers', (req, res) => {
    try {
        const markers = readMarkers();
        res.json(markers);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Laden der Marker' });
    }
});

app.post('/api/markers', (req, res) => {
    try {
        const markers = readMarkers();
        const newMarker = req.body;
        markers.push(newMarker);
        writeMarkers(markers);
        res.json({ success: true, marker: newMarker });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Speichern des Markers' });
    }
});

app.delete('/api/markers/:id', (req, res) => {
    try {
        const markers = readMarkers();
        const id = parseInt(req.params.id);
        const filteredMarkers = markers.filter(m => m.id !== id);
        writeMarkers(filteredMarkers);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Löschen des Markers' });
    }
});

app.post('/api/markers/clear', (req, res) => {
    try {
        writeMarkers([]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Löschen aller Marker' });
    }
});

app.post('/api/markers/import', (req, res) => {
    try {
        const markers = req.body;
        writeMarkers(markers);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Importieren der Marker' });
    }
});

// API Endpoints - Districts
app.get('/api/districts', (req, res) => {
    try {
        const districts = readDistricts();
        res.json(districts);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Laden der Bezirke' });
    }
});

app.post('/api/districts', (req, res) => {
    try {
        const districts = readDistricts();
        const newDistrict = req.body;
        districts.push(newDistrict);
        writeDistricts(districts);
        res.json({ success: true, district: newDistrict });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Speichern des Bezirks' });
    }
});

app.delete('/api/districts/:id', (req, res) => {
    try {
        const districts = readDistricts();
        const id = parseInt(req.params.id);
        const filteredDistricts = districts.filter(d => d.id !== id);
        writeDistricts(filteredDistricts);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Löschen des Bezirks' });
    }
});

// API Endpoints - Roads
app.get('/api/roads', (req, res) => {
    try {
        const roads = readRoads();
        res.json(roads);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Laden der Straßen' });
    }
});

app.post('/api/roads', (req, res) => {
    try {
        const roads = readRoads();
        const newRoad = req.body;
        roads.push(newRoad);
        writeRoads(roads);
        res.json({ success: true, road: newRoad });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Speichern der Straße' });
    }
});

app.delete('/api/roads/:id', (req, res) => {
    try {
        const roads = readRoads();
        const id = parseInt(req.params.id);
        const filteredRoads = roads.filter(r => r.id !== id);
        writeRoads(filteredRoads);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Löschen der Straße' });
    }
});

// Server starten
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🗺️ Leaflet Map Backend läuft auf Port ${PORT}`);
});
