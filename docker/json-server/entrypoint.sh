#!/bin/sh
if [ ! -f /app/data/db.json ]; then
  echo "No existing db.json found, seeding from db.json.example"
  cp /app/db.json.example /app/data/db.json
fi
exec yarn json-server --watch /app/data/db.json --port 3002 --host 0.0.0.0
