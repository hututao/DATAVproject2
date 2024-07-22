import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';
import data from '../data/dataset.json'; 

const processData = (category) => {
  const categories = ['free-yes', 'free-no', 'prem-yes', 'prem-no'];
  const categoryData = {
    'free-yes': {},
    'free-no': {},
    'prem-yes': {},
    'prem-no': {},
  };

  data.forEach((entry) => {
    const subscriptionPlan = entry['spotify_subscription_plan'];
    const willingness = entry['premium_sub_willingness'];
    const categoryKey = subscriptionPlan === 'Free (ad-supported)' ? `free-${willingness.toLowerCase()}` : `prem-${willingness.toLowerCase()}`;
    const value = entry[category];

    if (!categoryData[categoryKey][value]) {
      categoryData[categoryKey][value] = 0;
    }
    categoryData[categoryKey][value] += 1;
  });

  const seriesData = categories.map((cat) => ({
    name: cat,
    data: Object.values(categoryData[cat])
  }));

  const xAxisData = Object.keys(categoryData['free-yes']);

  return { seriesData, xAxisData };
};

const BarChart = ({ category, onHover }) => {
  const chartRef = useRef(null);
  const { seriesData, xAxisData } = processData(category);

  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: { data: ['free-yes', 'free-no', 'prem-yes', 'prem-no'] },
    xAxis: [{ type: 'category', data: xAxisData }],
    yAxis: [{ type: 'value' }],
    series: seriesData.map((series) => ({
      name: series.name,
      type: 'bar',
      data: series.data,
      emphasis: { focus: 'series' },
    }))
  });

  return (
    <Paper elevation={3} sx={{ padding: 'px', height: '30vh', width: '66vw' }}>
      <Typography variant="h6">Bar Chart</Typography>
      <ReactECharts
        ref={chartRef}
        option={getOption()} 
        style={{ height: '100%', width: '100%' }}
        onEvents={{
          'mouseover': (params) => onHover(params),
          'mouseout': () => onHover(null)
        }}
      />
    </Paper>
  );
};

export default BarChart;

