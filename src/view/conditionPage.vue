<template>
    <div class = "wrapper">
        <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
                </li>
            </ul>
            <!--<ul class="navbar-nav ml-auto">-->
            <!--<li class="nav-item">-->
            <!--<a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">-->
            <!--<i class="fa fa-th-large"></i>-->
            <!--</a>-->
            <!--</li>-->
            <!--</ul>-->
        </nav>

        <side-bar active="dashBoard" childNum="0"></side-bar>
    <div class="content-wrapper">

        <!-- Content Header (Page header) -->
        <div class="content-header p-1">
            <!--<div class="container-fluid">-->
                <!--<div class="row mb-2">-->
                    <!--<div class="col-sm-6">-->
                        <!--&lt;!&ndash;<h1 class="m-0 text-dark">Table demonstrate</h1>&ndash;&gt;-->
                    <!--</div>-->
                <!--</div>&lt;!&ndash; /.row &ndash;&gt;-->
            <!--</div>&lt;!&ndash; /.container-fluid &ndash;&gt;-->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content p-1">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 p-0">


                        <div>
                            <section class="content">
                                <div class="container-fluid">
                                    <div class="row">

                                        <div class="col-md-3">

                                            <div class="card">
                                                <div class="card-header d-flex p-0">

                                                    <ul class="nav nav-pills p-1">

                                                        <li class="nav-item"><a class="nav-link active" href="#tab_1" data-toggle="tab">Filter</a></li>
                                                        <li class="nav-item"><a class="nav-link " href="#tab_2" data-toggle="tab">Rank</a></li>

                                                    </ul>
                                                    <div class="card-tools">
                                                        <button type="button" class="btn btn-tool btn-sm" data-widget="collapse" data-toggle="tooltip"
                                                                title="Collapse">
                                                            <i class="fa fa-minus"></i></button>
                                                    </div>
                                                </div><!-- /.card-header -->


                                                <div class="card-body p-1">
                                                    <div class="tab-content">
                                                        <div class="tab-pane active" id="tab_1" style="overflow-y:auto; max-height:550px;">
                                                            <div class="table-responsive">
                                                                <table class="table-sm table-hover" width="100%">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="p-3">Field</th>
                                                                            <th class="p-3">Value</th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                        <tr v-for="(field, index0) in fields">
                                                                            <td width="50%" class="p-2" style="font-size: small; word-break: break-all;">{{field.m_fldname.replace("_", " ")}}</td>
                                                                            <!--<td class="p-2"><input class="form-control form-control-navbar" v-bind:id="field.m_fldname" type="text"placeholder="value"></td>-->
                                                                            <td width="50%" class="p-1">
                                                                                <select class="form-control select2 p-sm-2" style="font-size: small;" v-bind:id="(allLegend[index0]['name'] + 'select')">
                                                                                    <option>---</option>
                                                                                    <option v-for="v in allLegend[index0]['value']">{{v}}</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <button class="btn btn-block btn-primary" v-on:click="filter()">Filter</button>
                                                        </div>

                                                        <div class="tab-pane" id="tab_2" style="overflow-y:auto; max-height:545px;">
                                                            <div class="card">
                                                                <div class="card-header">
                                                                    <h4 class="card-title">Dimension</h4>
                                                                </div>
                                                                <div class="card-body p-2">
                                                                    <!--<div>-->
                                                                        <!--<button class="btn btn-block btn-success p-1" v-on:click="function() {dimension(2)}">Warehouse</button>-->
                                                                        <!--<button class="btn btn-block btn-warning p-1" v-on:click="function() {dimension(3)}">Bill type</button>-->
                                                                        <!--<button class="btn btn-block btn-primary p-1" v-on:click="function() {dimension(9)}">Customer name</button>-->
                                                                        <!--<button class="btn btn-block btn-danger p-1" v-on:click="function() {dimension(11)}">Material Desc</button>-->
                                                                        <!--&lt;!&ndash;渲染这里&ndash;&gt;-->
                                                                    <!--</div>-->
                                                                    <div>
                                                                        <button v-for="r in renderList" class="btn btn-block btn-primary p-1" v-on:click="function() {dimension(r[Object.keys(r)[0]])}">{{r[Object.keys(r)[1]]}}</button>
                                                                    </div>
                                                                </div>
                                                                    <!-- /.card-body -->
                                                            </div>
                                                                <!-- /. box -->
                                                            <div class="card">
                                                                    <div class="card-header">
                                                                        <h4 class="card-title">Total Item</h4>
                                                                    </div>
                                                                    <div class="card-body p-2">
                                                                        <div>
                                                                            <button class="btn btn-block btn-success p-1" v-on:click="byNumber">Number of orders</button>
                                                                            <!--<button class="btn btn-block btn-info p-1" v-on:click="byOrderQuantity">Back order quantity</button>-->
                                                                            <button v-for="r in renderList2" class="btn btn-block btn-success p-1" v-on:click="function() {sumup(r[Object.keys(r)[0]])}">{{r[Object.keys(r)[1]]}}</button>
                                                                        </div>
                                                                    </div>
                                                                    <!-- /.card-body -->
                                                            </div>
                                                        </div>
                                                            <!-- /.tab-pane -->


                                                    </div>
                                                        <!-- /.tab-content -->
                                                </div><!-- /.card-body -->
                                            </div>

                                        </div>

                                        <!-- /.col -->
                                        <div class="col-md-9">
                                            <pie-chart v-bind:legend="legend" v-bind:data-set="dataSet" v-bind:dms="dms" v-bind:detail="detail" v-bind:fields="fields"></pie-chart>
                                            <!-- /. box -->
                                        </div>
                                        <!-- /.col -->
                                    </div>
                                    <!-- /.row -->
                                </div><!-- /.container-fluid -->
                            </section>
                            <!-- /.content -->
                        </div>
                    </div>
                    <!-- /.col -->

                </div>
            </div><!-- /.container-fluid -->
        </section>
