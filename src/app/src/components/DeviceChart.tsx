import { TimeSeries } from '@scuf/charts';
import React, { FC } from 'react';

interface DeviceChartProps {
  data: any[];
}
const DeviceChart: FC<DeviceChartProps> = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <TimeSeries>
      <TimeSeries.Line name="demo" data={data} />
    </TimeSeries>
  );
};

export default DeviceChart;
