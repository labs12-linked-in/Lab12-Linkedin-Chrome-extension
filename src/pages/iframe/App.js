import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Forms from './components/views/Forms/Forms'
import NewForm from './components/views/Forms/NewForms'
import UpdateIndivForm from './components/views/Forms/UpdateForm'
import Scrape from './components/views/Scape/Scape'
import EditScrape from './components/views/Scape/EditScrape'


class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Forms} />
                        <Route path='/new-form' component={NewForm} />
                        <Route path='/update-form' component={UpdateIndivForm} />
                        <Route path='/scrape' component={Scrape} />
                        <Route path='/edit-scrape' component={EditScrape} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App