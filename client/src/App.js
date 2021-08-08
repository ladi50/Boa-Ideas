import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Orders from "./pages/Orders";
import Order from "./pages/Order/Order";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Orders />
                </Route>
                <Route path="/order/:orderId" exact>
                    <Order />
                </Route>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;