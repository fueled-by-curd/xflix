mongo qkart --eval "db.dropDatabase()" 
mongoimport -d qflix -c videos --file data/data.json
