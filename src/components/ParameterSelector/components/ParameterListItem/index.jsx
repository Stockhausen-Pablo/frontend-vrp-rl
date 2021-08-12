import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "../../styles";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import ParameterListItemDetails from "../ParameterListItemDetails";


function ParameterListItem(props){
    const {classes, className, parameterGroup, open, setOpen} = props;

    return(
        <ListItem button>
            <ListItemIcon>
                <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={parameterGroup.title} />
            {open ? <ExpandLess /> : <ExpandMore />}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ParameterListItemDetails/>
            </Collapse>
        </ListItem>
    );
}

ParameterListItem.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ParameterListItem);