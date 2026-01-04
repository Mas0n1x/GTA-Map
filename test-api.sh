#!/bin/bash

echo "=== Testing Leaflet Map API ==="
echo ""

echo "1. Testing GET /api/markers"
curl -s http://localhost:8099/api/markers | jq . || echo "Failed"
echo ""

echo "2. Testing GET /api/districts"
curl -s http://localhost:8099/api/districts | jq . || echo "Failed"
echo ""

echo "3. Testing POST /api/markers"
curl -s -X POST http://localhost:8099/api/markers \
  -H "Content-Type: application/json" \
  -d '{
    "id": 123456789,
    "lat": -170,
    "lng": 125,
    "title": "Test Marker",
    "description": "API Test",
    "category": "sonstiges",
    "icon": "📍",
    "hidden": false,
    "password": null
  }' | jq .
echo ""

echo "4. Testing GET /api/markers (should now have 1 marker)"
curl -s http://localhost:8099/api/markers | jq .
echo ""

echo "5. Testing DELETE /api/markers/123456789"
curl -s -X DELETE http://localhost:8099/api/markers/123456789 | jq .
echo ""

echo "6. Testing GET /api/markers (should be empty again)"
curl -s http://localhost:8099/api/markers | jq .
echo ""

echo "=== All tests completed ==="
