import React from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ParameterListItem from "./components/ParameterListItem";

function ParameterSelector(props){
    const {classes, className, parameterGroups} = props;
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
                    {parameterGroups.map((parameterGroup, index) => (
                        <ParameterListItem parameterGroup={parameterGroup}/>
                    ))}
                </List>
            </Paper>
        </div>
    );
}

ParameterSelector.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ParameterSelector);
