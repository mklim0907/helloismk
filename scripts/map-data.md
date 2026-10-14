# Landscape map data

The three SVG basemaps use simplified Natural Earth 1:50m country geometry:
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Natural Earth data is public domain:
https://www.naturalearthdata.com/about/terms-of-use/

SVG viewports use a simple equirectangular projection, 720 × 460 units. Camera definitions in `app/lib/map-places.ts` must match the projected basemap assets in `public/maps/`.

Map locations are city/district centers from Wikidata, rather than the GPS coordinates of individual photographs:

- Tamsui: https://www.wikidata.org/wiki/Q570509
- Yilan: https://www.wikidata.org/wiki/Q680842
- Keelung: https://www.wikidata.org/wiki/Q249996
- Seoul: https://www.wikidata.org/wiki/Q8684
- Hangzhou: https://www.wikidata.org/wiki/Q4970
- Shanghai: https://www.wikidata.org/wiki/Q8686

`mapPlaces` links a location to an existing album by slug. The world and East Asia views group nearby Taiwan locations. The Taiwan view focuses on the northern area containing the current albums. Unmapped Landscape albums remain available beneath the map.

The browser loads local SVG assets only. No map API key or external tile service is required.
