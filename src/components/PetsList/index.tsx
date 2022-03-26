import { IPet } from "../../types";
import Pet from "../Pet";

type Props = {
    pets: IPet[]
};

function PetsList({ pets }: Props): JSX.Element {
    const renderPets: JSX.Element[] = pets.map((pet: IPet): JSX.Element => (
        <Pet {...pet} location={`${pet.city}, ${pet.state}`} key={pet.id} />
    ));

    return (
        <div className="search">
            {pets.length > 0 ? renderPets : <h1>Pets not found</h1>}
        </div>
    );
}

export default PetsList;