// City / district centers, not the GPS locations of individual photographs.
// Coordinate sources: Wikidata Q570509, Q680842, Q249996, Q4970, Q8686.
export const mapPlaces = [
  { slug: "tamsui", name: "淡水", english: "Tamsui", longitude: 121.4333, latitude: 25.1667, region: "Taiwan" },
  { slug: "yilan", name: "宜蘭", english: "Yilan", longitude: 121.75, latitude: 24.75, region: "Taiwan" },
  { slug: "keelung", name: "基隆", english: "Keelung", longitude: 121.75, latitude: 25.1, region: "Taiwan" },
  { slug: "hangzhou", name: "杭州", english: "Hangzhou", longitude: 120.1675, latitude: 30.25, region: "China" },
  { slug: "shanghai", name: "上海", english: "Shanghai", longitude: 121.4692, latitude: 31.2325, region: "China" },
] as const;

export const mapViews = {
  world: { west: -180, north: 90, scale: 2, offsetY: 50, label: "世界", asset: "world" },
  east: { west: 102, north: 42, scale: 720 / 37, offsetY: 0, label: "東亞", asset: "east-asia" },
  taiwan: { west: 120.8, north: 25.7, scale: 720 / 1.9, offsetY: 0, label: "台灣", asset: "taiwan" },
};

export type MapView = keyof typeof mapViews;

export function projectPlace(longitude: number, latitude: number, view: MapView) {
  const camera = mapViews[view];
  return { x: (longitude - camera.west) * camera.scale, y: (camera.north - latitude) * camera.scale + camera.offsetY };
}
