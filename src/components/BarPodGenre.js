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

const transBarPodGenre = (data) => {
    const result = {};

    data.forEach((item) => {
        const subplan = item.spotify_subscription_plan;
        const willingness = item.premium_sub_willingness;
        const key = `${subplan}-${willingness}`;
        const genre = item.fav_pod_genre;

        if (!result[key]) {
            result[key] = {
                'Comedy': 0,
                'Sports': 0,
                'Lifestyle and Health':0,
                'Business': 0,
                'Food and cooking': 0,
                'Health and Fitness': 0,
                'None': 0,
                'Everything': 0,
                'Technology': 0,
                'Informative stuff': 0,
                'Educational ': 0,
                'Self help': 0,
                'Spiritual and devotional': 0,
                'Dance and Relevant cases ': 0,
                'Political, informative, topics that interests me': 0,
                'Murder Mystery ': 0,
                'Stories ': 0,
                'Finance related and current affairs': 0,
                'General knowledge ': 0,
                'Novels': 0,
            };
        }

        if (genre) {
            result[key][genre] += 1;
        }
    });

    const convertToEChartsFormat = (data) => {
        return Object.keys(data).map(podgenre => ({
            value: data[podgenre],
            name: `${podgenre}`
        }));
    };

    for (const key in result) {
        result[key] = convertToEChartsFormat(result[key]);
    }

    console.log('Transformed data:', result);

    return result;
}

const BarPodGenre = ({ data }) => {
    const categories = [
        'Comedy', 'Sports', 'Lifestyle and Health', 'Business', 'Food and cooking', 
        'Health and Fitness', 'None', 'Everything', 'Technology', 'Informative stuff', 
        'Educational ', 'Self help', 'Spiritual and devotional', 
        'Dance and Relevant cases ', 'Political, informative, topics that interests me', 
        'Murder Mystery ', 'Stories ', 'Finance related and current affairs', 
        'General knowledge ', 'Novels'
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
            const genreData = data[key].find(item => item.name === category);
            const value = genreData ? genreData.value : 0;
            const total = totalCounts[key] || 1;
            return (value / total) * 100;
        })
    }));

    const getOption = () => ({
        color: [
            '#FF6347', '#FF4500', 
            '#FFD700', '#32CD32', '#00FA9A',
            '#1E90FF', '#8A2BE2', '#FF69B4', '#FF1493', '#FF8C00',
            '#9370DB', '#ADFF2F', '#20B2AA', '#87CEEB', '#DAA520',
            '#FF7F50', '#7FFF00', '#FF00FF', '#FFB6C1', '#C71585',
            '#F4A460',
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'
            },
            formatter: (params) => {
                let tooltipContent = '';
                params.forEach(item => {
                    const value = item.value.toFixed(2);
                    if (value > 0) { 
                        tooltipContent += `${item.marker}${item.seriesName}: ${value}%<br/>`;
                    }
                });
                return tooltipContent;
            }
        },
        legend: {
            data: legendData,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '15%',
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
            style={{ height: '70vh', width: '50vw' }}
        />
    );
};

export { BarPodGenre, transBarPodGenre };
