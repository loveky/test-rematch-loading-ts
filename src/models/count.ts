import { createModel } from "@rematch/core";
import { RootModel } from ".";

export const count = createModel<RootModel>()({
  state: 0,
  reducers: {
    increment(state, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload, state) {
      console.log("This is current root state", state);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch.count.increment(1);
    },
    async incrementAsync2(payload, state) {
      console.log("This is current root state", state);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch.count.increment(2);
    },
  }),
});
