
```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
```
#### Chiara Tattini
#### Matricola n.

# Analisi dello stress fisiologico ed idrico nelle foreste del Borneo, in risposta a coltivazioni di palma da olio Elaeis guineensis (2015-2025)

---
## 1. Introduzione📌

Uno dei principali fenomeni di cambiamento nell’utilizzo del suolo nel sud-est asiatico è rappresentato dalla conversione su vasta scala delle foreste tropicali e delle torbiere in terreni agricoli a monocoltura di palma da olio (*Elaeis guineensis*).
Questo studio si focalizza sulla porzione meridionale dell'isola del Borneo, in particolare dellla regione Kalimantan, dove gli effetti prodotti dal cambiamento nell'uso del suolo (*land use change*) si sono sommati ad uno dei più significativi eventi climatici di stress idrico:"El Niño-Southern Oscillation" (ENSO), il cui apice si è verificato nel 2016.
Il periodo analizzato consente di valutare la capacità di resilienza dell’ecosistema forestale in risposta, da un lato ai cicli di eventi climatici dell’ENSO e, dall’altro, dall’impatto antropico legato alla standardizzazione monocolturale.
La transizione da foresta primaria a piantagione monocolturale determina un impatto ecologico ed erosivo accelerato dal clima pantropicale del sud-est asiatico, esponendo il territorio a fluttuazioni climatiche date dall’alternarsi tra siccità stagionale e precipitazioni monsoniche.
Queste ultime influiscono sull’erosione del terreno, privato di copertura arborea e quindi di apparati radicali coinvolti nella ritenzione idrica del suolo.

---
## 2. Obiettivi del progetto🎯 

Mappare l'area prese in esame in relazione ai cambiamenti di copertura forestale per verificare lo stato di integrità della vegetazione perseguendo i seguenti punti:
1)	Identificare e quantificare la perdita di copertura forestale in relazione al cambiamento nell’utilizzo del suolo a scopo monocolturale
2) Rilevare i cambiamenti di densità vegetazionale per definire le aree soggette a deforestazione rispetto alla foresta primaria 
2)	Valutare lo stress fisiologico di salute della copertura vegetale mediante indici di biomassa normalizzati (NDVI)
3)	Analizzare la risposta allo stress idrico accentuato dall’evento climatico ENSO tramite indici di umidità fogliare e del suolo (NDMI)

