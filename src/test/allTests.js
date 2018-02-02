import testRandomDataSet from './tests/testRandomDataset';
import testCsvDataSet from './tests/testCsvDataset';
import testCustomPointShape from './tests/testCustomPointShape';
import { testOptionPointColor, testOptionPointSize, testOptionColormapVisibility, testOptionTransparency, testOptionPointDensity, testOptionPointClusters, testOptionPadding, testOptionPointShape, testOptionPointOpacity } from './tests/testOptions';
import { testXAxisHistogram, testYAxisHistogram, testColormapHistogram, testNumHistogramBins, testHistogramHeight } from './tests/testHistogram';
import testThumbnails from './tests/testThumbnails';
import testFormula from './tests/testFormula';

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
