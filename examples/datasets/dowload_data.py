#!/usr/bin/env python

import wget
import csv
import os

csvFilename = 'AICS_Cell-feature-analysis_v1.5.csv'
csvURL = "http://homepage.univie.ac.at/a0929188/GlobalView/" + csvFilename
wget.download(csvURL, "./")

imageNames = set()

with open(csvFilename, 'rt') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    next(csvreader, None)  # skip the headers
    for row in csvreader:
        imageName = row[1];
        if imageName not in imageNames:
            # imageName = imageName.replace(' ', '%20')
            imageNames.add(imageName)
            try:
                imageURL = "http://homepage.univie.ac.at/a0929188/GlobalView/images/" + imageName + '.png'
                imageFilename = './images/' + imageName + '.png'
                print('downloading:', )
                if not os.path.exists(imageFilename):
                    wget.download(imageURL, imageFilename)
                else:
                    print(imageFilename, 'already exists. skipping.')
            except:
                print("Failed downloading", imageURL)
