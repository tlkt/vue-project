/**
 * Created by root on 17-2-14.
 */
import {
    HEAD_SHOW_FAIL,
    HEAD_SHOW_SUCCESS,
    LOADING_HIDE,
    LOADING_SHOW,
    FOOT_HIDE,
    FOOT_SHOW,
    UPDATE_MAKE,
    UPDATE_DECLARE
} from './type'


const state = {
    headShow: true,
    loadingShow: false,
    footShow: true,
    updateId: 0,
}

const mutations = {

    [HEAD_SHOW_SUCCESS](state){
        state.headShow = true;
    },
    [HEAD_SHOW_FAIL](state){
        state.headShow = false;
    },
    [LOADING_SHOW](state){
        state.loadingShow = true;
    },
    [LOADING_HIDE](state){
        state.loadingShow = false;
    },
    [FOOT_HIDE](state){
        state.footShow = false;
    },
    [FOOT_SHOW](state){
        state.footShow = true;
    },
    [UPDATE_MAKE](state, n){
        state.updateId = n;
    },
    [UPDATE_DECLARE](state){
        state.updateId = 0;
    }
};

const getters = {
    headShow(state){
        return state.headShow;
    },
    loadingShow(state){
        return state.loadingShow;
    },
    footShow(state){
        return state.footShow;
    },
    updateId(state){
        return state.updateId;
    }
}


export default {
    state,
    mutations,
    getters
}
