Exam project title: title
Data gathering
Data were gathered from the Earth Observatory site.

Packages used:

library(terra)
library(imageRy)
library(viridis) # in order to plot images with different viridis color ramp palettes
Setting the working directory and importing the data:

setwd("~/Desktop/")
fires = rast("fires.jpg")
plot(fires)
fires = flip(fires)
plot(fires)
The image is the following:

fires

Data analysis
Based on the data gathered from the site we can calculate an index, using the first two bands:

fireindex = fires[[1]] - fires[[2]]
plot(fireindex)
In order to export the index, we can use the png() function like:

png("fireindex.png")
plot(fireindex)
dev.off()
The index looks like:

fireindex

Index visualisation by viridis
In order to visualize the index with another viridis palette we made use of the following code:

plot(fireindex, col=inferno(100))
The output will look like:

inferno

Correlation of bands
Since the RGB is composed by visible bands, a high correlation is expected:

pairs(dust)
This is also graphically apparent:

pairsout
