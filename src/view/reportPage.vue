<template>
    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->
        <side-bar active="report" childNum="0"></side-bar>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">

            </section>

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Dimension</h4>
                                </div>
                                <div class="card-body">
                                    <div>
                                        <button class="btn btn-block btn-success" v-on:click="function() {dimension(2)}">Warehouse</button>
                                        <button class="btn btn-block btn-warning" v-on:click="function() {dimension(3)}">Bill type</button>
                                        <button class="btn btn-block btn-primary" v-on:click="function() {dimension(9)}">Customer name</button>
                                        <button class="btn btn-block btn-danger" v-on:click="function() {dimension(11)}">Material Desc</button>
                                    </div>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /. box -->
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Total Item</h4>
                                </div>
                                <div class="card-body">
                                    <div>
                                        <button class="btn btn-block btn-success" v-on:click="byNumber">Number of orders</button>
                                        <button class="btn btn-block btn-info" v-on:click="byOrderQuantity">Back order quantity</button>
                                    </div>
                                </div>
                                <!-- /.card-body -->
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-md-9">
                            <div class="card card-primary">
                                <div class="card-body p-0">
                                    <pie-chart v-bind:legend="legend" v-bind:data-set="dataSet"></pie-chart>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /. box -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->
    </div>
</template>

<script>

require('../asset/dist/js/adminlte.min.js');
import pieChart from '../components/charts/pieChart'
import sideBar from '../components/common/sideBar'

export default {
        data() {
            return {
                legend: null,
                dataSet1: null,
                dataSet2: null,
                detail:null,
                dataSet: null,
                dms: 10
            }
        },
        components: {
            pieChart,
            sideBar
        },
        methods: {
            byNumber() {
                this.dataSet = this.dataSet1
            },
            byOrderQuantity() {
                this.dataSet = this.dataSet2
            },
            dimension(n) {
                console.log(n);
                let chartDataCount = {};
                let chartDataByQuantity = {};
                let chartData = {}

                let chartLegend = [];

                let dataSet1 = [];
                let dataSet2 = [];
                //多声明一个以dimension n 为key的原数据的数组
                let detail = [];

                for(let i = 0; i < this.GLOBAL.demoResult.length; i++) {
                    let lgd = this.GLOBAL.demoResult[i][n];
                    chartData[lgd].push(this.GLOBAL.demoResult[i]);
                    if(!chartLegend.includes(lgd)) {
                        chartLegend.push(lgd);
                        chartDataCount[lgd] = 1;
                        chartDataByQuantity[lgd] = this.GLOBAL.demoResult[i][12];
                    } else {
                        chartDataCount[lgd] = chartDataCount[lgd] + 1;
                        chartDataByQuantity[lgd] = chartDataByQuantity[lgd] + this.GLOBAL.demoResult[i][12];
                    }
                }

                for(let j = 0; j < chartLegend.length; j++) {
                    dataSet1.push({value:chartDataCount[chartLegend[j]], name:chartLegend[j]});
                    dataSet2.push({value:chartDataByQuantity[chartLegend[j]], name:chartLegend[j]})
                    //还要把整个数据放进去
                    detail.push({value:chartData[chartLegend[j]], name:chartLegend[j]});
                }

                this.legend = chartLegend;
                this.dataSet1 = dataSet1;
                this.dataSet2 = dataSet2;
                this.dataSet = dataSet1;
                this.detail = detail;
                console.log(detail)
            },
            async getData() {
                console.log("1001A11000000000KKD5");
                this.$http.post("http://127.0.0.1:8081/uapws/rest/reportForWeb/tableInfo",
                    { tableID : "1001A11000000000KKD5" },
                    { headers: this.GLOBAL.headers })
                    .then(res => {
                        if(res.status === 204) {
                            alert("Empty table!")
                        } else {
                            console.log(res.data[0].metaData.m_fields);
                            this.GLOBAL.demoTableFields = res.data[0].metaData.m_fields;
                            this.getDetail();
                        }
                    })
                    .catch(data => {
                    })
            },
            async getDetail() {
                let filters = [];
                for(let i = 0; i < this.GLOBAL.demoTableFields.length; i++) {
                    filters.push("");
                }
                // this.$http.post("http://127.0.0.1:8081/uapws/rest/reportForWeb/query",
                this.$http.post("http://58.185.227.238:8090/uapws/rest/reportForWeb/query",
                    { "fields" : this.GLOBAL.demoTableFields, "filters" : filters },
                    { headers: this.GLOBAL.headers})
                    .then(res => {
                        this.GLOBAL.demoResult = res.data[0].m_Datas;
                        this.dimension(this.dms);
                    })
                    .catch(data => {
                    })
            }
        },
        created() {
            this.getData();
            this.catagorizeData();
        }

}
</script>
<style scoped>
</style>
