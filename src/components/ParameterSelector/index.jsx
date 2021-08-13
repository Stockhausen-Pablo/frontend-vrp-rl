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
    const {classes, className, parameterGroups, updateParameterGroups, updated, handleParameterSave} = props;

    const rootClassName = classNames(classes.root, className);

    return(
        <div className={rootClassName}>
            <Paper style={{height: 800, maxHeight: 800, overflow: 'auto'}} elevation={3}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            VRP-ML
                        </ListSubheader>
                    }
                >
                    {parameterGroups.groups.map((parameterGroup, index) => (
                        <ParameterListItem
                            key={index}
                            parameterGroup={parameterGroup}
                            parameterJSONIndex={index}
                            updateParameterGroups={updateParameterGroups}
                        />
                    ))}
                </List>
            </Paper>
            <Button
                className={classes.button}
                color="primary"
                disabled={updated}
                onClick={handleParameterSave}
                variant="contained"
            >
                Save
            </Button>
        </div>
    );
}

ParameterSelector.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    handleParameterSave: PropTypes.func.isRequired,
    parameterGroups: PropTypes.object.isRequired,
    updateParameterGroups: PropTypes.func.isRequired,
    updated: PropTypes.bool.isRequired,
}

export default withStyles(styles)(ParameterSelector);
