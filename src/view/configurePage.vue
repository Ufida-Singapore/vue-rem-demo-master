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

        <side-bar active="dashBoard" childNum="2"></side-bar>

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
                        <div class="col-md-12">
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
                                                <button v-on:click="getTableInfobyID" type="button" class="btn btn-block btn-primary">Search</button>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- /.tab-content -->
                                </div><!-- /.card-body -->
                            </div>
                            <!-- ./card -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-12">
                            <!-- Custom Tabs -->
                            <div class="card">
                                <div class="card-header d-flex p-0">
                                    <h3 class="card-title p-3">Search</h3>

                                    <ul class="nav nav-pills ml-auto p-2">
                                        <!--<li class="nav-item"><a class="nav-link active" href="#tab_3" data-toggle="tab">Sort by</a></li>-->
                                        <!--<li class="nav-item"><a class="nav-link" href="#tab_4" data-toggle="tab">Alias</a></li>-->
                                        <!--<li class="nav-item"><a class="nav-link" href="#tab_3" data-toggle="tab">a</a></li>-->
                                        <!--<li class="nav-item dropdown">-->
                                        <!--<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">-->
                                        <!--Dropdown <span class="caret"></span>-->
                                        <!--</a>-->
                                        <!--<div class="dropdown-menu">-->
                                        <!--<a class="dropdown-item" tabindex="-1" href="#">Action</a>-->
                                        <!--<a class="dropdown-item" tabindex="-1" href="#">Another action</a>-->
                                        <!--<a class="dropdown-item" tabindex="-1" href="#">Something else here</a>-->
                                        <!--<div class="divider"></div>-->
                                        <!--<a class="dropdown-item" tabindex="-1" href="#">Separated link</a>-->
                                        <!--</div>-->
                                        <!--</li>-->
                                    </ul>
                                </div><!-- /.card-header -->
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table-sm table-hover" width="100%">
                                            <thead>
                                                <tr>
                                                    <th class="p-2">Field</th>
                                                    <th class="p-2">Alias</th>
                                                    <th class="p-2">Group</th>
                                                    <th class="p-2">Sum</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(field, index) in tableFields">
                                                    <td width="46%" class="p-1" style="font-size:small; word-break: break-all;vertical-align: middle;width:110px">{{field.m_fldname.replace("_", " ")}}</td>
                                                    <!--<td class="p-2"><input class="form-control form-control-navbar" v-bind:id="field.m_fldname" type="text"placeholder="value"></td>-->
                                                    <td width="40%" class="p-1" >
                                                        <input :id="field.m_fldname + 'alias'" class="form-control" placeholder="Alias">
                                                    </td>
                                                    <td width="7%" class="p-1" >
                                                        <label class="container">
                                                            <input :id="field.m_fldname" type="checkbox" class="minimal">
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </td>
                                                    <td width="7%" class="p-1" >
                                                        <label class="container2">
                                                            <input :id="field.m_fldname + 'count'" type="checkbox" class="minimal">
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="height: 20px"></div>
                                    <div align="right">
                                        <button v-on:click="save" type="button" class="btn btn-inline btn-primary" >save</button>
                                        <button v-on:click="clear" type="button" class="btn btn-inline btn-primary">clear</button>
                                    </div>
                                </div><!-- /.card-body -->
                            </div>
                            <!-- ./card -->
                        </div>
                    </div>

                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->
        </div>
    </div>

</template>

