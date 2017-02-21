<template>
    <div id="parkinfo">
        <navHeader></navHeader>
        <el-breadcrumb separator="/" class="pd-g">
            <el-breadcrumb-item :to="{ path: '/' }">线下运维</el-breadcrumb-item>
            <el-breadcrumb-item>车场管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :label-position="labelPosition" label-width="80px" :model="searchForm" ref="searchForm">
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-form-item label="车场名称" prop="parking_name">
                        <el-input v-model="searchForm.parking_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车场状态" prop="status">
                        <el-select v-model="searchForm.status" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in park_status"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车场类型" prop="parking_type">
                        <el-select v-model="searchForm.parking_type" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in park_types"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="车场位置" prop="province">
                        <el-select v-model="searchForm.province" clearable placeholder="请选择" @change="province_change">
                            <el-option
                                    v-for="item in park_province"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="searchForm.city" clearable placeholder="请选择" @change="city_change">
                            <el-option
                                    v-for="item in park_city"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="searchForm.area" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in park_area"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车场版本" prop="arm_version">
                        <el-select v-model="searchForm.arm_version" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in park_version"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="线上支付" prop="support_online">
                        <el-select v-model="searchForm.support_online" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in park_support_online"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :md="{span:4, offset:20}">
                    <el-button type="primary" icon="search" @click="submitSearch">搜索</el-button>
                    <el-button @click="resetForm('searchForm')" type="warn">重置</el-button>
                    <el-button @click="create" type="success">新建</el-button>
                </el-col>
            </el-row>
        </el-form>
        <!--表格-->
        <el-table
                :data="parkinfos"
                style="width: 100%"
                :row-class-name="tableRowClassName">
            <el-table-column
                    prop="park_code"
                    label="车场编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="parking_name"
                    label="车场名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="车场状态">
            </el-table-column>

            <el-table-column
                    prop="space_total"
                    label="总车位">
            </el-table-column>
            <el-table-column
                    prop="space_empty"
                    label="空车位">
            </el-table-column>
            <el-table-column
                    label="车牌识别率">
                <template scope="scope">
                    {{scope.row.recongnize_rate | stringAddCharacter('%')}}
                </template>
            </el-table-column>
            <el-table-column
                    label="车场占有率">
                <template scope="scope">
                    {{scope.row.used_rate | decToPercent}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="principal"
                    label="车场负责人">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.row.id)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalList">
        </el-pagination>
    </div>
</template>
<script>
    import navHeader from '../public/Nav.vue';
    export default {
        data(){
            return {
                labelPosition: 'right',
                searchForm: {
                    parking_name: '',
                    status: '',
                    province: '',
                    area: '',
                    city: '',
                    parking_type: '',
                    arm_version: '',
                    support_online: ''
                },
                parkinfos: [],
                park_status: [],
                park_types: [],
                park_province: [],
                park_city: [],
                park_area: [],
                park_version: [],
                park_support_online: [],
                totalList: 0,
                pageSize: 0,
                currentPage: 1,
            }
        },
        created(){
            this.park_support_online = this.configParams.park_support_online;
            this.getArrayDataByGet('park_status', '/parkinfo/getallstatus', {}, 'parkinfo_status');
            this.getArrayDataByGet('park_types', '/parkinfo/getalltype', {}, 'parkinfo_types');
            this.getLocation('park_province', 1, '0');
            this.getArrayDataByGet('park_version', '/parkinfo/getallversion', {}, 'parkinfo_version');
            this.httpGetList('/parkinfo/index', {}, 'parkinfos');
        },
        methods: {
            handleCurrentChange(page){
                let params = this.searchForm;
                if(params != undefined){
                    params['page'] = page;
                }
                this.httpGetList('/parkinfo/index', {params:params}, 'parkinfos');
            },
            submitSearch(){
                let params = this.searchForm;
                this.httpGetList('/parkinfo/index',{params:params},'parkinfos');
            },
            province_change(val){
                this.park_city = [];
                this.searchForm.city = '';
                this.park_area = [];
                this.searchForm.area = '';
                if (val != '') {
                    this.getLocation('park_city', 2, val);
                }
            },
            city_change(val){
                this.park_area = [];
                this.searchForm.area = '';
                if (val != '') {
                    this.getLocation('park_area', 3, val);
                }
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleDelete(id){
                this.httpPost('parkinfo/delete',{id:id},'/parkinfo');
                this.submitSearch();
            },
            handleEdit(id){
                this.$store.commit('UPDATE_MAKE',id);
                this.$router.push('/parkinfoform');
            },
            create(){
                this.$router.push('/parkinfoform');
            }
        },
        components: {
            navHeader
        }
    };
</script>
<style scoped>
    .pd-g {
        padding: 20px;
    }
</style>