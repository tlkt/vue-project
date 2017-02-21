<template>
    <div>
        <navHeader></navHeader>
        <el-breadcrumb separator="/" class="pd-g">
            <el-breadcrumb-item :to="{ path: '/' }">线下运维</el-breadcrumb-item>
            <el-breadcrumb-item>车场管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="车场名称" prop="parking_name" :error="errors.parking_name">
                        <el-input v-model="form.parking_name"></el-input>

                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="车场位置" prop="province" class="area" :error="errors.province">
                        <el-select v-model="form.province" clearable placeholder="请选择省份" @change="province_change">
                            <el-option
                                    v-for="item in park_province"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="city" class="area" :error="errors.city">
                        <el-select v-model="form.city" clearable placeholder="请选择城市" @change="city_change">
                            <el-option
                                    v-for="item in park_city"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="area" class="area" :error="errors.area">
                        <el-select v-model="form.area" clearable placeholder="请选择地区">
                            <el-option
                                    v-for="item in park_area"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="车场编号" prop="park_code" :error="errors.park_code">
                        <el-input v-model="form.park_code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车场类型" prop="parking_type" :error="errors.parking_type">
                        <el-select v-model="form.parking_type" placeholder="请选择车场类型">
                            <el-option
                                    v-for="item in park_types"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车场状态" prop="status" :error="errors.status">
                        <el-select v-model="form.status" placeholder="请选择车场状态">
                            <el-option
                                    v-for="item in park_status"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="所属企业" prop="cid" :error="errors.cid">
                        <el-select v-model="form.cid" placeholder="请选择车场类型">
                            <el-option
                                    v-for="item in cids"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车场版本" prop="arm_version" :error="errors.arm_version">
                        <el-input v-model="form.arm_version"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="坐标位置" prop="lng" class="area" :error="errors.lng">
                        <el-input v-model="form.lng"></el-input>
                    </el-form-item>
                    <el-form-item prop="lat" class="area" :error="errors.lat">
                        <el-input v-model="form.lat"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="5">
                    <el-form-item label="联系人" prop="contact_user" :error="errors.contact_user">
                        <el-input v-model="form.contact_user"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="联系电话" prop="contact_mobile" :error="errors.contact_mobile">
                        <el-input v-model="form.contact_mobile"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="车场地址" prop="parking_address" :error="errors.parking_address">
                        <el-input v-model="form.parking_address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="5">
                    <el-form-item label="总车位" prop="space_total" :error="errors.space_total">
                        <el-input v-model="form.space_total"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="开放时间" prop="open_time" :error="errors.open_time">
                        <el-input v-model="form.open_time"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="收费标准" prop="charge_criterion" :error="errors.charge_criterion">
                        <el-input v-model="form.charge_criterion"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="app显示" prop="show_in_app" :error="errors.show_in_app">
                        <el-radio class="radio" v-model="form.show_in_app" label="1">显示</el-radio>
                        <el-radio class="radio" v-model="form.show_in_app" label="0">不显示</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="pay" :error="errors.support_quick_pass">
                        <el-radio v-model="form.support_quick_pass" label="1">绑卡支付</el-radio>
                    </el-form-item>
                    <el-form-item class="pay" :error="errors.support_cash">
                        <el-radio v-model="form.support_cash" label="1">现金支付</el-radio>
                    </el-form-item>
                    <el-form-item class="pay" :error="errors.quickpay">
                        <el-radio v-model="form.quickpay" label="1">快捷支付</el-radio>
                    </el-form-item>
                    <el-form-item class="pay" :error="errors.support_wechat_pay">
                        <el-radio v-model="form.support_wechat_pay" label="1">微信支付</el-radio>
                    </el-form-item>
                    <el-form-item class="pay" :error="errors.support_alipay">
                        <el-radio v-model="form.support_alipay" label="1">支付宝支付</el-radio>
                    </el-form-item>
                    <el-form-item class="pay" :error="errors.support_wallet">
                        <el-radio v-model="form.support_wallet" label="1">钱包支付</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item class="flo-right">
                <el-button type="primary" @click="onSubmit('form')">确认</el-button>
                <el-button type="success" @click="back">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import navHeader from '../public/Nav.vue';
    export default {
        data(){
            return {
                form: {
                    id: '',
                    parking_name: '',
                    province: '',
                    city: '',
                    area: '',
                    status: '',
                    cid: '',
                    arm_version: '',
                    lng: '',
                    lat: '',
                    contact_user: '',
                    contact_mobile: '',
                    parking_address: '',
                    space_total: '',
                    open_time: '',
                    charge_criterion: '',
                    show_in_app: 0,
                    support_quick_pass: 0,
                    quickpay: 0,
                    support_cash: 0,
                    support_wechat_pay: 0,
                    support_alipay: 0,
                    support_wallet: 0,
                    parking_type: '',
                },
                errors: {
                    parking_name: '',
                    province: '',
                    city: '',
                    area: '',
                    status: '',
                    cid: '',
                    arm_version: '',
                    lng: '',
                    lat: '',
                    contact_user: '',
                    contact_mobile: '',
                    parking_address: '',
                    space_total: '',
                    open_time: '',
                    charge_criterion: '',
                    show_in_app: '',
                    support_quick_pass: '',
                    quickpay: '',
                    support_cash: '',
                    support_wechat_pay: '',
                    support_alipay: '',
                    support_wallet: '',
                    parking_type: '',
                },
                rules: {
                    //parking_name: [
                    //    {required: true, message: '请输入车场名称', trigger: 'blur'}
                    //],
                    //province: [
                    //    {required: true, message: '请选择所属省份', trigger: 'change', type: 'number'}
                    //],
                    //city: [
                    //    {required: true, message: '请选择所属城市', trigger: 'change', type: 'number'}
                    //],
                    //area: [
                    //    {required: true, message: '请选择所属地区', trigger: 'change', type: 'number'}
                    //],
                    //park_code: [
                    //    {required: true, message: '请填写车场编号', trigger: 'blur'},
                    //],
                    //parking_type: [
                    //    {required: true, message: '请选择车场类型', trigger: 'change', type: 'number'}
                    //],
                    //status: [
                    //    {required: true, message: '请选择车场状态', trigger: 'change', type: 'number'}
                    //],
                    //cid: [
                    //    {required: true, message: '请选择所属企业', trigger: 'change', type: 'number'}
                    //],
                    //arm_version: [
                    //    {required: true, message: '请填写车场版本', trigger: 'blur'}
                    //],
                    //lng: [
                    //    {required: true, message: '请填写经度', trigger: 'blur'}
                    //],
                    //lat: [
                    //    {required: true, message: '请填写经度', trigger: 'blur'}
                    //],
                    //parking_address: [
                    //    {required: true, message: '请填写车场地址', trigger: 'blur'}
                    //],
                    //space_total: [
                    //    {required: true, message: '请填写总车位数', trigger: 'blur'}
                    //],
                    //open_time: [
                    //    {required: true, message: '请填写开放时间', trigger: 'blur'}
                    //],
                    //charge_criterion: [
                    //    {required: true, message: '请填写收费标准', trigger: 'blur'}
                    //],
                },
                park_province: [],
                park_city: [],
                park_area: [],
                park_status: [],
                cids: [],
                park_types: []
            }
        },
        created(){
            this.getArrayDataByGet('park_status', '/parkinfo/getallstatus', {}, 'parkinfo_status');
            this.getArrayDataByGet('park_types', '/parkinfo/getalltype', {}, 'parkinfo_types');
            this.getArrayDataByGet('cids', '/parkinfo/getallcompany', {}, 'parkinfo_cids');
            this.getLocation('park_province', 1, '0');
            this.onUpdate();
        },
        methods: {
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.httpPostForm('/parkinfo/create', this.form, formName);
                    } else {
                        console.log('submit error');
                        return false;
                    }
                });
            },
            onUpdate(){
                this.$http.get('/parkinfo/view', {params: {id: this.$store.getters.updateId}})
                    .then(function (response) {
                        //如果接口返回的status不等于200,表示网络出错，或者服务端出错
                        if (response.status != 200) {
                            this.$message({
                                showClose: true,
                                message: '系统错误',
                                type: 'error'
                            });
                        }

                        //根据接口返回错误内容，实时控制对应控件，显示错误提示信息
                        let data = response.data;
                        if (data.status == 200) {
                            for (var key in data.data) {
                                if (key != 'others' && key != 'isNewRecord') {
                                    if(key == 'province' && data.data[key] != ''){
                                        this.getLocation('park_city', 2, data.data[key]);
                                    }
                                    if(key == 'city' && data.data[key] != '') {
                                        this.getLocation('park_area', 3, data.data[key]);
                                    }
                                    this.$set(this.form, key, data.data[key]);
                                }
                            }

                        } else if (data.status == 422) {
                            this.$message({
                                showClose: true,
                                message: response.data.message,
                                type: 'error'
                            });
                        }
                    }.bind(this));
            },
            province_change(val){
                this.park_city = [];
                this.form.city = '';
                this.park_area = [];
                this.form.area = '';
                if (val != '') {
                    this.getLocation('park_city', 2, val);
                }
            },
            city_change(val){
                this.park_area = [];
                this.form.area = '';
                if (val != '') {
                    this.getLocation('park_area', 3, val);
                }
            },
            back(){
                history.back(-1);
            }
        },
        components: {
            navHeader
        },
    }
</script>
<style scoped>
    .pd-g {
        padding: 20px;
    }

    .dis-in {
        display: inline;
        width: 20%;
    }

    .flo-right {
        margin-right: 40px;
        float: right;
    }

    .small-length {
        length: 100px;
    }

    .area {
        width: 30%;
        margin-right: -56px;
        float: left;
    }

    .pay {
        width: 17%;
        margin-right: -56px;
        float: left;
    }
</style>