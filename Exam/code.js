// Immagine satellitare 2025 borneo.tif 

// Filtro per le immagini del 2015 (Anno di forte ENSO)
var dataset2015 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
  .filterBounds(roi)
  .filterDate('2015-07-01', '2015-10-31') // Stagione secca
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .median();

// Filtro per le immagini del 2025
var dataset2025 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
  .filterBounds(roi)
  .filterDate('2024-06-01', '2025-10-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .median();

// Selezione delle bande: B2(Blue), B3(Green), B4(Red), B8(NIR), B11(SWIR)
var bands = ['B2', 'B3', 'B4', 'B8', 'B11'];
var image2015 = dataset2015.select(bands);
var image2025 = dataset2025.select(bands);

// Esportazione su Google Drive (2015)
Export.image.toDrive({
  image: image2015,
  description: 'Borneo2015',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});

// Esportazione su Google Drive (2025)
Export.image.toDrive({
  image: image2025,
  description: 'Borneo2025',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});
