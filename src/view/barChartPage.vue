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
        <side-bar active="charts" childNum="0"></side-bar>
        <div class="content-wrapper">

            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Dashboard</h1>
                        </div>
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <!-- Info boxes -->
                    <div class="row">
                        <!--col-sm-6 col-md-3-->
                        <div class="col-12">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">Weather Statistics</h3>

                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                        <button type="button" class="btn btn-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div class="card-body" style="padding-left:0">
                                    <div class="chart" style="height:400px">
                                        <bar-chart></bar-chart>
                                    </div>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.info-box -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                </div><!--/. container-fluid -->
            </section>
            <!-- /.content -->
        </div>

    </div>
</template>

<script>

require('../asset/dist/js/adminlte.min.js');
import barChart from '../components/charts/barChart'
import sideBar from '../components/common/sideBar'

export default {
        data() {
            return {
            }
        },
        components: {
            barChart,
            sideBar
        },
        methods: {
            goMainPage() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/mainPage');
            },
            goSingleTablePage() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/conditionPage');
            },
            goBarChart() {
                document.body.classList.remove('sidebar-open');
                this.$router.push('/barChart');
            },
            goSelectTable() {
                this.$http.get("http://127.0.0.1:8081/uapws/rest/reportForWeb/allTableID",
                    {
                        headers: this.GLOBAL.headers
                    })
                    .then(res => {
                        this.GLOBAL.tableID = res.data;
                        document.body.classList.remove('sidebar-open');
                        this.$router.push('/selectTable');
                    })
                    .catch(data => {

                    })
            }

        }

}
</script>
<style scoped>
</style>
