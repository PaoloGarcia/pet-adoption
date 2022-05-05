import { IThemeCSS, TState } from "../types";

export const themes: { [k: string]: IThemeCSS } = {
   light: {
      backgroundColor: "#ccc",
      color: "#333"
   },
   dark: {
      backgroundColor: "#000",
      color: "#fff"
   }
};

export const initialState: TState = {
   theme: themes.light,
   themeType: "light"
};
