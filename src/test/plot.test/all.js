import TestRandomDataSet from './testRandomDataset';
import TestCsvDataSet from './testCsvDataset';
import TestCustomPointShape from './testCustomPointShape';
import { TestOptionPointColor, TestOptionPointSize, TestOptionColormapVisibility, TestOptionTransparency, TestOptionPointDensity, TestOptionPointClusters, TestOptionPadding, TestOptionPointShape, TestOptionPointOpacity } from './testOptions';
import { TestXAxisHistogram, TestYAxisHistogram, TestColormapHistogram, TestNumHistogramBins, TestHistogramHeight } from './testHistogram';
import TestThumbnails from './testThumbnails';
import TestFormula from './testFormula';

const allTests = [
  TestRandomDataSet,
  TestCsvDataSet,
  TestOptionPointColor,
  TestOptionPointSize,
  TestOptionColormapVisibility,
  TestOptionTransparency,
  TestOptionPointDensity,
  TestOptionPointClusters,
  TestOptionPadding,
  TestOptionPointShape,
  TestOptionPointOpacity,
  TestXAxisHistogram,
  TestYAxisHistogram,
  TestColormapHistogram,
  TestNumHistogramBins,
  TestHistogramHeight,
  TestCustomPointShape,
  TestThumbnails,
  TestFormula,
];

export default allTests;
