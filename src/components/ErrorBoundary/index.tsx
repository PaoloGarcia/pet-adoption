import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";

type Props = {
   children: ReactNode
};

type State = {
   hasError: boolean,
   redirect: boolean,
};

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         hasError: false,
         redirect: false
      };
   }

   static getDerivedStateFromError(): State {
      return { hasError: true, redirect: false };
   }

   componentDidCatch(err: Error, info: ErrorInfo): void {
      // I log this to Sentry, Azure Monitor, New relic, TrackJS
      console.error("ErrorBoundary caught an error", err, info);
      if (this.state.hasError) {
         setTimeout(() => { this.setState({ redirect: true }) }, 5000);
      }
   }

   render(): ReactNode {
      const { redirect, hasError } = this.state;
      const { children } = this.props;

      if (redirect) {
         return <Redirect to="/" />;
      }
      return hasError
         ? (
            <h2>
               This listing has an error.{" "}
               <Link to="/">Click here</Link>{" "}
               to go to Home page or wait for 5 seconds
            </h2>
         )
         : children;
   }
}

export default ErrorBoundary;
