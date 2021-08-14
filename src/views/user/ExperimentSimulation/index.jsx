import React, {useCallback, useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core';
import styles from './styles'
import {compose} from 'recompose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ParameterSelector from "../../../components/ParameterSelector";

import {ParameterService} from "../../../services/backend/parameterService"
import {MLService} from "../../../services/backend/mlService"
import ImageRenderStream from "../../../components/ImageRenderStream";
import Grid from '@material-ui/core/Grid';
import StatsRenderStream from "../../../components/StatsRenderStream";
import {RenderStreamService} from "../../../services/backend/renderStreamService";

function ExperimentSimulation(props){
    const {classes, className} = props;
    const [parameterGroups, setParameterGroups] = useState();
    const [tabState, setTabState] = React.useState(0);

    const [stateUpdate, setStateUpdate] = useState({
        epoch: '',
        policy_reward: '',
        sum_G_t: '',
        best_policy_reward: '',
        worst_policy_reward: '',
        policy_tours_base64: '',
        policy_reward_improvement: '',
        sum_G_t_reward_improvement: '',
        stats_title: ''
    });

    const [testingResult, setTestingResult] = useState({
        stop_amount: '',
        testing_runtime: '',
        amount_constructed_tours: '',
        mean_box_amount_per_tour: '',
        mean_volume_per_tour: '',
        mean_weight_per_tour: '',
        lost_volume_per_tour: '',
        lost_weight_per_tour: '',
        overall_distance: '',
        mean_distance_per_tour: '',
        overall_time_needed: '',
        average_time_needed_per_tour: '',
        final_tours_base64: '',
        stats_title: ''
    });

    const [base64ImageCords, setBase64ImageCords] = useState("");
    const [base64ImageStopNr, setBase64ImageStopNr] = useState("");

    const [base64ImagePolicyTour, setBase64ImagePolicyTour] = useState("");

    const [needsRefresh, setNeedsRefresh] = useState(true);
    const [updated, setUpdated] = useState(true);

    const [debounceStartTraining, setDebounceStartTraining] = useState(false);
    const [debounceStartTesting, setDebounceStartTesting] = useState(false);
    const [trainingState, setTrainingState] = useState(false);
    const [testingState, setTestingState] = useState(false);

    const loadParameterGroups = useCallback(() => {
        ParameterService.getParameterGroups().then(response => response.json()).then(response => {
            setParameterGroups(response);
        }, () => {
            alert('Error fetching parameter groups');
        });
    }, []);

    const startMLTrainingInstance = useCallback(() => {
        setDebounceStartTraining(true);
        setDebounceStartTesting(true);
        setTabState(2);
        MLService.startMLTraining().then(response => response.json()).then(response => {
            setDebounceStartTraining(false);
            setDebounceStartTesting(false);
        }, () => {
            alert('Error starting training instance');
            setDebounceStartTraining(false);
            setDebounceStartTesting(false)
        });
    }, []);

    const startMLTestingInstance = useCallback(() => {
        setDebounceStartTraining(true);
        setDebounceStartTesting(true);
        setTabState(3);
        MLService.startMLTesting().then(response => response.json()).then(obj => {
            setTestingResult({
                stop_amount: obj.stop_amount,
                testing_runtime: obj.testing_runtime,
                amount_constructed_tours: obj.amount_constructed_tours,
                mean_box_amount_per_tour: obj.mean_box_amount_per_tour,
                mean_volume_per_tour: obj.mean_volume_per_tour,
                mean_weight_per_tour: obj.mean_weight_per_tour,
                lost_volume_per_tour: obj.lost_volume_per_tour,
                lost_weight_per_tour: obj.lost_weight_per_tour,
                overall_distance: obj.overall_distance,
                mean_distance_per_tour: obj.mean_distance_per_tour,
                overall_time_needed: obj.overall_time_needed,
                average_time_needed_per_tour: obj.average_time_needed_per_tour,
                final_tours_base64: obj.final_tours_base64,
                stats_title: 'Testing-Stats'
            });
            setDebounceStartTraining(false);
            setDebounceStartTesting(false);
        }, () => {
            alert('Error starting testing instance');
            setDebounceStartTraining(false);
            setDebounceStartTesting(false)
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
            setTabState(0);
            }, () => {
            alert('Error updating parameter groups');
        });
    },[]);

    const handleParameterSave = () => {
        postParameterGroups(parameterGroups);
    };

    const handleStartTraining = () => {
        setTrainingState(true);
        setTestingState(false);
        startMLTrainingInstance();
    };

    const handleStartTesting = () => {
        setTrainingState(false);
        setTestingState(true);
        startMLTestingInstance();
    }

    const handleTabStateChange = (event, newValue) => {
        setTabState(newValue);
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


    useEffect(() => {
        if(trainingState){
            const sse = new EventSource('http://127.0.0.1:5000/ml-service/training/stream/stats');
            sse.onmessage = function(event) {
                const obj = JSON.parse(event.data);
                setStateUpdate({
                    epoch: obj.epoch,
                    policy_reward: obj.policy_reward,
                    sum_G_t: obj.sum_G_t,
                    best_policy_reward: obj.best_policy_reward,
                    worst_policy_reward: obj.worst_policy_reward,
                    policy_tours_base64: obj.policy_tours_base64,
                    policy_reward_improvement: obj.policy_reward_improvement,
                    sum_G_t_reward_improvement: obj.sum_G_t_reward_improvement,
                    stats_title: 'Training-Stats'
                });
            }
            sse.onerror = () => {
                console.log("sse failed");
                setTrainingState(false);
                sse.close();
            }
        }

    }, [trainingState, startMLTrainingInstance]);

    return(
        <div className={rootClassName}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h1>Bachelorarbeit - Pablo Stockhausen</h1>
            </div>
            <div className={classes.componentStructure}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                            {parameterGroups &&
                                <ParameterSelector
                                    handleParameterSave={handleParameterSave}
                                    parameterGroups={parameterGroups}
                                    updateParameterGroups={updateParameterGroups}
                                    updated={updated}
                                />
                            }
                    </Grid>
                    <Grid item xs={6}>
                        {parameterGroups &&
                            <ImageRenderStream
                                base64ImageCords={base64ImageCords}
                                base64ImageStopNr={base64ImageStopNr}
                                debounceStartTesting={debounceStartTesting}
                                debounceStartTraining={debounceStartTraining}
                                episodeNumber={parameterGroups['groups'][1]['num_episodes']}
                                handleStartTesting={handleStartTesting}
                                handleStartTraining={handleStartTraining}
                                handleTabStateChange={handleTabStateChange}
                                stateUpdate={stateUpdate}
                                tabState={tabState}
                                testingResult={testingResult}
                                testingState={testingState}
                                trainingState={trainingState}
                            />
                        }
                    </Grid>
                    <Grid item xs={3}>
                        <StatsRenderStream
                            stateUpdate={stateUpdate}
                            testingResult={testingResult}
                            testingState={testingState}
                            trainingState={trainingState}
                        />
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