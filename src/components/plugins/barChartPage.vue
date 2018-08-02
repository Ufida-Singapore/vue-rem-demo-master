<template>
    <div class = "wrapper">

        <div class="content-wrapper">

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

require('../../asset/dist/js/adminlte.min.js');
import barChart from '../charts/barChart'

export default {
        data() {
            return {
            }
        },
        components: {
            barChart
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
