import './App.css';
import '@scuf/common/honeywell/theme.css';
import '@scuf/charts/honeywell/theme.css';

import React, { useEffect, useState } from 'react';
import { Header, Card, Footer, Divider, Progress } from '@scuf/common';
import ChartOptions from './components/ChartOptions';
import DeviceChart from './components/DeviceChart';
import { mockApi } from './util/requesting';
import { transformIotData } from './util/dataTransorming';

const App = () => {
  const [timeseriesData, setTimeseriesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="page">
      <Header title="Forge Bootcamp" menu={false} />
      <div className="loading-indicator">
        {loading && <Progress />}
      </div>
      <Card className="content">
        <ChartOptions
          setTimeseriesData={setTimeseriesData}
          {...{ loading, setLoading }}
        />
        <Divider />
        <DeviceChart data={timeseriesData} />
      </Card>
      <Footer />
    </div>
  );
};

export default App;
