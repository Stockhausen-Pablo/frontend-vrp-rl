import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import classNames from "classnames";
import TextField from "@material-ui/core/TextField";
import React from "react";


function ParameterDetailForm(props){
    const {classes, className, parameterGroup, updateParameterGroups, parameterJSONIndex} = props;

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
                        onChange={event => {
                            const {value} = event.target;
                            updateParameterGroups(parameter[0], parameterJSONIndex, value);
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
    updateParameterGroups: PropTypes.func.isRequired,
    parameterJSONIndex: PropTypes.number.isRequired
};

export default withStyles(styles)(ParameterDetailForm);