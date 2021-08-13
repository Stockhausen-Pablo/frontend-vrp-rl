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
import {RenderStreamService} from "../../../services/backend/renderStreamService";

function ExperimentSimulation(props){
    const {classes, className} = props;
    const [parameterGroups, setParameterGroups] = useState();

    const [base64ImageCords, setBase64ImageCords] = useState("");
    const [base64ImageStopNr, setBase64ImageStopNr] = useState("");

    const [needsRefresh, setNeedsRefresh] = useState(true);
    const [updated, setUpdated] = useState(true);

    const loadParameterGroups = useCallback(() => {
        ParameterService.getParameterGroups().then(response => response.json()).then(response => {
            setParameterGroups(response);
        }, () => {
            alert('Error fetching parameter groups');
        });
    }, []);

    const loadImageContextPlots = useCallback(() => {
        RenderStreamService.getImageContextPlots().then(response => response.json()).then(response => {
            setBase64ImageCords(response.plot1_coords);
            setBase64ImageStopNr(response.plot2_stopnr);
        }, () => {
            alert('Error fetching coord context plots');
        });
    },[]);

    const postParameterGroups = useCallback((updatedParameterGroups) => {
        ParameterService.updateParameterGroups(updatedParameterGroups).then(response => response.json()).then(response => {
            setUpdated(true);
            setNeedsRefresh(true);
            setBase64ImageCords("");
            setBase64ImageStopNr("");
            }, () => {
            alert('Error updating parameter groups');
        });
    },[]);

    const handleParameterSave = () => {
        postParameterGroups(parameterGroups);
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
        if (needsRefresh === true){
            loadParameterGroups();
            loadImageContextPlots();
            setNeedsRefresh(false);
        }
    }, [needsRefresh, loadParameterGroups, loadImageContextPlots]);


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
                        <ImageRenderStream
                            base64ImageCords={base64ImageCords}
                            base64ImageStopNr={base64ImageStopNr}
                        />
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