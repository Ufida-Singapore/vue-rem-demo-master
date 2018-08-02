<template>
    <div class="row">
            <div class="col-12">
                <!-- Custom Tabs -->
                <div class="card">
                    <div class="card-header d-flex p-0">
                        <ul class="nav nav-pills ml-auto p-1">
                            <li class="nav-item"><a id="link_chart" class="nav-link active" href="#tab_chart" data-toggle="tab">Chart</a></li>
                            <li class="nav-item"><a id="link_detail" class="nav-link" href="#tab_detail" data-toggle="tab">Detail</a></li>
                        </ul>
                    </div><!-- /.card-header -->

                    <div class="card-body p-0">
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_chart">
                                <div id="pieChart" style="height: 550px;"></div>
                            </div>
                            <!-- /.tab-pane -->
                            <div class="tab-pane" id="tab_detail" style="overflow-y:auto; max-height:555px;">
                                <table v-for="d in detail" v-bind:id="d[Object.keys(d)[1]]" class="table-sm table-bordered table-striped table-responsive" style="font-size: 16px">
                                    <thead>
                                    <tr>
                                        <th v-for="f in fields">{{f.m_fldname}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="each in d[Object.keys(d)[0]]">
                                        <!--<script>-->
                                        <!--Object.keys(d)[0];-->
                                        <!--var key = Object.keys(d)[0];-->
                                        <!--d[key];-->
                                        <!--</script>-->
                                        <!--<td>{{d[Object.keys(d)[1]]}}</td>-->
                                        <td v-for="e in each">{{e}}</td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th v-for="f in fields">{{f.m_fldname}}</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                </div>
                <!-- ./card -->
            </div>
            <!-- /.col -->
        </div>
</template>

<script>

    var echarts = require('../../asset/js/echarts.min.js')
    require("../../asset/plugins/datatables/jquery.dataTables.min.js")
    require("../../asset/plugins/datatables/dataTables.bootstrap4.min.js")
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
    var x;

    export default {
        components: {},
        props: ['legend','dataSet', 'detail', 'fields'],
        data() {
            return {
                legend: this.legend,
                dataSet: this.dataSet,
                myChart:"",
                detail:this.detail,
                fields:this.fields
            }
        },
        computed: {},
        methods: {
            init() {
                let chart = echarts.init(document.getElementById("pieChart"), 'macarons');
                this.myChart = chart;
                let f = this.flip;
                let option = {
                    title: {
                        text: 'Demo',
                        subtext: '实际数据',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data:this.legend
                    },
                    series: [
                        {
                            name:'Sum',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.dataSet,
                            legend:this.legend,
                            detail:false
                        }
                    ]
                };

                chart.setOption(option);
                window.addEventListener("resize", chart.resize);
                console.log(this.legend)
                chart.on('click', function (param){
                    f(param.name);
                });
            },
            //在点击某个部分之后 把html加载好的部分的显示属性改成 显示 来实现跳转到具体的数据
            flip(nm) {
                let legend = this.legend;
                console.log(legend);
                for(let i = 0; i < legend.length; i++) {
                    if(legend[i] === nm) {
                        console.log(document.getElementById(nm));
                        x = document.getElementById(nm);
                        x.style.display = "block";
                    } else {
                        console.log(document.getElementById(legend[i]));
                        x = document.getElementById(legend[i]);
                        x.style.display = "none";
                    }
                }
                document.getElementById("tab_chart").classList.remove("active");
                document.getElementById("link_chart").classList.remove("active");
                document.getElementById("tab_detail").classList.add("active");
                document.getElementById("link_detail").classList.add("active");
            }
        },
        created() {

        },
        mounted() {
            //this.init()
        },
        //利用这个watch来实现 vue的动态渲染 带动echart一起渲染
        watch: {
            //观察option的变化
            dataSet: function (newVal, oldVal){
                 this.init()
            },
            detail: function (newVal, oldVal) {
                console.log(this.detail);
                this.init();
            },
            legend: function (newVal, oldVal) {
                console.log(this.legend);
                this.init();
            }
        }
    }
</script>
<style>
</style>
