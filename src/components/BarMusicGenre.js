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

const transBarMusicGenre = (data) => {
    const result = {};

    data.forEach((item) => {
        const subplan = item.spotify_subscription_plan;
        const willingness = item.premium_sub_willingness;
        const key = `${subplan}-${willingness}`;
        const musicgenre = item.fav_music_genre;

        if (!result[key]) {
            result[key] = {
                'Melody': 0,
                'Pop': 0,
                'Classical & melody, dance': 0,
                'Rap': 0,
                'Rock': 0,
                'Old songs': 0,
                'All': 0,
                'Electronic/Dance': 0,
                'Kpop': 0,
                'trending songs random': 0,
                'classical': 0,
            };
        }

        if (musicgenre) {
            result[key][musicgenre] += 1;
        }
    });

    const convertToEChartsFormat = (data) => {
        return Object.keys(data).map(musicgenre => ({
            value: data[musicgenre],
            name: `${musicgenre}`
        }));
    };

    for (const key in result) {
        result[key] = convertToEChartsFormat(result[key]);
    }

    console.log('Transformed data:', result);

    return result;
}

const BarMusicGenre = ({ data }) => {
    const categories = [
        'Melody', 'Pop', 'Classical & melody, dance', 'Rap', 'Rock', 'Old songs', 
        'All', 'Electronic/Dance', 'Kpop', 'trending songs random', 'classical'
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
            '#FF6347', '#FFD700', '#FF4500', '#32CD32', '#00FA9A',
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

export { BarMusicGenre, transBarMusicGenre };