</div>
    </div>
</template>

<script>
require('../asset/dist/js/adminlte.min.js');
import sideBar from '../components/common/sideBar'
import reportPage from '../components/plugins/reportPage'
import pieChart from '../components/charts/pieChart'

export default {
    data() {
        return {
            results : this.tableData.currentResult,
            fields: this.tableData.currentTableFields,
            legend: null,
            dataSet1: null,
            dataSet2: null,
            dataSet: null,
            detail: null,
            dms: 0,
            sum: 0,
            renderList: null,
            renderList2: null,
            allLegend: null
        }
    },
    components: {
        sideBar,
        reportPage,
        pieChart
    },
    methods: {
        byNumber() {
            //把count数据的标准改成计算好的数据记录条数
            this.dataSet = this.dataSet1
        },
        countAll() {
            //按照每一个field去统计出现的unique value
            let allLegend = [];
            for(let i = 0; i < this.tableData.currentTableFields.length; i++) {
                let chartLegend = [];
                for(let j = 0; j < this.tableData.currentResult.length; j++) {
                    let lgd = this.tableData.currentResult[j][i];
                    if(!chartLegend.includes(lgd)) {
                        chartLegend.push(lgd);
                    }
                }
                allLegend.push({value: chartLegend, name: this.tableData.currentTableFields[i].m_fldname});
            }
            this.allLegend = allLegend;
            console.log(allLegend)
        },
        sumup(n) {
            console.log(n);
            let chartDataByQuantity = {};
            let chartLegend = [];
            let dataSet2 = [];


            for(let i = 0; i < this.tableData.currentResult.length; i++) {
                let lgd = this.tableData.currentResult[i][this.dms];
                if(!chartLegend.includes(lgd)) {
                    chartLegend.push(lgd);
                    chartDataByQuantity[lgd] = this.tableData.currentResult[i][n];
                } else {
                    chartDataByQuantity[lgd] = chartDataByQuantity[lgd] + this.tableData.currentResult[i][n];
                }
            }
            for(let j = 0; j < chartLegend.length; j++) {
                dataSet2.push({value:chartDataByQuantity[chartLegend[j]], name:chartLegend[j]})
            }

            this.legend = chartLegend;
            this.dataSet2 = dataSet2;
            this.dataSet = dataSet2;
            this.sum = n;
        },
        //dimension指的是group by 某个field
        //点击field之后计算并且替换当前data
        dimension(n) {
            console.log("dimension: " + n);
            let chartDataCount = {};
            let chartData = {};
            let chartLegend = [];
            let dataSet1 = [];
            //多声明一个以dimension n 为key的原数据的数组
            let detail = [];

            for(let i = 0; i < this.tableData.currentResult.length; i++) {
                let lgd = this.tableData.currentResult[i][n];

                if(!chartLegend.includes(lgd)) {
                    chartLegend.push(lgd);
                    chartDataCount[lgd] = 1;
                    chartData[lgd] = [];
                    chartData[lgd].push(this.tableData.currentResult[i]);
                } else {
                    chartDataCount[lgd] = chartDataCount[lgd] + 1;
                    chartData[lgd].push(this.tableData.currentResult[i]);
                }
            }

            for(let j = 0; j < chartLegend.length; j++) {
                dataSet1.push({value:chartDataCount[chartLegend[j]], name:chartLegend[j]});
                //还要把整个数据放进去
                detail.push({value:chartData[chartLegend[j]], name:chartLegend[j]});
            }

            this.legend = chartLegend;
            this.dataSet1 = dataSet1;
            this.dataSet = dataSet1;
            this.detail = detail;
            this.dms = n;
        },
        //按照选择好的过滤条件去过滤 后台过滤api
        filter() {
            let filters = [];
            for(let i = 0; i < this.tableData.currentTableFields.length; i++) {
                let v = document.getElementById(this.tableData.currentTableFields[i].m_fldname + "select").value;
                if(!(v === "---")) {
                    filters.push(v);
                } else {
                    filters.push("");
                }
            }
            this.$http.post(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/query",
                {
                    "fields" : this.tableData.currentTableFields,
                    "filters" : filters,
                    "tableID" : this.tableData.currentTableID
                },
                { headers: this.httpData.headers })
                .then(res => {
                    this.tableData.currentResult = res.data[0].m_Datas;
                    this.dimension(this.dms);
                })
                .catch(data => {

                })
        },
        //按照storage中的值去制作renderlist renderlist2两个list用于渲染
        goRender() {
            let renderList = [];
            let renderList2 = [];
            if(!(typeof(localStorage[this.tableData.currentTableID]) === "undefined")) {
                for(let i = 0; i < this.tableData.currentTableFields.length; i++) {
                    console.log(document.getElementById(this.tableData.currentTableFields[i].m_fldname));
                    if(JSON.parse(localStorage[this.tableData.currentTableID])[this.tableData.currentTableFields[i].m_fldname]) {
                        //只需要名字和dimension
                        renderList.push({value:i , name: JSON.parse(localStorage[this.tableData.currentTableID])[this.tableData.currentTableFields[i].m_fldname + 'alias']})
                    }
                    if(JSON.parse(localStorage[this.tableData.currentTableID])[this.tableData.currentTableFields[i].m_fldname + 'count']) {
                        //只需要名字和dimension
                        renderList2.push({value:i , name: JSON.parse(localStorage[this.tableData.currentTableID])[this.tableData.currentTableFields[i].m_fldname + 'alias']})
                    }
                }
            }
            this.renderList = renderList;
            this.renderList2 = renderList2;
        }
    },
    created() {
        this.countAll();
    },
    mounted() {
        this.goRender();
        this.dimension(this.renderList[0]["value"]);
    }
}
</script>
<style scoped>
</style>
