import testRandomDataSet from './tests/testRandomDataset';
import testFormula from './tests/testFormula';
import testCsvDataSet from './tests/testCsvDataset';
import testCustomPointShape from './tests/testCustomPointShape';
import { testOptionPointColor, testOptionPointSize, testOptionColormapVisibility, testOptionTransparency, testOptionPointDensity, testOptionPointClusters, testOptionPadding, testOptionPointShape, testOptionPointOpacity } from './tests/testOptions';

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
  testCustomPointShape,
  testFormula,
];

export default allTests;
