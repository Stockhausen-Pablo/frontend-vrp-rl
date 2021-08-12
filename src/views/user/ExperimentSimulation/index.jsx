import React, {useState} from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles'
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ParameterSelector from "../../../components/ParameterSelector";

function ExperimentSimulation(props){
    const {classes, className} = props;
    const rootClassName = classNames(classes.root, className);

    return(
        <div className={rootClassName}>
            <h1>test</h1>
            <ParameterSelector/>
        </div>
    );
}

ExperimentSimulation.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(ExperimentSimulation);