import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import Paper from "@material-ui/core/Paper";
import React from "react";
import classNames from "classnames";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

import TimerIcon from '@material-ui/icons/Timer';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import BarChartIcon from '@material-ui/icons/BarChart';
import Button from "@material-ui/core/Button";

function StatsRenderStream(props){
    const {classes, className, stateUpdate, trainingState, testingState, testingResult, deleteState, handleDeleteModel} = props;

    const rootClassName = classNames(classes.root, className);

    const renderSwitch = (improvement_value) => {
        switch(improvement_value) {
            case 0:
                return <ArrowDownwardIcon className={classes.worseIcon}/>;
            case 1:
                return <ArrowUpwardIcon className={classes.improveIcon}/>;
            case 2:
                return <DragHandleIcon className={classes.equalIcon}/>;
            default:
                return <NotInterestedIcon />;
        }
    }

    return(
        <div className={rootClassName}>
            <Paper style={{height: 800, maxHeight: 800, overflow: 'auto'}} elevation={3}>
                {trainingState && !testingState ?
                    <div>
                    <h2>&nbsp;{stateUpdate.stats_title}</h2>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AssistantPhotoIcon color='primary'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={stateUpdate.epoch.length > 0 ? (parseInt(stateUpdate.epoch)) + 1 : ''}
                                secondary="Epoch"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {renderSwitch(parseInt(stateUpdate.policy_reward_improvement))}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stateUpdate.policy_reward} secondary="Current Policy Reward"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    {renderSwitch(parseInt(stateUpdate.sum_G_t_reward_improvement))}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stateUpdate.sum_G_t} secondary="Summed cumulative Reward"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <TrendingUpIcon className={classes.improveIcon}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stateUpdate.best_policy_reward}
                                          secondary="Best overall Policy Reward"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <TrendingDownIcon className={classes.worseIcon}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={stateUpdate.worst_policy_reward}
                                          secondary="Worst overall Policy Reward"/>
                        </ListItem>
                    </List>
                    </div>
                :
                testingState && !trainingState ?
                    <div>
                        <h2>&nbsp;{testingResult.stats_title}</h2>
                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AssistantPhotoIcon color='primary'/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={testingResult.stop_amount}
                                    secondary="Stop Amount"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AssistantPhotoIcon color='primary'/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.amount_constructed_tours} secondary="Amount of Tours"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TimerIcon color='primary'/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.testing_runtime} secondary="Testing Runtime in s"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MotorcycleIcon className={classes.statIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.overall_distance} secondary="Overall needed Distance"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MotorcycleIcon className={classes.statIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.mean_distance_per_tour} secondary="Average Distance per Tour"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TimelapseIcon className={classes.statIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.overall_time_needed} secondary="Overall needed Time"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TimelapseIcon className={classes.statIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.average_time_needed_per_tour} secondary="Average Time per Tour"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BarChartIcon className={classes.equalIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.mean_box_amount_per_tour}
                                              secondary="Average Box Amount per Tour"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BarChartIcon className={classes.equalIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.mean_volume_per_tour}
                                              secondary="Average Volume per Tour"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BarChartIcon className={classes.equalIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.mean_weight_per_tour}
                                              secondary="Average Weight per Tour"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TrendingDownIcon className={classes.worseIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.lost_volume_per_tour}
                                              secondary="Lost Volume per Tour"/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TrendingDownIcon className={classes.worseIcon}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={testingResult.lost_weight_per_tour}
                                              secondary="Lost Weight per Tour"/>
                            </ListItem>
                        </List>
                    </div>
                :
                    <p>No Instance found.</p>
                }
            </Paper>
            <Button
                className={classes.button}
                disabled={deleteState}
                onClick={handleDeleteModel}
                variant="contained"
            >
                Delete ML-Model
            </Button>
        </div>
    )
}

StatsRenderStream.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    deleteState: PropTypes.bool.isRequired,
    handleDeleteModel: PropTypes.func.isRequired,
    stateUpdate: PropTypes.object.isRequired,
    testingResult: PropTypes.object.isRequired,
    testingState: PropTypes.bool.isRequired,
    trainingState: PropTypes.bool.isRequired,
}

export default withStyles(styles)(StatsRenderStream);