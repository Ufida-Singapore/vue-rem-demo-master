<template>
    <div v-if="show" class="login-box">
        <div class="login-logo">
            <b>Table</b>Report
        </div>
        <side-bar active="dashBoard" style="visibility: hidden;" child-num="0"></side-bar>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <div>
                    <div class="form-group has-feedback">
                        <input id="username" class="form-control" placeholder="Username">
                        <span class="fa fa-envelope form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <input id="pass"type="password" class="form-control" placeholder="Password">
                        <span class="fa fa-lock form-control-feedback"></span>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="checkbox icheck">
                                <label>
                                    <input type="checkbox"> Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                            <button v-on:click="login" class="btn btn-primary btn-block btn-flat">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </div>
                <!--</form>-->

                <div class="social-auth-links text-center mb-3">
                    <!--<p>- OR -</p>-->
                    <!--<a href="#" class="btn btn-block btn-primary">-->
                        <!--<i class="fa fa-facebook mr-2"></i> Sign in using Facebook-->
                    <!--</a>-->
                    <!--<a href="#" class="btn btn-block btn-danger">-->
                        <!--<i class="fa fa-google-plus mr-2"></i> Sign in using Google+-->
                    <!--</a>-->
                </div>
                <!-- /.social-auth-links -->

                <p class="mb-1">
                    <a href="#">I forgot my password</a>
                </p>
                <p class="mb-0">
                    <a href="register.html" class="text-center">Register a new membership</a>
                </p>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->
</template>

<script>
    require('../asset/dist/js/adminlte.min.js');
    import sideBar from '../components/common/sideBar'
    export default {
        data() {
            return {
                username : 'Username',
                password : 'Password',
                show: false
            }
        },
        components: {
            sideBar
        },
        methods: {
            //login method, please set the headers properly.
            login() {
                let unm = document.getElementById("username").value;
                let pwd = document.getElementById("pass").value;

                this.$http.post(this.$config.development.loginAPI,
                    {
                        usercode: unm,
                        pwd : pwd
                    },
                    {
                        headers: {
                            'content-type': 'application/json',
                            'uap_dataSource':'design',
                            'uap_token':'',
                            'uap_usecode':unm
                        }
                    })
                    .then(res => {
                            if(res.data.uap_token === "") {
                                alert("Username or password is not correct, please try again.");
                            } else {
                                console.log("logged in " + res.data.uap_token );
                                this.httpData.token = res.data.uap_token;
                                this.httpData.user = unm;
                                this.httpData.headers = {
                                    'content-type' : 'application/json',
                                    'uap_dataSource':'design',
                                    'uap_token' : this.httpData.token,
                                    'uap_usecode': unm
                                }
                                this.$router.push('/mainPage');
                            }
                       })
                    .catch(data => {
                    })


            },
            doAuth() {
                this.$http.get("https://openapi.yonyoucloud.com/token?appid=13d679b240960f26&secret=f2e797b371f461c6c4f42d10f66ac8cd1ce09b068b8f2145e2515cfa618a")
                    .then(res => {
                        //this.GLOBAL.serverSrc = res.data[0].m_Datas;
                        this.GLOBAL.yytoken = res.data.data.access_token;
                        console.log(res);
                        console.log(res.data.data.access_token);
                        this.authorize();
                    })
                    .catch(data => {

                    })
            },
            authorize() {
                let url=location.search;
                console.log(this.GLOBAL.yytoken)
                let theRequest = [];
                let str = url.substr(1);
                console.log(str);
                let strs = str.split("&");
                for(let i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
                console.log(theRequest['code']);
                console.log(this.GLOBAL.yytoken)
                this.$http.get("https://openapi.yonyoucloud.com/certified/userInfo/" + theRequest['code'] + "?access_token=" + this.GLOBAL.yytoken)
                    .then(res => {
                        this.goLogin();
                    })
                    .catch(data => {
                        console.log(data)
                    })
            },
            goLogin() {
                let unm = "bruce";
                let pwd = "yy@12345";
                // this.$http.post("http://127.0.0.1:8081/uapws/rest/user/login"
                //axios 发送post的方法：｛参数｝｛header：｛header参数｝｝
                this.$http.post("http://http://58.185.227.238:8090/uapws/rest/user/login",
                    {
                        usercode: unm,
                        pwd : pwd
                    },
                    {
                        headers: {
                            'Content-Type' : 'application/json',
                            'uap_dataSource':'NCDEMO_MTX',
                            'uap_token':'',
                            'uap_usecode':'bruce'
                        }
                    }).then(res => {
                    this.GLOBAL.token = res.data.uap_token;
                    if(this.GLOBAL.token === "") {
                        alert("Username or password is not correct, please try again.");
                    } else {
                        this.$router.push('/mainPage');
                        this.GLOBAL.headers = {
                            'Content-Type' : 'application/json',
                            'uap_dataSource':'NCDEMO_MTX',
                            'uap_token':this.GLOBAL.token,
                            'uap_usecode':'bruce'
                        }
                    }
                })
                    .catch(data => {
                    })
            },
            showPage() {
                this.show = true;
            }
        },
        created() {
            //在加载页面之前检查url中是否有token
            //若有 去做免登录
            //若无 正常进入登录页面
            let url=location.search;
            if(url.indexOf("?")!==-1) {
                this.doAuth();
            } else {
                this.showPage();
            }
        }
    }
</script>

<style scoped>
</style>
