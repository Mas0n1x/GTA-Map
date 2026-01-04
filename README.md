# Leaflet Map - Police Department Ortskunde Karte

## Änderungen & Verbesserungen

### ✅ Behobene Probleme:

1. **Bezirke werden jetzt zwischen allen Nutzern geteilt**
   - Backend-API mit Express.js erstellt
   - Daten werden in JSON-Dateien persistent gespeichert
   - Alle Nutzer sehen dieselben Bezirke und Marker

2. **Marker-Position korrigiert**
   - Neues Klick-System: Erst auf Karte klicken, dann Details eingeben
   - Button "Marker platzieren" aktiviert den Platzierungsmodus
   - Klick auf Karte platziert temporären Marker (mit Vorschau)
   - Button "Marker bestätigen" speichert den Marker mit den eingegebenen Details
   - Marker erscheinen jetzt **exakt** an der geklickten Position ✅

3. **Button-System für Bezirk-Erstellung**
   - "Bezirk zeichnen" - Startet den Zeichenmodus
   - "Bezirk fertigstellen" - Beendet und speichert den Bezirk
   - "Abbrechen" - Bricht den Zeichenmodus ab
   - Kein Doppelklick mehr nötig

4. **Bezirke & Marker in der Sidebar**
   - Bezirke werden gruppiert angezeigt
   - Marker nach Kategorien sortiert
   - Ein-/Ausblenden per Checkbox

5. **Straßen-Zeichnen Feature**
   - Straßen können mit Namen, Farbe und Breite eingezeichnet werden
   - Button-System ähnlich wie bei Bezirken
   - Straßen-Namen werden in der Mitte der Straße angezeigt
   - Straßen erscheinen in der Sidebar zum Ein-/Ausblenden

6. **LSPD Branding**
   - LSPD Logo als Favicon und Kartenbild
   - Titel geändert zu "Police Department - Ortskunde Karte"
   - Professionelles Police Department Erscheinungsbild

7. **Zentrierte Labels**
   - Bezirk-Labels werden perfekt mittig im Bezirk angezeigt
   - Straßen-Labels werden mittig auf der Straße positioniert
   - Dynamische Berechnung der Label-Position basierend auf tatsächlicher Größe

## Technische Details

### Backend-Architektur:
- **Node.js + Express** Backend
- **REST API** für Marker und Bezirke
- **JSON-Dateien** als Datenspeicher
- **Docker Container** für einfaches Deployment

### API Endpoints:

#### Marker:
- `GET /api/markers` - Alle Marker laden
- `POST /api/markers` - Neuen Marker erstellen
- `DELETE /api/markers/:id` - Marker löschen
- `POST /api/markers/clear` - Alle Marker löschen
- `POST /api/markers/import` - Marker importieren

#### Bezirke:
- `GET /api/districts` - Alle Bezirke laden
- `POST /api/districts` - Neuen Bezirk erstellen
- `DELETE /api/districts/:id` - Bezirk löschen

#### Straßen:
- `GET /api/roads` - Alle Straßen laden
- `POST /api/roads` - Neue Straße erstellen
- `DELETE /api/roads/:id` - Straße löschen

### Ports:
- **Frontend**: http://localhost:8099
- **Backend API**: http://localhost:8099/api (über nginx reverse proxy)

### HTTPS Support:
Das Backend wird über nginx als reverse proxy bereitgestellt und nutzt automatisch dasselbe Protokoll (HTTP/HTTPS) wie das Frontend. Dadurch funktioniert die Anwendung sowohl über HTTP als auch HTTPS ohne "Mixed Content" Fehler.

## Installation & Start

```bash
cd /srv/leaflet-map
docker compose up -d --build
```

## Daten-Backup

Die Daten werden in `/srv/leaflet-map/backend/data/` gespeichert:
- `markers.json` - Alle Marker
- `districts.json` - Alle Bezirke
- `roads.json` - Alle Straßen

**Backup erstellen:**
```bash
cp -r /srv/leaflet-map/backend/data /srv/leaflet-map/backup-$(date +%Y%m%d)
```

## Admin-Login
Passwort: `Leadership123!`

## Wichtige Hinweise

1. **Versteckte Marker**: Das Passwort wird im Backend gespeichert und ist für alle Nutzer gleich
2. **Daten-Persistenz**: Alle Daten bleiben auch nach Container-Restart erhalten
3. **Import/Export**: Die Export-Funktion exportiert nur lokale Daten, Import überschreibt die Backend-Daten

## Browser-Cache
Falls Änderungen nicht sichtbar sind:
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)
