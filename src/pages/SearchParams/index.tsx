import React, { useContext, useEffect, useState } from "react";
import { IPet, TAnimal } from "../../types";
import { useBreedList } from "../../hooks/useBreedList";
import { useInput } from "../../hooks/useInput";
import ThemeContext from "../../context/ThemesContext";
import PetsList from "../../components/PetsList";
import { ANIMALS } from "./constants";

export function SearchParams(): JSX.Element {
    const [{ theme, themeType }, setTheme] = useContext(ThemeContext);
    const [{ location, animal, breed }, setValues] = useInput({
        animal: "",
        breed: "",
        location: "Seattle, WA",
        theme: "light"
    });
    const [pets, setPets] = useState<IPet[]>([]);
    const [breedList] = useBreedList(animal as TAnimal);

    const requestPets = async (): Promise<void> => {
        try {
            const response: Response = await fetch(
                `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
            );
            if (!response.ok) {
                throw new Error("Unexpected error while fetching ta from service");
            }
            const data = await response.json();
            setPets(data?.pets ?? []);
        } catch (err: unknown) {
            console.error(err);
        }
    }

    useEffect(() => {
        requestPets();
    }, []);

    const renderedSelectOptions = (arrOptions: string[]): JSX.Element[] => {
        return arrOptions.map(
            (el: string): JSX.Element => <option key={el} value={el}>{el}</option>
        );
    };

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        requestPets();
    };

    const onChangeTheme = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setValues(e);
        setTheme(e.target.value);
    };

    return (
        <div className="search-params">
            <form onSubmit={onSubmitForm}>
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        name="location"
                        value={location}
                        onChange={setValues}
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        value={animal}
                        onChange={setValues}
                    >
                        <option />
                        {renderedSelectOptions(ANIMALS)}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        name="breed"
                        value={breed}
                        onChange={setValues}
                    >
                        {renderedSelectOptions(breedList)}
                    </select>
                </label>
                <label htmlFor="theme">
                    Theme
                    <select
                        id="theme"
                        value={themeType}
                        onChange={onChangeTheme}
                        onBlur={onChangeTheme}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
                <button style={theme} type="submit">Submit</button>
            </form>
            <PetsList pets={pets} />
        </div >
    );
}
