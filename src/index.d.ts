import Vue, { WatchOptions } from 'vue';
import { ActionContext, CommitOptions, DispatchOptions } from 'vuex';

type Payload<T> = T extends (payload: infer P) => any ? P : never;
type ActionReturnValue<T> = T extends (payload: any) => infer R ? Promise<R> : Promise<{}>;

interface Dispatch<T> {
  <K extends keyof T>(type: K, payload?: Payload<T[K]>, options?: DispatchOptions): ActionReturnValue<T[K]>;
  <K extends keyof T>(payloadWithType: Payload<T[K]>, options?: DispatchOptions): ActionReturnValue<T[K]>;

  (type: string, payload: any, options: { root: true }): Promise<any>;
  <K extends { type: string }>(payloadWithType: K, options: { root: true }): Promise<any>;
}

interface Commit<T> {
  <K extends keyof T>(type: K, payload?: Payload<T[K]>, options?: CommitOptions): void;
  <K extends keyof T>(payloadWithType: Payload<T[K]>, options?: CommitOptions): void;
  (type: string, payload: any, options: { root: true }): void;
  <K extends { type: string }>(payloadWithType: K, options: { root: true }): void;
}

interface Context<Actions, State, Mutations = {}, Getters = {}, RootState = {}, RootGetters = {}>
  extends ActionContext<State, RootState> {
  dispatch: Dispatch<Actions>;
  commit: Commit<Mutations>;
  getters: Getters;
  rootState: RootState;
  rootGetters: RootGetters;
}

export type GetterTree<Getters, State, RootState = {}, RootGetters = {}> = {
  [K in keyof Getters]: (state: State, getters: Getters, rootState: RootState, rootGetters: RootGetters) => Getters[K]
};

export type MutationTree<Mutations, State> = {
  [K in keyof Mutations]: (state: State, payload: Payload<Mutations[K]>) => void
};

export type ActionTree<Actions, State, Mutations = {}, Getters = {}, RootState = {}, RootGetters = {}> = {
  [K in keyof Actions]: (
    context: Context<Actions, State, Mutations, Getters, RootState, RootGetters>,
    payload: Payload<Actions[K]>
  ) => ActionReturnValue<Actions[K]>
};

// export interface ModuleTree<R> {
//   [key: string]: Module<any, R>;
// }
export type ModuleTree<Modules> = { [K in keyof Modules]: Modules[K] };

export interface Module<State, RootState, Mutations = {}, Getters = {}, Actions = {}, RootGetters = {}> {
  namespaced?: boolean;
  state?: State | (() => State);
  getters?: GetterTree<Getters, State, RootState, RootGetters>;
  mutations?: MutationTree<Mutations, State>;
  actions?: ActionTree<Actions, State, Mutations, Getters, RootState, RootGetters>;
  modules?: ModuleTree<RootState>;
}
