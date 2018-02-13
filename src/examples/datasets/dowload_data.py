#!/usr/bin/env python

import wget
import csv
import os


def downloadIfNotExists(url, filename):
    try:
        if not os.path.exists(filename):
            print('downloading:', url)
            wget.download(url, filename)
        else:
            print(filename, 'already exists. skipping.')
    except:
        print("Failed downloading", url)

csvFilenames = [
    'AICS_Cell-feature-analysis_v1.5.csv',
    #'datasets/AICS_Cell-feature-analysis_v1.5_x2.csv',
    #'datasets/AICS_Cell-feature-analysis_v1.5_x10.csv',
    #'datasets/AICS_Cell-feature-analysis_v1.5_x100.csv'
]

for csvFilename in csvFilenames:
    csvURL = "http://homepage.univie.ac.at/a0929188/GlobalView/" + csvFilename
    downloadIfNotExists(csvURL, csvFilename)

    imageNames = set()
    imagesDirectory = './AICS_Cell-feature-analysis_v1.5_images/'

    with open(csvFilename, 'rt') as csvfile:
        print('Procesing', csvFilename)
        csvreader = csv.reader(csvfile, delimiter=',')
        next(csvreader, None)  # skip the headers
        if not os.path.exists(imagesDirectory):
            os.makedirs(imagesDirectory)
        for row in csvreader:
            imageName = row[1];
            if imageName not in imageNames:
                # imageName = imageName.replace(' ', '%20')
                # imageNames.add(imageName)
                imageURL = "http://homepage.univie.ac.at/a0929188/GlobalView/images/" + imageName + '.png'
                imageFilename = imagesDirectory + imageName + '.png'
                downloadIfNotExists(imageURL, imageFilename)
