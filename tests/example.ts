/*
 * Attention that it is annotated according to the type declared by the interface.
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
  now: () => Promise<number>;
}

const actions: ActionTree<IActions, IState, IMutations, IGetters> = {
  set: ({ commit }, payload) => {
    commit('setDate', payload);
  },
  diff: ({ getters }, payload) => {
    return payload.getTime() - getters.time;
  },
  now: () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(new Date().getTime());
      }, 1000)
    );
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
