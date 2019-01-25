# vuex-typed

[![Vue>=2.5](https://img.shields.io/badge/vue->%3D2.5-brightgreen.svg)](Vue>=2.5)
[![Vuex>=3.0](https://img.shields.io/badge/vuex->%3D3.0-brightgreen.svg)](Vuex>=3.0)
[![TypeScript>=2.8](https://img.shields.io/badge/typescript->%3D2.8-brightgreen.svg)](TypeScript>=2.8)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Vuex can be strongly-typed by interface.  
And you can use this with a very simple declaration.

Unlike existing projects, you can also strongly-typed the promise returned from dispatch.  
This is an implementation for when the \$store on vue can now be typed in the future.

## Installation

```sh
npm install --save-dev vuex-typed
```

## Example

```ts
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
