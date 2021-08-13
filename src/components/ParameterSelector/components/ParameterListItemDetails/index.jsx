import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "../../styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import classNames from "classnames";
import ParameterDetailForm from "../ParameterDetailForm";


function ParameterListItemDetails(props){
    const {classes, className, parameterGroup} = props;

    const rootClassName = classNames(classes.root, className);

    return(
        <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
                <ParameterDetailForm parameterGroup={parameterGroup}/>
            </ListItem>
        </List>
    );
}

ParameterListItemDetails.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    parameterGroup: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParameterListItemDetails);