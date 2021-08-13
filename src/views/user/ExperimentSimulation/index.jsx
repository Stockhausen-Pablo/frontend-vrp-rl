import React, {useCallback, useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles'
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ParameterSelector from "../../../components/ParameterSelector";

import {ParameterService} from "../../../services/backend/parameterService"
import ImageRenderStream from "../../../components/ImageRenderStream";
import Grid from '@material-ui/core/Grid';
import StatsRenderStream from "../../../components/StatsRenderStream";

function ExperimentSimulation(props){
    const {classes, className} = props;
    const [parameterGroups, setParameterGroups] = useState();

    const [updated, setUpdated] = useState(true);

    const loadParameterGroups = useCallback(() => {
        ParameterService.getParameterGroups().then(response => response.json()).then(response => {
            setParameterGroups(response);
        }, () => {
            alert('Error fetching parameter groups');
        });
    }, []);

    const postParameterGroups = useCallback((updatedParameterGroups) => {
        ParameterService.updateParameterGroups(updatedParameterGroups).then(response => response.json()).then(response => {
        }, () => {
            alert('Error fetching parameter groups');
        });
    },[]);

    const handleParameterSave = () => {
        postParameterGroups(parameterGroups);
        setUpdated(true);
    };

    const updateParameterGroups = (parameter, parameterJSONIndex, e) => {
        const refParameterGroups = {...parameterGroups};
        const val = parseFloat(e);
        if (!isNaN(val)){
            refParameterGroups['groups'][parameterJSONIndex][parameter] = val;
        }else{
            refParameterGroups['groups'][parameterJSONIndex][parameter] = e;
        }
        setUpdated(false);
    }

    const rootClassName = classNames(classes.root, className);

    useEffect(() => {
        loadParameterGroups();
    }, []);

    console.log(parameterGroups)

    return(
        <div className={rootClassName}>
            <div>
                <h1>Bachelorarbeit - Pablo Stockhausen</h1>
            </div>
            <div className={classes.componentStructure}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                            {parameterGroups &&
                                <ParameterSelector
                                    parameterGroups={parameterGroups}
                                    updateParameterGroups={updateParameterGroups}
                                    updated={updated}
                                    handleParameterSave={handleParameterSave}
                                />
                            }
                    </Grid>
                    <Grid item xs={6}>
                        <ImageRenderStream/>
                    </Grid>
                    <Grid item xs={3}>
                        <StatsRenderStream/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

ExperimentSimulation.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default compose(withStyles(styles))(ExperimentSimulation);