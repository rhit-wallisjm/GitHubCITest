/*
 * @format
 */

import 'react-native';

import {it, expect} from '@jest/globals';
import {
  addBloodPressure,
  getBloodPressure,
} from '../BackEndFunctionCall/bloodPressureFunction';
import timeTableParser from '../BackEndFunctionCall/tableTimeParser';

// Add Blood Pressure test

it('Adds and Gets Blood Pressure', async () => {
  const startDateTime: string = new Date().toISOString();
  await addBloodPressure(300000001, 120, 80, true).then(output => {
    expect(output).toBe('add successful');
  });
  const stopDateTime: string = new Date().toISOString();

  await getBloodPressure(300000001, startDateTime, stopDateTime).then(
    output => {
      expect(output).toStrictEqual([[timeTableParser(startDateTime), 120, 80]]);
    },
  );
});

it('Add to Blood Pressure Failure Test', async () => {
  await addBloodPressure(999999999, 121, 81, true).catch(output => {
    expect(output).toBe('failed to add blood pressure');
  });
});

it('Get Blood Oxygen Failure Test', async () => {
  const startDateTime: string = new Date().toISOString();
  const stopDateTime: string = new Date().toISOString();
  await getBloodPressure(999999999, startDateTime, stopDateTime).then(
    output => {
      expect(output).toStrictEqual([]);
    },
  );
});
