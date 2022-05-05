import { TState, TAction } from "../types";
import { initialState } from "./constants";

export function reducer(state: TState = initialState, action: TAction): TState {
   switch (action.type) {
      case "CHANGE THEME":
         return {
            ...state,
            theme: action.payload.theme,
            themeType: action.payload.themeType
         };
      default:
         return state;
   }
}
