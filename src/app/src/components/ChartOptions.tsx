import React, { FC, useEffect, useState } from 'react';
import { Select, Button, Divider } from '@scuf/common';
import { EomApi, IotApi, mockApi, proxyApi } from '../util/requesting';
import { transformEomData, transformIotData } from '../util/dataTransorming';
import { mockLoading } from '../util/mockLoading';
import { userManager } from '../Auth/AuthRoutes';
import { Console } from 'console';

interface ChartOptionsProps {
  setTimeseriesData: (data: any[]) => void;
  loading: boolean;
  setLoading: (status: boolean) => void;
}
const ChartOptions: FC<ChartOptionsProps> = (props) => {
  const { setTimeseriesData, loading, setLoading } = props;
  const [eomData, setEomData] = useState<any[]>([]);
  const [gateways, setGateways] = useState<any[]>([]);
  const [pointLabels, setPointLabels] = useState<any[]>([]);
  const [gatewaySelection, setGatewaySelection] = useState<string>('');
  const [pointLabelSelection, setPointLabelSelection] = useState<string>('');

  useEffect(() => {
    const fetchPointsFromEOM = async () => {
      const { data } = await EomApi({
        url: '/fetchpoints',
        method: 'post',
        data: {
          query: `
          query{
            physicalPoints {
                timeSeriesIdInBMS
                label
                description
                gateway {
                    serverAddress
                }
            }
        }
            `,
        },
      });
      setLoading(false);
      const transformedData = transformEomData(data);
      setEomData(transformedData);
      console.log('Inside fetching EOM data');
    };
    setLoading(true);
    fetchPointsFromEOM();
  }, []);

  useEffect(() => {
    const gatewaysData = eomData.map((point) => point.serverAddress);
    const uniqueGatewaysData = new Set(gatewaysData);
    const gatewaysOptions = Array.from(uniqueGatewaysData).map((gateway) => ({
      value: gateway,
      text: gateway,
    }));
    setGateways(gatewaysOptions);
  }, [eomData]);

  useEffect(() => {
    const filteredEomData = eomData.filter(
      (point) => point.serverAddress === gatewaySelection
    );
    const filteredPointLabels = filteredEomData.map((point) => point.label);
    const pointLabelOptions = filteredPointLabels.map((deviceLabel, i) => ({
      value: i + 1,
      text: deviceLabel,
    }));
    setPointLabels(pointLabelOptions);
  }, [gatewaySelection]);

  const handleGatewaySelection = (selection: string) => {
    setPointLabelSelection('');
    setGatewaySelection(selection);
  };

  const handlePointLabelSelection = (selection: string) => {
    setPointLabelSelection(selection);
  };

  // const handleGetData = async () => {
  //   setLoading(true);
  //   await mockLoading();
  //   const { data } = await mockApi.get(`/iot/${pointLabelSelection}`);
  //   const transformedData = transformIotData(data.series);
  //   setTimeseriesData(transformedData);
  //   setLoading(false);
  // };

  /**
   * TODO:
   * 1. set the value for token. (line 79)
   * 2. For the "Get Data" Button onClick prop, replace handleGetData with handleGetProxy. (line 120)
   */
  const handleGetProxy = async () => {
    setLoading(true);
    const token = await userManager.getUser(); // get the token
    const accessToken = token!.access_token;
    const payload = {
      SystemGuid: '6efe9281-040a-4887-b299-723f8842897b',
      Ids: ['point1', 'point2'],
    };

    const { data } = await IotApi.post(
      `/api/pointhistory/lastvalue`,
      payload
      //reqConfig
    );
    console.log(data);
    const transformedData = transformIotData(data);
    setTimeseriesData(transformedData);
    setLoading(false);
  };

  return (
    <div className="options-section">
      <h3>Chart Options</h3>
      <div className="options-form">
        <Select
          className="gateway-selector"
          label="gateway"
          value={gatewaySelection}
          onChange={handleGatewaySelection}
          options={gateways}
        />
        <Select
          className="device-selector"
          label="device"
          options={pointLabels}
          value={pointLabelSelection}
          onChange={handlePointLabelSelection}
        />
        <Button
          disabled={!gatewaySelection || !pointLabelSelection || loading}
          onClick={handleGetProxy}
        >
          Get Data
        </Button>
      </div>
    </div>
  );
};

export default ChartOptions;
