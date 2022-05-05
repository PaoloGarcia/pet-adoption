import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IPet } from "../../types";
import Carousel from "../../components/Carousel";

type Props = RouteComponentProps<{ id: string }>;

type State = {
   loading: boolean;
   pet: IPet;
};

class Details extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         loading: true,
         pet: {} as IPet
      };
   }

   componentDidMount() {
      (async () => {
         const res: Response = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
         );
         const data = await res.json();
         this.setState({
            loading: false,
            pet: data.pets[0]
         });
      })();
   }


   render() {
      const {
         pet: { name, animal, breed, description, city, state, images },
         loading
      } = this.state;
      return loading
         ? <h2>Loading...</h2>
         : (
            <div className="details">
               <Carousel images={images} />
               <div>
                  <h1>{name}</h1>
                  <h2>{animal} - {breed} - {city}, {state}</h2>
                  <button>Adopt</button>
                  <p>{description}</p>
               </div>
            </div>
         );
   }
}

export default withRouter(Details);
