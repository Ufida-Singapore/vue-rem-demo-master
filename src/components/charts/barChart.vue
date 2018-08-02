<template>
    <div id="barChart" style="height:100%"></div>
</template>

<script>
    export default {
        components: {},
        props: {},
        data() {
            return {

            }
        },
        computed: {},
        methods: {
        },
        created() {
        },
        mounted() {
            var echarts = require('../../asset/js/echarts.min.js')
            var colorPalette = [
                '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
                '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
                '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
                '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
            ];

            var theme = {
                color: colorPalette,

                title: {
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#008acd'
                    }
                },

                visualMap: {
                    itemWidth: 15,
                    color: ['#5ab1ef', '#e0ffff']
                },

                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: colorPalette[0]
                        }
                    }
                },

                tooltip: {
                    backgroundColor: 'rgba(50,50,50,0.5)',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: '#008acd'
                        },
                        crossStyle: {
                            color: '#008acd'
                        },
                        shadowStyle: {
                            color: 'rgba(200,200,200,0.2)'
                        }
                    }
                },

                dataZoom: {
                    dataBackgroundColor: '#efefff',
                    fillerColor: 'rgba(182,162,222,0.2)',
                    handleColor: '#008acd'
                },

                grid: {
                    borderColor: '#eee'
                },

                categoryAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#008acd'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    }
                },

                valueAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#008acd'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    }
                },

                timeline: {
                    lineStyle: {
                        color: '#008acd'
                    },
                    controlStyle: {
                        normal: {color: '#008acd'},
                        emphasis: {color: '#008acd'}
                    },
                    symbol: 'emptyCircle',
                    symbolSize: 3
                },

                line: {
                    smooth: true,
                    symbol: 'emptyCircle',
                    symbolSize: 3
                },

                candlestick: {
                    itemStyle: {
                        normal: {
                            color: '#d87a80',
                            color0: '#2ec7c9',
                            lineStyle: {
                                color: '#d87a80',
                                color0: '#2ec7c9'
                            }
                        }
                    }
                },

                scatter: {
                    symbol: 'circle',
                    symbolSize: 4
                },

                map: {
                    label: {
                        normal: {
                            textStyle: {
                                color: '#d87a80'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#eee',
                            areaColor: '#ddd'
                        },
                        emphasis: {
                            areaColor: '#fe994e'
                        }
                    }
                },

                graph: {
                    color: colorPalette
                },

                gauge: {
                    axisLine: {
                        lineStyle: {
                            color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']],
                            width: 10
                        }
                    },
                    axisTick: {
                        splitNumber: 10,
                        length: 15,
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    splitLine: {
                        length: 22,
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    }
                }
            };

            echarts.registerTheme('macarons', theme);
            var myChart = echarts.init(document.getElementById("barChart"), 'macarons')
            var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [320, 302, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '邮件营销',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [150, 212, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '搜索引擎',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [820, 832, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
            myChart.setOption(option);
        },
    }
</script>
<style>
</style>
