import React from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ParameterListItem from "./components/ParameterListItem";
import Button from "@material-ui/core/Button";


function ParameterSelector(props){
    const {classes, className, parameterGroups} = props;

    const rootClassName = classNames(classes.root, className);

    return(
        <div className={rootClassName}>
            <Paper>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            VRP-ML
                        </ListSubheader>
                    }
                    className={classes.root}
                >
                    {parameterGroups.groups.map((parameterGroup, index) => (
                        <ParameterListItem
                            key={index}
                            parameterGroup={parameterGroup}
                        />
                    ))}
                </List>
                <Button className={classes.button} variant="contained" color="primary" disabled>
                    Save
                </Button>
            </Paper>
        </div>
    );
}

ParameterSelector.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    parameterGroups: PropTypes.object.isRequired
}

export default withStyles(styles)(ParameterSelector);
