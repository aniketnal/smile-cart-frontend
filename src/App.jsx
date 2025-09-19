import Home from "components/Home";
import Product from "components/Product";
import { NavLink, Route, Switch } from "react-router-dom";

import "./App.css";
import PageNotFound from "./components/PageNotFound";
// eslint-disable-next-line import/extensions

const App = () => (
  <>
    <div className="mx-4 flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Product} path="/product" />
      <Route exact component={Home} path="/" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
