export type TAnimal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export type IPet = {
    id: number;
    location: string;
    city: string;
    state: string;
    name: string;
    animal: TAnimal;
    breed: string;
    description: string;
    images: string[];
};

export type IThemeCSS = {
    backgroundColor: string;
    color: string;
};

export type TState = {
    theme: IThemeCSS;
    themeType: string;
};

export type TAction = {
    type: string;
    payload?: any;
};

export type IPetAPIResponse = {
    numberOfResults: number;
    startIndex: number;
    endIndex: number;
    hasNext: boolean;
    pets: IPet[];
};

export type IBreedListAPIResponse = {
    animal: TAnimal;
    breeds: string[];
};
