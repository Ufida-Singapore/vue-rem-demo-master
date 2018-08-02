<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <div class="sidebar">
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <li id="dashBoard" class="nav-item has-treeview">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fa fa-dashboard"></i>
                            <p>Queries
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a v-on:click="goMainPage" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Queries</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a v-on:click="goSelectTable" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Select Table</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a v-on:click="goConfigurePage" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Configure Table</p>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li id='charts' class="nav-item has-treeview">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fa fa-pie-chart"></i>
                            <p>
                                Charts
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a v-on:click="goBarChartPage" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Bar Chart</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="inline.html" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Line Chart</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="inline.html" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Area Chart</p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="chartjs.html" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>Donut Chart</p>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li id='report' class="nav-item has-treeview">
                        <a href="#" class="nav-link">
                            <i class="nav-icon fa fa-th"></i>
                            <p>
                                Report
                                <i class="right fa fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a v-on:click="goReportPage" class="nav-link">
                                    <i class="fa fa-circle-o nav-icon"></i>
                                    <p>First Table</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
    require('../../asset/dist/js/adminlte.min.js');
    export default {
        components: {},
        props: ['active', 'childNum'],
        data() {
            return {
                active: this.active,
                childNum: this.childNum
            }
        },
        computed: {},
        methods: {
            //这里集中了router的方法，进页面之前都预先加载好页面需要的数据
            goMainPage() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/mainPage');
            },
            goSingleTablePage() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/conditionPage');
            },
            goBarChartPage() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/barChartPage');
            },
            goReportPage() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/reportPage');
            },
            goConfigurePage() {
                this.$http.get("http://127.0.0.1:8081/uapws/rest/reportForWeb/allTableID",
                    {
                        headers: this.httpData.headers
                    })
                    .then(res => {
                        this.tableData.allTableID = res.data;
                        this.gatherData2();
                    })
                    .catch(data => {

                    })
            },
            goSelectTable() {
                this.$http.get(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/allTableID",
                    {
                        headers: this.httpData.headers
                    })
                    .then(res => {
                        this.tableData.allTableID = res.data;
                        this.gatherData1();
                    })
                    .catch(data => {

                    })
            },
            gatherData1() {
                this.$http.get(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/allTableName",
                    {
                        headers: this.httpData.headers
                    })
                    .then(res => {
                        this.tableData.allTableName = res.data;
                        this.getTableCode1();
                    })
                    .catch(data => {
                    })
            },
            getTableCode1() {
                this.$http.get(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/allTableCode",
                    {
                        headers: this.httpData.headers
                    })
                    .then(res => {
                        this.tableData.allTableCode = res.data;
                        document.body.classList.remove('sidebar-open');
                        this.$router.push('/selectTable');
                    })
                    .catch(data => {
                    })
            },
            gatherData2() {
                this.$http.get(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/allTableName",
                    {
                        headers: this.httpData.headers
                    })
                    .then(res => {
                        this.tableData.allTableName = res.data;
                        this.getTableCode2();
                    })
                    .catch(data => {
                    })
            },
            getTableCode2() {
                this.$http.get(this.$config.development.IPAddress + "/uapws/rest/reportForWeb/allTableCode",
                    {
                        headers: this.httpData.headers
                    })
                    .then(res => {
                        this.tableData.allTableCode = res.data;
                        document.body.classList.remove('sidebar-open');
                        this.$router.push('/configurePage');
                    })
                    .catch(data => {
                    })
            }

        },
        mounted() {
            var a = document.getElementById(this.active)
            a.className += " menu-open"
            a.children[0].className += " active"
            a.children[1].children[this.childNum].children[0].className += " active"
        }
    }
</script>
<style scoped>
</style>
