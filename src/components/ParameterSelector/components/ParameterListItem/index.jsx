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
import Collapse from "@material-ui/core/Collapse";
import ParameterListItemDetails from "../ParameterListItemDetails";
import classNames from "classnames";


function ParameterListItem(props){
    const {classes, className, parameterGroup, updateParameterGroups, parameterJSONIndex} = props;

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const rootClassName = classNames(classes.root, className);

    return(
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <LabelImportantIcon/>
                </ListItemIcon>
                <ListItemText primary={parameterGroup.title}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ParameterListItemDetails
                    parameterGroup={parameterGroup}
                    updateParameterGroups={updateParameterGroups}
                    parameterJSONIndex={parameterJSONIndex}
                />
            </Collapse>
        </div>
    );
}

ParameterListItem.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    parameterGroup: PropTypes.object.isRequired,
    updateParameterGroups: PropTypes.func.isRequired,
    parameterJSONIndex: PropTypes.number.isRequired
}

export default withStyles(styles)(ParameterListItem);