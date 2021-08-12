import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import {
    ExperimentSimulationUser
} from './views/user';

import {compose} from 'recompose';

function Routes(props){
    //props later logged in /out
    return(
        <Switch>
            <Route
                component={ExperimentSimulationUser}
                exact
                path="/vrp-simulation"
            />
        </Switch>
    )
}

export default compose(withRouter)(Routes);
