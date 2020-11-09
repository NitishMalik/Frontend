export const transformIotData = (data: any) => {
  const { points } = data;
  return points.map((point: any, index: number) => {
    const pointDate = new Date(point.sampleTime);
    const newDate = new Date(pointDate.getTime() + index * 6000);
    // const pointTimestamp = Number(pointDate.getTime());
    return [newDate.getTime(), Math.floor(point.doubleValue)];
  });
};

export const transformEomData = (data: any) => {
  const { physicalPoints } = data.data;
  const transformedData = physicalPoints
    .filter((x: { gateway: any }) => x.gateway)
    .map((point: any) => ({
      serverAddress: point.gateway.serverAddress,
      label: point.label,
    }));
  return transformedData;
};
