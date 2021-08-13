import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import React from "react";


function ImageRenderStream(props){
    const {classes, className} = props;

    const rootClassName = classNames(classes.root, className);

    return(
        <div className={rootClassName}>
            <Paper style={{height: 800, maxHeight: 800, overflow: 'auto'}} elevation={3}>
                test
            </Paper>
        </div>
    )
}

ImageRenderStream.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImageRenderStream);