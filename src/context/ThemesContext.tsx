import React, { createContext, useReducer } from "react";
import { TState } from "../types";
import { themes, initialState } from "./constants";
import { reducer } from "./helpers";

const ThemeContext = createContext<[TState, (newThemeType: string) => void]>([
    {} as TState,
    () => { }
]);

type Props = {
    children: React.ReactNode
};

export function ThemeProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onChangeTheme = (newThemeType: string): void => {
        dispatch({
            type: "CHANGE THEME",
            payload: {
                theme: themes[newThemeType] ?? themes.light,
                themeType: newThemeType ?? "light"
            }
        });
    };

    return (
        <ThemeContext.Provider value={[state, onChangeTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
