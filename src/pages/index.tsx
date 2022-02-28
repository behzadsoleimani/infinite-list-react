
import React from "react";
import { Route , BrowserRouter as Router , Switch } from "react-router-dom";
import VendorList from "./vendor-list";
import Home from "./home";


export default function Page(props: any) {
   


    return (
        <Router>
          <Switch>
            <Route path="/vendor-list">
            <VendorList {...props} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    );
}
