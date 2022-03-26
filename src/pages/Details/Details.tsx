import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPet, IPetAPIResponse } from "../../types";
import ThemeContext from "../../context/ThemesContext";
import Carousel from "../../components/Carousel";
import ErrorBoundary from "../../components/ErrorBoundary";
import Modal from "../../components/Modal";

function Details(): JSX.Element {
    const { id }: { id: string } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [pet, setPet] = useState<IPet>({} as IPet);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const res: Response = await fetch(
                `http://pets-v2.dev-apis.com/pets?id=${id}`
            );
            const data: IPetAPIResponse = await res.json();
            setPet(data.pets[0]);
            setLoading(false);
        })();
    }, [id]);

    const toggleModal = (): void => {
        setShowModal((prevShowModal: boolean): boolean => !prevShowModal);
    };

    const goAdopt = (): void => {
        window.location.replace("https://frontendmasters.com/");
    };

    const { name, animal, breed, city, state, description, images } = pet;

    return loading
        ? <h2>Loading...</h2>
        : (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {city}, {state}</h2>
                    <ThemeContext.Consumer>
                        {([{ theme }]) => {
                            return (
                                <button style={theme} onClick={toggleModal}>
                                    Adopt
                                </button>
                            )
                        }}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    {
                        showModal && (
                            <Modal>
                                <ThemeContext.Consumer>
                                    {([{ theme }]) => (
                                        <>
                                            <h1>Would you like to adopt {name}?</h1>
                                            <div className="buttons">
                                                <button style={theme} onClick={goAdopt}>Yes</button>
                                                <button style={theme} onClick={toggleModal}>No</button>
                                            </div>
                                        </>
                                    )}
                                </ThemeContext.Consumer>
                            </Modal>
                        )
                    }
                </div>
            </div>
        );
}

function DetailsWithErrorBoundary() {
    return (
        <ErrorBoundary>
            <Details />
        </ErrorBoundary>
    );
}

export { Details };
export default DetailsWithErrorBoundary;
