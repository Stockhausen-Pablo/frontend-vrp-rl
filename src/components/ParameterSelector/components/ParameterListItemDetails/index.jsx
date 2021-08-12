import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "../../styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import React from "react";


function ParameterListItemDetails(props){
    const {classes, className, parameters} = props;

    return(
        <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
            </ListItem>
        </List>
    );
}

ParameterListItemDetails.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    parameters: PropTypes.array.isRequired,
};

export default withStyles(styles)(ParameterListItemDetails);