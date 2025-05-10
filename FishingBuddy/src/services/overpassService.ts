export const fetchFishingSpots = async (
    lat: number,
    lon: number,
    radiusInKm = 100
  ) => {
    const latMin = lat - radiusInKm / 111;
    const latMax = lat + radiusInKm / 111;
    const lonMin = lon - radiusInKm / (111 * Math.cos((lat * Math.PI) / 180));
    const lonMax = lon + radiusInKm / (111 * Math.cos((lat * Math.PI) / 180));
  
    const query = `
      [out:json];
      node["leisure"="fishing"](${latMin},${lonMin},${latMax},${lonMax});
      out body;
    `;
  
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      return data.elements.map((spot: any, index: number) => ({
        id: spot.id?.toString() ?? `spot-${index}`,
        name: spot.tags?.name || "Unnamed Fishing Spot",
        lat: spot.lat,
        lon: spot.lon,
      }));
    } catch (error) {
      console.error("Error fetching fishing spots from Overpass API:", error);
      return [];
    }
  };
  