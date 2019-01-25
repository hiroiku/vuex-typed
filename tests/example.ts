/*
 * Notice that it is annotated according to the type declared by the interface.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { ActionTree, GetterTree, MutationTree } from 'vuex-typed';

Vue.use(Vuex);

/*
 * State
 */

export interface IState {
  date: Date;
}

const state: IState = {
  date: new Date()
};

/*
 * Getters
 */

interface IGetters {
  time: number;
}

const getters: GetterTree<IGetters, IState> = {
  time: state => state.date.getTime()
};

/*
 * Mutations
 */

interface IMutations {
  setDate: Date;
}

const mutations: MutationTree<IMutations, IState> = {
  setDate: (state, payload) => {
    state.date = payload;
  }
};

/*
 * Actions
 */

interface IActions {
  set: (payload: Date) => void;
  diff: (payload: Date) => number;
}

const actions: ActionTree<IActions, IState, IMutations, IGetters> = {
  set: async ({ commit }, payload) => {
    commit('setDate', payload);
  },
  diff: async ({ getters }, payload) => {
    return payload.getTime() - getters.time;
  }
};

/*
 * Export
 */

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
