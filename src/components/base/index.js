exports.install = function (Vue, options) {
    Vue.prototype.loadStorge = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    Vue.prototype.saveStorge = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };
    Vue.prototype.deleteStorge = function (key) {
        localStorage.removeItem(key);
    };
    Vue.prototype.getLocation = function (key, levelType, parent) {
        let option = levelType != 1 ? key + '_' + parent : key;
        this.getArrayDataByPost(key, '/default/getlocation', {leveltype: levelType, parent: parent}, option);
    };
    /**
     * get Array data by get
     * @param key 实例变量
     * @param url　接口地址
     * @param params　接口参数
     * @param tag　local_storge 存储 key
     */
    Vue.prototype.getArrayDataByGet = function (key, url, params, tag) {
        let options = this.loadStorge(tag);
        if (options !== null) {
            this.$set(this, key, options);
        } else {
            this.$http.get(url, params)
                .then(function (response) {
                    if (response.data.status == 200) {
                        this.$set(this, key, response.data.data);
                        this.saveStorge(tag, response.data.data);
                    } else {
                        this.$message({
                            showClose: true,
                            message: '系统错误',
                            type: 'error'
                        });
                    }
                }.bind(this))
                .catch(function (error) {
                    return Promise.reject(error);
                });
        }
    };
    /**
     * get Array data by post
     * @param key 实例变量
     * @param url　接口地址
     * @param params　接口参数
     * @param tag　local_storge 存储 key
     */
    Vue.prototype.getArrayDataByPost = function (key, url, params, tag) {
        let options = this.loadStorge(tag);
        if (options !== null) {
            this.$set(this, key, options);
        } else {
            this.$http.post(url, params)
                .then(function (response) {
                    if (response.data.status == 200) {
                        this.$set(this, key, response.data.data);
                        this.saveStorge(tag, response.data.data);
                    } else {
                        this.$message({
                            showClose: true,
                            message: '系统错误',
                            type: 'error'
                        });
                    }
                }.bind(this))
                .catch(function (error) {
                    return Promise.reject(error);
                });
        }
    };

    /**
     * 发起post接口请求
     * @param url 接口地址
     * @param params 接口参数
     * @param router 不等于''时,调用完接口跳转路由
     */
    Vue.prototype.httpPost = function (url, params, reouter = '') {
        this.$http.post(url, params)
            .then(function (response) {
                if (response.status == 200) {
                    this.$message({
                        showClose: true,
                        message: response.data.message,
                        type: 'success'
                    });
                    if (router != '') {
                        this.$router.push(router);
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '系统错误',
                        type: 'error'
                    });
                }
            }.bind(this))
            .catch(function (error) {
                return Promise.reject(error);
            });
    };

    /**
     * 表单post提交
     * @param url 接口地址　params　接口调用参数　router 请求成功后跳转路由
     */
    Vue.prototype.httpPostForm = function (url, params, router = '') {
        this.$http.post(url, params)
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
                    this.$message({
                        showClose: true,
                        message: response.data.message,
                        type: 'success'
                    });

                    if (router != '') {
                        this.$router.push(router);
                    }

                } else if (data.status == 422) {
                    for (var key in data.data) {
                        if (data.data[key].length != 0) {
                            this.$set(this.errors, key, data.data[key][0]);
                        }
                    }
                }
            }.bind(this))
            .catch(function (error) {
                return Promise.reject(error);
            });
    };

    /**
     * view 获取数据
     * @param url
     * @param params
     * @param router
     */
    Vue.prototype.httpGetView = function (url, params, formName) {
        this.$http.get(url, params)
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
                        if(key != 'others' && key != 'isNewRecord'){
                            this.$set(this.form, key, data.data[key]);
                            console.log('view:'+key+':'+data.data[key]);
                        }
                    }

                } else if (data.status == 422) {
                    this.$message({
                        showClose: true,
                        message: response.data.message,
                        type: 'error'
                    });
                }
            }.bind(this))
            .catch(function (error) {
                return Promise.reject(error);
            });
    };


    /**
     * 获取列表数据
     * @param url 接口地址　params 接口参数　key 表格对应的todolist
     */
    Vue.prototype.httpGetList = function (url, params, key) {
        this.$http.get(url, params)
            .then(function (response) {
                if (response.status == 200) {
                    this.$set(this, key, response.data.data);
                    this.$set(this, 'totalList', response.data._meta.totalCount);
                    this.$set(this, 'pageSize', response.data._meta.perPage);
                    this.$set(this, 'currentPage', response.data._meta.currentPage);
                } else {
                    this.$message({
                        showClose: true,
                        message: '系统错误',
                        type: 'error'
                    });
                }
            }.bind(this))
            .catch(function (error) {
                return Promise.reject(error);
            });
    }
};