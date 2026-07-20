// Immagine borneo .tif 2016 

// Filtro per le immagini storiche (Usiamo il 2016, picco dell'El Nino)
var dataset2015 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
                 .filterBounds(roi)
                 .filterDate('2016-01-01', '2016-12-31') 
                 .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                 .median();

var bands = ['B2', 'B3', 'B4', 'B8', 'B11'];
var image2015 = dataset2015.select(bands);

// Esportazione su Google Drive (Storico)
Export.image.toDrive({
  image: image2015,
  description: 'Borneo2015',
  scale: 10,
  region: roi,
  maxPixels: 1e13
});
