<template>
    <div class = "wrapper">
        <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
                </li>
            </ul>
        </nav>

        <side-bar active="dashBoard" childNum="1"></side-bar>

        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <!--<div class="col-sm-6">-->
                            <!--<h1>Inline Charts</h1>-->
                        <!--</div>-->
                        <!--<div class="col-sm-6">-->
                            <!--<ol class="breadcrumb float-sm-right">-->
                                <!--<li class="breadcrumb-item"><a href="#">Home</a></li>-->
                                <!--<li class="breadcrumb-item active">Inline Charts</li>-->
                            <!--</ol>-->
                        <!--</div>-->
                    </div>
                </div><!-- /.container-fluid -->
            </section>
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <!-- Custom Tabs -->
                            <div class="card">
                                <div class="card-header d-flex p-0">
                                    <h3 class="card-title p-3">Search</h3>
                                    <ul class="nav nav-pills ml-auto p-2">
                                        <li class="nav-item"><a class="nav-link active" href="#tab_1" data-toggle="tab">Name</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#tab_2" data-toggle="tab">ID</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#tab_3" data-toggle="tab">Code</a></li>
                                    </ul>
                                </div><!-- /.card-header -->
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tab_1">
                                            <div class="form-group">
                                                <label>by Table Name</label>
                                                <select class="form-control" id="tableName">
                                                    <option v-for="(name, key) in tableName">
                                                        {{name}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <button v-on:click="getTableInfobyName" type="button" class="btn btn-block btn-primary">Search</button>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab_2">
                                            <div class="form-group">
                                                <label>by Table ID</label>
                                                <select class="form-control" id="tableID">
                                                    <option v-for="(id, key) in tableID">
                                                        {{id}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <button v-on:click="getTableInfobyID" type="button" class="btn btn-block btn-primary">Search</button>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab_3">
                                            <div class="form-group">
                                                <label>by Table Code</label>
                                                <select class="form-control" id="tableCode">
                                                    <option v-for="(code, key) in tableCode">
                                                        {{code}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <button v-on:click="getTableInfobyCode" type="button" class="btn btn-block btn-primary">Search</button>
                                            </div>
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

                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->
        </div>
    </div>

</template>

<script>
require('../asset/dist/js/adminlte.min.js');
require('../asset/plugins/bootstrap/js/bootstrap.bundle.min.js')

import sideBar from '../components/common/sideBar'
export default {
    data() {
        return {
            results : this.tableData.result,
            tableID : this.tableData.allTableID,
            tableName: this.tableData.allTableName,
            tableCode: this.tableData.allTableCode
        }
    },
    components: {
        //声名component 就可以在html之中直接使用标签插入当作vue组件
        sideBar
    },
    methods: {
        getTableInfobyID() {
            console.log(document.getElementById("tableID").value);
            this.$http.post(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/tableInfo",
                {
                    tableID : document.getElementById("tableID").value
                },
                {
                    headers: this.httpData.headers
                })
                .then(res => {
                    if(res.status == 204) {
                        alert("Empty table!")
                    } else {
                        console.log(res.data[0]);
                        console.log(res.data[0].metaData.m_fields);
                        this.tableData.currentResult = res.data[0].m_Datas;
                        this.tableData.currentTableFields = res.data[0].metaData.m_fields;
                        this.tableData.currentTableID = document.getElementById("tableID").value;
                        this.$router.push('/conditionPage')
                    }
                }).catch(data => {

                })
        },
        getTableInfobyName() {
            this.$http.post(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/tableInfo",
                {
                    tableID : this.tableID[document.getElementById("tableName").selectedIndex]
                },
                {
                    headers: this.httpData.headers
                }).then(res => {
                if(res.status == 204) {
                    alert("Empty table!")
                } else {
                    console.log(res.data[0]);
                    console.log(res.data[0].metaData.m_fields);
                    this.tableData.currentResult = res.data[0].m_Datas;
                    this.tableData.currentTableFields = res.data[0].metaData.m_fields;
                    this.tableData.currentTableID = this.tableID[document.getElementById("tableName").selectedIndex];
                    this.$router.push('/conditionPage')
                }
            }).catch(data => {

            })
        },
        getTableInfobyCode() {
            this.$http.post(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/tableInfo",
                {
                    tableID : this.tableID[document.getElementById("tableCode").selectedIndex]
                },
                {
                    headers: this.httpData.headers
                })
                .then(res => {
                    if(res.status == 204) {
                        alert("Empty table!")
                    } else {
                        this.tableData.currentResult = res.data[0].m_Datas;
                        this.tableData.currentTableFields = res.data[0].metaData.m_fields;
                        this.tableData.currentTableID = this.tableID[document.getElementById("tableCode").selectedIndex];
                        this.$router.push('/conditionPage')
                    }
                }).catch(data => {

                })
        }
    }

}
</script>
<style scoped>
</style>
