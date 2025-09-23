import Product from "components/Product";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
import PageNotFound from "./components/commons/PageNotFound";
// eslint-disable-next-line import/extensions

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
