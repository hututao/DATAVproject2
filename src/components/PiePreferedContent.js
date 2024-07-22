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

const transPreferContent = (data) => {
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

    return result;
}

const PiePreferContent = ({ data, highlightedCategory }) => {
    const chartRef = useRef(null);

    const getOption = () => ({
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

export { PiePreferContent, transPreferContent };
