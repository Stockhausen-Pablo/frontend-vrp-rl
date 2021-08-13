import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import React from "react";


function ParameterDetailForm(props){
    const {classes, className, parameterGroup} = props;

    const rootClassName = classNames(classes.root, className);

    return(
        <div className={classes.root}>
            <div>
                {Object.entries(parameterGroup).map((parameter, index) => (
                    <TextField
                        key={index}
                        id="filled-full-width"
                        label={parameter[0]}
                        style={{margin: 8}}
                        defaultValue={parameter[1]}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                ))}
            </div>
        </div>
    )
}

ParameterDetailForm.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    parameterGroup: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParameterDetailForm);