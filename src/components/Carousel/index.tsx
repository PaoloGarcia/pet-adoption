import { Component, MouseEvent, ReactNode } from "react";

type Props = {
   images: string[]
};

type State = {
   active: number
};

class Carousel extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         active: 0
      };
      this.onClickImage = this.onClickImage.bind(this);
      this.renderImages = this.renderImages.bind(this);
   }

   static defaultProps: Props = {
      images: ["http://pets-images.dev-apis.com/pets/none.jpg"]
   };

   onClickImage(e: MouseEvent<HTMLElement>): void {
      if (!(e.target instanceof HTMLElement)) {
         return;
      }
      this.setState({ active: Number(e.target.dataset.index) });
   }

   renderImages(images: string[], activeImageIndex: number): JSX.Element[] {
      return images.map((image: string, index: number): JSX.Element => (
         <img
            key={image}
            src={image}
            data-index={index}
            alt="pet to adopt"
            onClick={this.onClickImage}
            className={index === activeImageIndex ? "active" : ""}
            role="button"
            tabIndex={0}
         />
      ));
   }

   render(): ReactNode {
      const { images } = this.props;
      const { active } = this.state;

      return (
         <div className="carousel">
            <img src={images[active]} alt="animal" />
            <div className="carousel-smaller">
               {this.renderImages(images, active)}
            </div>
         </div>
      );
   }
}

export default Carousel;
