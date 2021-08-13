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

function StatsRenderStream(props){
    const {classes, className, stateUpdate} = props;

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
                <List className={classes.root}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <AssistantPhotoIcon color='primary'/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={stateUpdate.epoch.length > 0 ? (parseInt(stateUpdate.epoch)) + 1 : ''} secondary="Epoch" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {renderSwitch(parseInt(stateUpdate.policy_reward_improvement))}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={stateUpdate.policy_reward} secondary="Current Policy Reward" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {renderSwitch(parseInt(stateUpdate.sum_G_t_reward_improvement))}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={stateUpdate.sum_G_t} secondary="Summed cumulative Reward" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <TrendingUpIcon className={classes.improveIcon}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={stateUpdate.best_policy_reward} secondary="Best overall Policy Reward" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <TrendingDownIcon className={classes.worseIcon}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={stateUpdate.worst_policy_reward} secondary="Worst overall Policy Reward" />
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}

StatsRenderStream.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    stateUpdate: PropTypes.object.isRequired,
}

export default withStyles(styles)(StatsRenderStream);