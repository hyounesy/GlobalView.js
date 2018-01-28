import testRandomDataSet from './tests/testRandomDataset';
import testFormula from './tests/testFormula';
import testCsvDataSet from './tests/testCsvDataset';
import testCustomPointShape from './tests/testCustomPointShape';
import testCustomOptions from './tests/testCustomOptions';

const allTests = [
  testRandomDataSet,
  testCsvDataSet,
  testCustomOptions,
  testCustomPointShape,
  testFormula,
];

export default allTests;
