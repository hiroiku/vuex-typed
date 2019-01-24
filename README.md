# Typed Vuex

[![Vue>=2.5](https://img.shields.io/badge/vue->%3D2.5-brightgreen.svg)](Vue>=2.5)
[![Vuex>=3.0](https://img.shields.io/badge/vuex->%3D3.0-brightgreen.svg)](Vuex>=3.0)
[![TypeScript>=2.8](https://img.shields.io/badge/typescript->%3D2.8-brightgreen.svg)](TypeScript>=2.8)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Installation

```sh
npm install --save-dev @nutype/vuex-typed
```

## Example

```ts
/*
 * Notice that it is annotated according to the type declared by the interface.
 */

import { ActionTree, GetterTree, MutationTree } from '@/index';
import Vue from 'vue';
import Vuex from 'vuex';

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
  setDate: (payload: Date) => void;
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

const actions: ActionTree<IActions, IState, IGetters, IMutations> = {
  set: async ({ commit }, payload) => {
    commit('setDate', payload);
  },
  diff: async ({ getters }, payload) => {
    return getters.time - payload.getTime();
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
```

## LICENSE

MIT
