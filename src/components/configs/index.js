/**
 * Created by muzi on 17-2-19.
 */

exports.install = function (Vue, options) {
    Vue.prototype.configParams = {
        park_support_online: [
            {
                label: '支持',
                value: 1
            },
            {
                label: '不支持',
                value: 2
            }
        ],
    }
}
