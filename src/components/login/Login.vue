<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">

                <el-form :model="loginForm" ref="loginForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                            prop="username"
                            label="用户名"
                            :rules="{required:true,message:'请输入用户名',trigger:'blur'}"
                    >
                        <el-input v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="password"
                            label="密码"
                            :rules="{required:true,message:'请输入密码',trigger:'blur'}"
                    >
                        <el-input type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                        <el-button @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/site/login', {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        })
                                .then(function (response) {
                                    var data = response.data;
                                    if (data.status == 200) {
                                        this.saveStorge('token', data.data.access_token);
                                        this.$router.push('/parkinfo');
                                    } else {
                                        var result = '';
                                        if (response.data.data.username[0] !== null) {
                                            result += response.data.data.username[0];
                                        }
                                        if (response.data.data.password[0] !== null) {
                                            result += response.data.data.password[0];
                                        }
                                        alert(result);
                                    }
                                }.bind(this))
                                .catch(function (error) {
                                    console.log(error);
                                });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }

</script>
<style>
    .el-row{
        margin:auto 0;
    }
</style>
