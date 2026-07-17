// ==========================================
// 1. CONFIGURAZIONE AREA DI STUDIO (SUMATRA)
// ==========================================
var larghezza = 0.8809;
var altezza = 0.593068;
var xmin_sumatra = 101.5000;
var ymin_sumatra = 0.5000;

var sumatra_box = ee.Geometry.Rectangle([
  xmin_sumatra, 
  ymin_sumatra, 
  xmin_sumatra + larghezza, 
  ymin_sumatra + altezza
]);

Map.centerObject(sumatra_box, 9);
var bande_selezionate = ['B2', 'B3', 'B4', 'B8', 'B11'];

// ==========================================
// 2. ELABORAZIONE IMMAGINE 2015
// ==========================================
var s2_2015 = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(sumatra_box)
    .filterDate('2015-06-01', '2015-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var sumatra_raster_2015 = s2_2015.median().clip(sumatra_box);
var sumatra_finale_2015 = sumatra_raster_2015.select(bande_selezionate);

Map.addLayer(sumatra_finale_2015, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sumatra 2015');

// ==========================================
// 3. ELABORAZIONE IMMAGINE 2025
// ==========================================
var s2_2025 = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(sumatra_box)
    .filterDate('2025-06-01', '2025-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var sumatra_raster_2025 = s2_2025.median().clip(sumatra_box);
var sumatra_finale_2025 = sumatra_raster_2025.select(bande_selezionate);

Map.addLayer(sumatra_finale_2025, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sumatra 2025');

// ==========================================
// 4. ESPORTAZIONE DEI DUE RASTER SU DRIVE
// ==========================================
Export.image.toDrive({
  image: sumatra_finale_2015,
  description: 'Sumatra2015_Stessa_Estensione',
  scale: 10, 
  region: sumatra_box, 
  maxPixels: 1e13
});

Export.image.toDrive({
  image: sumatra_finale_2025,
  description: 'Sumatra2025_Stessa_Estensione',
  scale: 10, 
  region: sumatra_box, 
  maxPixels: 1e13
});
