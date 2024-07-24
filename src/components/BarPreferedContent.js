import React from "react";
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
} from 'echarts/components';
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";

echarts.use([
    DatasetComponent,
    TooltipComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
    TitleComponent,
    GridComponent,
]);

const transBarPreferedContent = (data) => {
    const result = {};

    data.forEach((item) => {
        const subplan = item.spotify_subscription_plan;
        const willingness = item.premium_sub_willingness;
        const key = `${subplan}-${willingness}`;
        const content = item.preferred_listening_content;

        if (!result[key]) {
            result[key] = {
                'Music': 0,
                'Podcast': 0,
            };
        }

        if (content) {
            result[key][content] += 1;
        }
    });

    const convertToEChartsFormat = (data) => {
        return Object.keys(data).map(content => ({
            value: data[content],
            name: `${content}`
        }));
    };

    for (const key in result) {
        result[key] = convertToEChartsFormat(result[key]);
    }

    console.log('Transformed data:', result);

    return result;
}

const BarPreferedContent = ({ data }) => {
    const categories = [
        'Music', 'Podcast'
    ];
    const legendData = categories;

    const totalCounts = Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].reduce((sum, item) => sum + item.value, 0);
        return acc;
    }, {});

    const series = legendData.map(category => ({
        name: category,
        type: 'bar',
        stack: 'total',
        label: {
            show: false,
        },
        data: Object.keys(data).map(key => {
            const contentData = data[key].find(item => item.name === category);
            const value = contentData ? contentData.value : 0;
            const total = totalCounts[key] || 1;
            return (value / total) * 100;
        })
    }));

    const getOption = () => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'
            },
            formatter: (params) => {
                let tooltipContent = '';
                params.forEach(item => {
                    const value = item.value.toFixed(2); // Format to 2 decimal places
                    if (value > 0) { 
                        tooltipContent += `${item.marker}${item.seriesName}: ${value}%<br/>`;
                    }
                });
                return tooltipContent;
            }
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: Object.keys(data),
            axisLabel: {
                rotate: 20, 
                fontSize: 12,
                margin: 10
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} %'
            },
            max: 100 
        },
        series: series
    });

    return (
        <ReactEChartsCore 
            echarts={echarts} 
            option={getOption()} 
            style={{ height: '50vh', width: '50vw' }}
        />
    );
};

export { BarPreferedContent, transBarPreferedContent };