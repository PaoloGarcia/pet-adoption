import { useState, ChangeEvent, FormEvent } from "react";

type TMultiEvent = ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    | FormEvent<HTMLFormElement>;
type TObjStrStr = { [k: string]: string };

export function useInput(initialValues: TObjStrStr): [TObjStrStr, (e: TMultiEvent) => void] {
    const [values, setValues] = useState<TObjStrStr>(initialValues);

    const onChangeValues = (e: TMultiEvent): void => {
        if (!(e.target instanceof HTMLElement)) {
            return;
        }
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return [values, onChangeValues];
}
