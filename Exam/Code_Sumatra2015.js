// =================================================================
// ESTRAZIONE DATI SUMATRA (Coerente con i filtri del Borneo)
// =================================================================

// 1. Area di interesse di Sumatra (Bukit Tigapuluh / Jambi)
var roi = ee.Geometry.Polygon(
  [[[102.3, -1.2],
    [102.7, -1.2],
    [102.7, -0.8],
    [102.3, -0.8]]]
);

// 2. Filtro per le immagini storiche di Sumatra (stesso periodo del Borneo)
var dataset2015 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                  .filterBounds(roi)
                  .filterDate('2015-07-01', '2015-10-31') 
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .median();

// 3. Filtro per le immagini recenti di Sumatra (stesso periodo del Borneo)
var dataset2025 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                  .filterBounds(roi)
                  .filterDate('2024-06-01', '2025-10-31')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .median();

// 4. Selezione bande identiche
var bands = ['B2', 'B3', 'B4', 'B8', 'B11'];
var image2015 = dataset2015.select(bands);
var image2025 = dataset2025.select(bands);

// 5. Esportazione su Google Drive con i nomi puliti
Export.image.toDrive({
  image: image2015,
  description: 'Sumatra2015_Clean',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: image2025,
  description: 'Sumatra2025_Clean',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});
