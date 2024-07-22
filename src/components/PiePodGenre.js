import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts/core';
import {
    DatasetComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent
} from 'echarts/components';
import { PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import ReactEChartsCore from "echarts-for-react/lib/core";

echarts.use([
    DatasetComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    TitleComponent
]);

const transPodGenre = (data) => {
    const result = {};

    data.forEach((item) => {
        const subplan = item.spotify_subscription_plan;
        const willingness = item.premium_sub_willingness;
        const key = `${subplan}-${willingness}`;
        const podgenre = item.fav_pod_genre;

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

        if (podgenre) {
            result[key][podgenre] += 1;
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

    return result;
}

const PiePodGenre = ({ data, highlightedCategory }) => {
    const chartRef = useRef(null);

    const getOption = () => ({
        color: [
            '#FF6347', '#FF4500', '#FFD700', '#32CD32', '#00FA9A',
            '#1E90FF', '#8A2BE2', '#FF69B4', '#FF1493', '#FF8C00',
            '#DAA520', '#ADFF2F', '#20B2AA', '#87CEEB', '#9370DB',
            '#FF7F50', '#7FFF00', '#FF00FF', '#FFB6C1', '#C71585',
            '#F4A460',
        ],
        legend: {},
        tooltip: {},
        title: [
            {
                text: 'Free (ad-supported) - Yes',
                left: '18%',
                top: '45%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
            {
                text: 'Free (ad-supported) - No',
                left: '63%',
                top: '45%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
            {
                text: 'Premium (paid subscription) - Yes',
                left: '15%',
                top: '85%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
            {
                text: 'Premium (paid subscription) - No',
                left: '60%',
                top: '85%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
        ],
        series: [
            {
                type: 'pie',
                radius: '20%',
                center: ['25%', '30%'],
                data: data["Free (ad-supported)-Yes"],
                label: { show: false },
                labelLine: { show: false }
            },
            {
                type: 'pie',
                radius: '20%',
                center: ['70%', '30%'],
                data: data["Free (ad-supported)-No"],
                label: { show: false },
                labelLine: { show: false }
            },
            {
                type: 'pie',
                radius: '20%',
                center: ['25%', '70%'],
                data: data["Premium (paid subscription)-Yes"],
                label: { show: false },
                labelLine: { show: false }
            },
            {
                type: 'pie',
                radius: '20%',
                center: ['70%', '70%'],
                data: data["Premium (paid subscription)-No"],
                label: { show: false },
                labelLine: { show: false }
            },
        ]
    });

    useEffect(() => {
        const chart = chartRef.current?.getEchartsInstance();

        if (chart && highlightedCategory) {
            const dataIndexMap = {
                'Free (ad-supported)-Yes': 0,
                'Free (ad-supported)-No': 1,
                'Premium (paid subscription)-Yes': 2,
                'Premium (paid subscription)-No': 3
            };

            for (const [key, dataIndex] of Object.entries(dataIndexMap)) {
                const seriesData = data[key];
                const dataIndexToHighlight = seriesData.findIndex(item => item.name === highlightedCategory);
                if (dataIndexToHighlight !== -1) {
                    chart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: dataIndex,
                        dataIndex: dataIndexToHighlight
                    });
                }
            }
        } else {
            chart?.dispatchAction({
                type: 'downplay'
            });
        }
    }, [highlightedCategory, data]);

    return (
        <ReactEChartsCore 
            echarts={echarts} 
            option={getOption()} 
            style={{ height: '50vh', width: '59vw' }}
            ref={chartRef}
        />
    );
};

export { PiePodGenre, transPodGenre };
