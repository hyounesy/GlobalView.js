import testRandomDataSet from './testRandomDataset';
import testCsvDataSet from './testCsvDataset';
import testCustomPointShape from './testCustomPointShape';
import { testOptionPointColor, testOptionPointSize, testOptionColormapVisibility, testOptionTransparency, testOptionPointDensity, testOptionPointClusters, testOptionPadding, testOptionPointShape, testOptionPointOpacity } from './testOptions';
import { testXAxisHistogram, testYAxisHistogram, testColormapHistogram, testNumHistogramBins, testHistogramHeight } from './testHistogram';
import testThumbnails from './testThumbnails';
import testFormula from './testFormula';

const allTests = [
  testRandomDataSet,
  testCsvDataSet,
  testOptionPointColor,
  testOptionPointSize,
  testOptionColormapVisibility,
  testOptionTransparency,
  testOptionPointDensity,
  testOptionPointClusters,
  testOptionPadding,
  testOptionPointShape,
  testOptionPointOpacity,
  testXAxisHistogram,
  testYAxisHistogram,
  testColormapHistogram,
  testNumHistogramBins,
  testHistogramHeight,
  testCustomPointShape,
  testThumbnails,
  testFormula,
];

export default allTests;
