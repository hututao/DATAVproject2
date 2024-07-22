import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { TreeChart } from 'echarts/charts';
import { TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';

// ECharts 必需组件
echarts.use([
    TooltipComponent,
    TitleComponent,
    TreeChart,
    CanvasRenderer
]);

const Tree = () => {
    const data = {
        "name": "Root",
        "children": [
            {
                "name": "subplan",
                "children": [
                    {
                        "name": "Free (ad-supported)"
                    },
                    {
                        "name": "Premium (paid subscription)"
                    }
                ]
            },
            {
                "name": "premium_sub_willingness",
                "children": [
                    {
                        "name": "Yes"
                    },
                    {
                        "name": "No"
                    }
                ]
            },
            {
                "name": "preferred_listening_content",
                "children": [
                    {
                        "name": "Music"
                    },
                    {
                        "name": "Podcast"
                    }
                ]
            },
            {
                "name": "fav_pod_genre",
                "children": [
                    {
                        "name": "Comedy"
                    },
                    {
                        "name": "Sports"
                    },
                    {
                        "name": "Lifestyle and Health"
                    },
                    {
                        "name": "Business"
                    },
                    {
                        "name": "Food and cooking"
                    },
                    {
                        "name": "Health and Fitness"
                    },
                    {
                        "name": "None"
                    },
                    {
                        "name": "Everything"
                    },
                    {
                        "name": "Technology"
                    },
                    {
                        "name": "Informative stuff"
                    },
                    {
                        "name": "Educational"
                    },
                    {
                        "name": "Self help"
                    },
                    {
                        "name": "Spiritual and devotional"
                    },
                    {
                        "name": "Dance and Relevant cases"
                    },
                    {
                        "name": "Political, informative, topics that interests me"
                    },
                    {
                        "name": "Murder Mystery"
                    },
                    {
                        "name": "Stories"
                    },
                    {
                        "name": "Finance related and current affairs"
                    },
                    {
                        "name": "General knowledge"
                    },
                    {
                        "name": "Novels"
                    }
                ]
            },
            {
                "name": "fav_music_genre",
                "children": [
                    {
                        "name": "Melody"
                    },
                    {
                        "name": "Rap"
                    },
                    {
                        "name": "Pop"
                    },
                    {
                        "name": "Classical & melody, dance"
                    },
                    {
                        "name": "Rock"
                    },
                    {
                        "name": "Old songs"
                    },
                    {
                        "name": "All"
                    },
                    {
                        "name": "Electronic/Dance"
                    },
                    {
                        "name": "Kpop"
                    },
                    {
                        "name": "trending songs random"
                    },
                    {
                        "name": "classical"
                    }
                ]
            },
            {
                "name": "preffered_premium_plan",
                "children": [
                    {
                        "name": "Family Plan-Rs 179/month"
                    },
                    {
                        "name": "Individual Plan- Rs 119/ month"
                    },
                    {
                        "name": "Student Plan-Rs 59/month"
                    },
                    {
                        "name": "Duo plan- Rs 149/month"
                    },
                    {
                        "name": "None"
                    }
                ]
            }
        ]
    };
    
    const getOption = () => ({
        title: {
            text: 'Subscription Plan and Willingness Tree',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [data],
                top: '5%',
                left: '20%',
                bottom: '5%',
                right: '20%',
                symbolSize: 10,
                label: {
                position: 'inside',
                formatter: '{b}',
                color: '#000',  // 设置文字颜色为白色
                backgroundColor: '#fff',  // 设置背景颜色
                borderColor: '#000',  // 设置边框颜色
                borderWidth: 1,  // 设置边框宽度
                borderRadius: 10,  // 设置边框圆角
                padding: [4, 6]  // 设置内边距
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                initialTreeDepth: 2,
                animationDurationUpdate: 750
            }
        ]
    });

    return (
        <ReactEChartsCore
            echarts={echarts}
            option={getOption()}
            style={{ height: '90vh', width: '100%' }}
        />
    );
};

export default Tree;