---
## 3. Metodi ed dati satellitari 🛰️
Nella seguente analisi multitemporale sono state impiegate immagini satellitari Sentinel-2 ESA, ottenute da [Google Earth Engine](https://earthengine.google.com/). Rispetto a satelliti come Lansat (risoluzione 30 m), Sentinel-2 consente una risoluzione maggiore fino a 10m per le bande del visisbile e del vicino infrarosso (NIR). La Roi (Region of Interest) comprende l'area meridioale del Borneo di Kalimantan.

Gli indici spettrali impiegati nello studio della vegetazione sono i seguenti:

### DVI (Difference Vegetation Index)
Calcola la diffrenza lineare tra la banda del vicino infrarosso e quella del rosso.

$$DVI=NIR-RED$$

### NDVI (Normalized Difference Vegetation Index) 
Valuta la  biomassa e la densità della chioma consentendo di evidenziare le aree che hanno subito deforestazione a favore delle piantagioni di Elaeis guineensis.

$$NDVI=\frac{(NIR-RED)}{(NIR+RED)}$$

### NDMI (Normalized Difference Moisture Idex)  
Consente valutare lo stess idrico tramite un confronto tra il vicino infrarosso (NIR) e l’infrarosso a corto raggio (SWIR, Banda 11). 

$$NDMI=\frac{(NIR-SWIR)}{(NIR+SWIR)}$$

---
## 4. Raccolta immagini🌍
Le immagini sono state scaricate tramite codice Java Script allegato, tramite il sito [Google Earth Engine](https://earthengine.google.com/)

---
## 5.Raccolta dati

### Impostazione della directory di lavoro
setwd("C:/Users/chiar/Desktop/immagini satellitari Borneo")

### Controllare che le immagini siano salvate nella directory di lavoro 
list.files()

### Apertura dei pacchetti R precedentemente installati
library(terra)
library(imageRy)
library(viridis)
library(ggplot2)
library(patchwork)

---
### Caricamento raster Sentinel-2 (2015 e 2025) acquisiti nello stesso periodo stagionale
borneo2015<-rast("C:/Users/chiar/Desktop/immagini satellitari Borneo/Borneo2015.tif") 
borneo2025<-rast("C:/Users/chiar/Desktop/immagini satellitari Borneo/Borneo2025.tif") 

---
### Definizione palette imageRy in cui "red" indica la perdita di vegetazione e "blu" il guadagno.
cl_diff<-colorRampPalette(c("red","white","blue"))((100))

---
### Realizzazione di un pannello per accostare le due immagini.
im.multiframe(1,2)
plotRGB(borneo2015, r="B4", g="B3", b="B2", stretch="lin", main="Borneo2015 (True Color)")
plotRGB(borneo2025, r="B4", g="B3", b="B2", stretch="lin", main="Borneo2025 (True Color)")


---
### Sostituendo il NIR (B8) al posto del rosso
par(mfrow=c(1,1))
plotRGB(borneo2015,r="B8",g="B4",b="B3",stretch="lin",main="Borneo,2015, False Color NIR)")
plotRGB(borneo2025,r="B8",g="B4",b="B3",stretch="lin",main="Borneo,2015, False Color NIR)")

---
### visualizzazionen suddivisa per le quattro bande per l'anno 2015
im.multiframe(1,2)
plot(Borneo2015[["B4"]], main="B4 - Rosso 2015", col= magma(100))
plot(Borneo2015[["B3"]], main="B4 - Verde 2015", col= magma(100))
plot(Borneo2015[["B2"]], main="B4 - Blu 2015", col= magma(100))
plot(Borneo2015[["B1"]], main="B4 - NIR 2015", col= magma(100))

### visualizzazione separata delle quattro bande per il 2025
im.multiframe(1,2)
plot(Borneo2025[["B4"]], main="B4 - Rosso 2025", col= magma(100))
plot(Borneo2025[["B3"]], main="B4 - Verde 2025", col= magma(100))
plot(Borneo2025[["B2"]], main="B4 - Blu 2025", col= magma(100))
plot(Borneo2025[["B1"]], main="B4 - NIR 2025", col= magma(100))

#### reset pannello grafico singolo
im.multiframe(1,1)

---
## 6.Analisi DVI (Difference Vegetation INDEX)

### Calcolo DVI per il 2015 e il 2025
dvi2015<-borneo2015[["B8"]]-borneo2015[["B4"]]
dvi2025<-borneo2025[["B8"]]-borneo2025[["B4"]]

### Calcolo la diffrenza DVI per quantificare la peridita di vegetazione 
dvi_diff<-dvi2015-dvi2025

### Impostazione un unico schermo
par(mfrow=c(1,1))

### Grafico della differenza
#il rosso indica dove il vigore vegetativo è signfcativamente calato,
#il bianco le aree stabili, mentre il blu il leggero aumento di ricrescita stagionale
plot(dvi_diff,col=cl_diff,main="Differenza DVI(2015-2025)")

### Calcolo NDVI 2015 e 2025 tramite i numeri delle bande 8=NIR , 4=Rosso
ndvi2015<-(borneo2015[["B8"]]-borneo2015[["B4"]])/(borneo2015[["B8"]]+borneo2015[["B4"]])
ndvi2025<-(borneo2025[["B8"]]-borneo2025[["B4"]])/(borneo2025[["B8"]]+borneo2025[["B4"]])

### Calcolo della differenza NDVI 
ndvi_difference<-ndvi2015-ndvi2025

### Impostazione di un solo schermo per i due NDVI accostati
par(mfrow=c(1,2))

### Plot della differenza normalizzita (NDVI) affiancati
plot(ndvi2015, col=viridis(100),main="NDVI 2015")
plot(ndvi2025, col=viridis(100),main="NDVI 2025")

---
## 7. Analisi NDMI (stess idrico e impatto dell'ENSO)

### Calcolo NDMI 2015 2025 
ndmi2015<-(borneo2015[["B8"]]-borneo2015[["B11"]])/(borneo2015[["B8"]]+borneo2015[["B11"]])
ndmi2025<-(borneo2025[["B8"]]-borneo2025[["B11"]])/(borneo2025[["B8"]]+borneo2025[["B11"]])

### Calcolo la diffrenza NDVI per quantificare la peridita di vegetazione 
ndmi_diff<-ndmi2015-ndmi2025

### Plot della differenza Normalizzata NDMI
#### Le aree blu indicano valori pos dell'NDMI, quindi la perdita di umidità nella vetazione tra IL 2015 ed il 2025.
#### Le aree rosse indicano valori negativi delL'indice NDMI l'aumneto di umidità nella vegetazione condizionata dall'ENSO.
#### Le aree bianche indicano dove il livello di NDMI è rimasto invariato.
im.multiframe(1,1)
plot(ndmi_diff,col=cl_diff,main="Variazione dello stress idrico NDMI (2015-2025)")

---
## 8. Classificazione delle aree vegetazionali : raggruppamento dei pixel con stessa firma spettrale in categorie

### Matrice di classificazione basata sull'NDVI e determinati limiti 
matrice_class<-matrix(c(
 -Inf,0.4, 1, #Classe 1:Suolo nudo/Deforestazione rec
   0.4,0.7, 2, #Classe 2:Piantagioni
   0.7,Inf, 3 #Classe 3: Foresta primaria intatta
),ncol = 3, byrow = TRUE)

### Classificazione sulla base di NDVI
ndvi2015_class<-classify(ndvi2015, matrice_class)
ndvi2025_class<-classify(ndvi2025, matrice_class)

colori_classi<-c("red", "yellow","darkgreen")

### Visualizzazione plot accostati
##### il rosso indica il suolo privo di vegetazione a causa della deforestazione
##### il giallo, colore dominante, corrisponde alle piantagioni di palma da olio 
##### il verde scuro evidenzia a frammentazione della foresta primaria in aree localizzate
par(mfrow=c(1,2))
plot(ndvi2015_class, col=colori_classi, main="Classificazione 2015")
plot(ndvi2025_class, col=colori_classi, main="Classificazione 2025")

#### Reset finestra grafica
par(mfrow(c=(1,1)) 

---
## 9.Analisi statistica e multitemporale
### Calcolo frequenze
freq_2015<-freq(ndvi2015_class)
freq_2025<-freq(ndvi2025_class)

### Calcolo percentuali
perc_2015<-freq_2015$count* 100/ncell(ndvi2015_class)
perc_2025<-freq_2025$count* 100/ncell(ndvi2025_class)

tabella_classi<-data.frame(
 Classe=c("Suolo Nudo","Piantagioni","Foresta Primaria")
 Anno_2015=round(perc_2015,2)
 Anno_2025=round(perc_2025,2)
)
print(tabella_classi))

### Realizzazione di grafici a barre tramite il pacchetto ggplot2
p1<-ggplot(tabella_classi, aes(x=Classe, y=Anno_2015, fill=Classe))+ geom_bar(stat="identity") + scale_fill_manual(values=colori_classi) + ylim(0,100 )+
ggtitle("Copertura suolo-2015") + theme(axis.text.x=element_text(angle=45, hjust=1))
p2<-ggplot(tabella_classi, aes(x=Classe, y=Anno_2025, fill=Classe))+ geom_bar(stat="identity") + scale_fill_manual(values=colori_classi) + ylim(0,100 )+
ggtitle("Copertura suolo-2025") + theme(axis.text.x=element_text(angle=45, hjust=1))

### Unione dei grafici con il patchwork
grafico_finale<-p1+p2
print(grafico_finale)

---
#### 8.Analisi Multitemporale 





---
## 9.Limiti dell'analisi
Nonostante la precisione delle immagini Sar-Sentinel 2, l'analisi può essere influenzata sia dalla copertura nuvolosa del Borneo che può falsare la riflettanza, sia dalla risoluzione temporale, in quanto, un'unica immagine per anno non consente di prevedere il fenomeno a livello stagionale.
Inoltre, a livello di risoluzione spaziale, sebbene la risoluzione spaziale di 10 metri di ciascun pixel sia esaustiva, in foreste particolarmente frammentate il fenomeno del "mixel pixel" può renedere difficile in alcuni casi la distinzione tra foresta primaria e piantagioni.

## 10.il contributo al telerilevamento



---
## 10.Conclusione e possibili sviluppi futuri 
Dagli elevati valori di NDVI e NDMI è possibile dedurre che nel 2015 le foreste originariamente ampiamente diffuse, abbiano subito una severa frammentazione e un forte decremento di estensione nel decennio 2015-20120.
Inoltre, l'uso combinato degli indici spettrali, ha permesso evidenziare come l'intera area, sottoposta ad una transformazione nell'utilizzo del suolo a scopo agricolo, sia stata sottoposta a stress ecologici ed antropici che hanno rivoluzionato il territorio. 
La riduzione dei valori di NDMI indica copertura vegetale sottoposta a stress idrico, periodicamente influenzata dai cicli meteorologici di siccità dell’ENSO e condizionata dalla degradazione del suolo.
Questa frammantazione dell'ecosistema forestale compromette l'integrità degli habitat locali ed implica la necessità di stabilire strategie di monitraggio dell'area interessata ed sulla diversità biologica delle aree connesse. 
Un ulteriore sviluppo di tale progetto potrebbe includere uno studio comparativo con immagini satellitari della provincia di Riau, a Sumatra, al fine di valutare il grado di similiarità tra pattern ecologici di aree diverse (dinamiche di stress idrico e frammentazione dell'areale forestale), in relazione a variazioni della ritenzione idrica del suolo, in funzione dell'eterogeneità pedogenetica del substrato.
