/**
 * Created by root on 17-2-14.
 */

import * as types from './type'

export default {

    /**
     * 头部信息
     */
    SHOW_HEAD_SUCC ({commit}) {
        commit(types.HEAD_SHOW_SUCCESS);
    },
    SHOW_HEAD_FAIL ({commit}) {
        commit(types.HEAD_SHOW_FAIL);
    },

    /**
     * loading状态
     */
    LOADING_SHOW ({commit}) {
        commit(types.LOADING_SHOW);
    },
    LOADING_HIDE ({commit}) {
        commit(types.LOADING_HIDE);
    },


    /**
     * foot展示状态
     */
    FOOT_SHOW ({commit}) {
        commit(types.FOOT_SHOW);
    },
    FOOT_HIDE ({commit}) {
        commit(types.FOOT_HIDE);
    },

    UPDATE_MAKE ({commit}) {
        commit(types.UPDATE_MAKE);
    },
    UPDATE_DECLARE ({commit}) {
        commit(types.UPDATE_DECLARE);
    }

}