<script>
    require('../asset/dist/js/adminlte.min.js');
    require('../asset/plugins/bootstrap/js/bootstrap.bundle.min.js');

    import sideBar from '../components/common/sideBar'
    export default {
        data() {
            return {
                tableID : this.tableData.allTableID,
                tableName: this.tableData.allTableName,
                tableCode: this.tableData.allTableCode,
                tableFields: this.tableData.currentTableFields
            }
        },
        components: {
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
                        if(res.status === 204) {
                            alert("Empty table!")
                        } else {
                            this.tableFields = res.data[0].metaData.m_fields;
                            this.tableData.currentTableFields = res.data[0].metaData.m_fields;
                            this.tableData.currentTableID = document.getElementById("tableID").value;

                        }
                    }).then(res => {
                        this.goRender();
                    })
                    .catch(data => {
                    })
            },
            getTableInfobyName() {
                this.$http.post(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/tableInfo",
                    {
                        tableID : this.tableID[document.getElementById("tableName").selectedIndex]
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
                            this.tableFields = res.data[0].metaData.m_fields;
                            this.tableData.currentTableFields = res.data[0].metaData.m_fields;
                            this.tableData.currentTableID = this.tableID[document.getElementById("tableName").selectedIndex];
                        }
                    })
                    .then(res => {
                        this.goRender();
                    })
                    . catch(data => {

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
                            console.log(res.data[0]);
                            console.log(res.data[0].metaData.m_fields);
                            this.tableFields = res.data[0].metaData.m_fields;
                            this.tableData.currentTableFields = res.data[0].metaData.m_fields;
                            this.tableData.currentTableID = this.tableID[document.getElementById("tableCode").selectedIndex];
                        }
                    })
                    .then(res => {
                        this.goRender();
                    })
                    . catch(data => {

                    })
            },
            //储存当前table的设置
            save() {
                console.log(localStorage[this.tableData.currentTableID])
                let a = {}

                //localStorage的用法，可以替换为yy的storage
                for(let i = 0; i < this.tableFields.length; i++) {
                    a[this.tableFields[i].m_fldname] = document.getElementById(this.tableFields[i].m_fldname).checked;
                    a[this.tableFields[i].m_fldname + 'alias'] = document.getElementById(this.tableFields[i].m_fldname + 'alias').value;
                    a[this.tableFields[i].m_fldname + 'count'] = document.getElementById(this.tableFields[i].m_fldname + 'count').checked;
                    console.log(a[this.tableFields[i].m_fldname]);
                }

                //stringify 和 parse 的用法
                console.log(JSON.stringify(a));
                localStorage.setItem(this.tableData.currentTableID, JSON.stringify(a));
                console.log(JSON.parse(localStorage[this.tableData.currentTableID]));
                console.log("saved");

            },
            clear() {
                localStorage.removeItem(this.tableData.currentTableID);
                this.goRender();
            },
            //按照之前storage中的值来渲染当前页面
            goRender() {
                console.log(this.tableFields)
                if(!(typeof(localStorage[this.tableData.currentTableID]) === "undefined")) {
                    for(let i = 0; i < this.tableFields.length; i++) {
                        console.log(JSON.parse(localStorage[this.tableData.currentTableID])[this.tableFields[i].m_fldname + 'count']);
                        console.log(this.tableFields[i].m_fldname)
                        console.log(document.getElementById(this.tableFields[i].m_fldname + 'alias'));
                        document.getElementById(this.tableFields[i].m_fldname + 'alias').value = JSON.parse(localStorage[this.tableData.currentTableID])[this.tableFields[i].m_fldname + 'alias'];
                        document.getElementById(this.tableFields[i].m_fldname).checked = JSON.parse(localStorage[this.tableData.currentTableID])[this.tableFields[i].m_fldname];
                        document.getElementById(this.tableFields[i].m_fldname + 'count').checked = JSON.parse(localStorage[this.tableData.currentTableID])[this.tableFields[i].m_fldname + 'count'];
                    }
                } else {
                    console.log("No record found")
                    for(let i = 0; i < this.tableFields.length; i++) {
                        document.getElementById(this.tableFields[i].m_fldname + 'alias').value = "default";
                        document.getElementById(this.tableFields[i].m_fldname).checked = false;
                        document.getElementById(this.tableFields[i].m_fldname + 'count').checked = false;
                    }
                }
            }
        }
    }
</script>
<style >
    .container {
        display: block;
        position: relative;
        padding-left: 0px;
        margin-bottom: 0px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .container2 {
        display: block;
        position: relative;
        padding-left: 0px;
        margin-bottom: 0px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Hide the browser's default checkbox */
    .container2 input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 200px;
        width: 200px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* On mouse-over, add a grey background color */
    .container2:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container2 input:checked ~ .checkmark {
        background-color: #EEEE0E;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Show the checkmark when checked */
    .container2 input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 72px;
        top: 40px;
        width: 40px;
        height: 80px;
        border: solid white;
        border-width: 0 24px 24px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    /* Style the checkmark/indicator */
    .container2 .checkmark:after {
        left: 72px;
        top: 40px;
        width: 40px;
        height: 80px;
        border: solid white;
        border-width: 0 24px 24px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
