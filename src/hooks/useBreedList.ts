import { useEffect, useState } from "react";
import { TAnimal, IBreedListAPIResponse } from "../types";

type TStatus = "loading" | "loaded" | "unloaded";

const localChache: { [k: string]: string[] } = {};

export function useBreedList(animal: TAnimal): [string[], TStatus] {
    const [breedList, setBreedList] = useState<string[]>([]);
    const [status, setStatus] = useState<TStatus>("unloaded");

    const requestBreedList = async (): Promise<void> => {
        setBreedList([]);
        setStatus("loading");
        try {
            const response: Response = await fetch(
                `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
            if (!response.ok) {
                throw new Error("Unexpected error while fetching data from service");
            }
            const data: IBreedListAPIResponse = await response.json();
            localChache[animal] = data.breeds ?? [];
            setBreedList(data.breeds ?? []);
        } catch (err: unknown) {
            console.error(err);
        } finally {
            setStatus("loaded");
        }
    }

    useEffect(() => {
        if (!animal) {
            setBreedList([]);
        } else if (localChache[animal]) {
            setBreedList(localChache[animal]);
        } else {
            void requestBreedList();
        }
    }, [animal]);

    return [breedList, status];
}
