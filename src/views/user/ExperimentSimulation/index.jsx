import React, {useCallback, useState} from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles'
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ParameterSelector from "../../../components/ParameterSelector";

import {ParameterService} from "../../../services/backend/parameterService"

function ExperimentSimulation(props){
    const {classes, className} = props;
    const [parameterGroups, setParameterGroups] = useState([]);

    const loadParameterGroups = useCallback(() => {
        ParameterService.getParameterGroups().then(response => response.json()).then(response => {
            setParameterGroups(response);
        }, () => {
            alert('Error fetching parameter groups');
        });
    }, [setParameterGroups]);

    const rootClassName = classNames(classes.root, className);

    console.log(parameterGroups)

    return(
        <div className={rootClassName}>
            <h1>test</h1>

        </div>
    );
}

ExperimentSimulation.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(ExperimentSimulation);