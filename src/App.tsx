import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { SearchParams } from "./pages/SearchParams";
import { ThemeProvider } from "./context/ThemesContext";
import Details from "./pages/Details/Details";
import "./App.css";

function App(): JSX.Element {
   return (
      <ThemeProvider>
         <div>
            <BrowserRouter>
               <header>
                  <Link to="/">
                     <h1>Adopt ME!</h1>
                  </Link>
               </header>
               <Switch>
                  <Route path="/details/:id">
                     <Details />
                  </Route>
                  <Route path="/">
                     <SearchParams />
                  </Route>
               </Switch>
            </BrowserRouter>
         </div>
      </ThemeProvider>
   );
}

export default App;
