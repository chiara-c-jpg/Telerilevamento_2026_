
// =================================================================
// ESTRAZIONE SUMATRA DEFINITIVA (Stessa area e griglia del Borneo)
// =================================================================

// 1. Area di interesse (stessa dimensione geometrica del Borneo)
var roi = ee.Geometry.Polygon(
  [[[102.3, -1.2],
    [102.7, -1.2],
    [102.7, -0.8],
    [102.3, -0.8]]]
);

Map.centerObject(roi, 10);
Map.addLayer(roi, {color: 'red'}, 'ROI Sumatra');

// 2. Immagine 2015 (Stagione secca)
var dataset2015 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                  .filterBounds(roi)
                  .filterDate('2015-07-01', '2015-10-31')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .median();

// 3. Immagine 2025
var dataset2025 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                  .filterBounds(roi)
                  .filterDate('2024-06-01', '2025-10-31')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                  .median();

// 4. Selezione delle stesse bande (B2, B3, B4, B8, B11)
var bands = ['B2', 'B3', 'B4', 'B8', 'B11'];
var image2015 = dataset2015.select(bands);
var image2025 = dataset2025.select(bands);

// 5. Esportazione su Google Drive (2015)
Export.image.toDrive({
  image: image2015,
  description: 'sumatra2015',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});

// 6. Esportazione su Google Drive (2025)
Export.image.toDrive({
  image: image2025,
  description: 'sumatra2025',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});
