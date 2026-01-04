#!/bin/bash

echo "=== Testing Leaflet Map Roads API ==="
echo ""

echo "1. Testing GET /api/roads (should be empty)"
curl -s http://localhost:8099/api/roads
echo ""
echo ""

echo "2. Testing POST /api/roads (creating first road)"
curl -s -X POST http://localhost:8099/api/roads \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1001,
    "name": "Yakuza Straße",
    "color": "#ff0000",
    "width": 5,
    "points": [[-170, 125], [-160, 130], [-150, 135]]
  }'
echo ""
echo ""

echo "3. Testing POST /api/roads (creating second road)"
curl -s -X POST http://localhost:8099/api/roads \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1002,
    "name": "Route 68",
    "color": "#0066ff",
    "width": 4,
    "points": [[-100, 100], [-90, 110], [-80, 120]]
  }'
echo ""
echo ""

echo "4. Testing GET /api/roads (should now have 2 roads)"
curl -s http://localhost:8099/api/roads
echo ""
echo ""

echo "5. Testing DELETE /api/roads/1001"
curl -s -X DELETE http://localhost:8099/api/roads/1001
echo ""
echo ""

echo "6. Testing GET /api/roads (should now have 1 road)"
curl -s http://localhost:8099/api/roads
echo ""
echo ""

echo "7. Cleaning up - DELETE /api/roads/1002"
curl -s -X DELETE http://localhost:8099/api/roads/1002
echo ""
echo ""

echo "8. Final check - GET /api/roads (should be empty again)"
curl -s http://localhost:8099/api/roads
echo ""
echo ""

echo "=== All road tests completed ==="
