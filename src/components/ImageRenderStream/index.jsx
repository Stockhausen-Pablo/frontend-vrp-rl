import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import React, {useEffect} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./components/TabPanel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function ImageRenderStream(props){
    const {classes, className, base64ImageCords, base64ImageStopNr, handleStartTraining, stateUpdate, episodeNumber, tabState, debounceStartTraining, handleTabStateChange} = props;
    const [value, setValue] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        setProgress(((parseInt(stateUpdate.epoch, 10) + 1) / episodeNumber) * 100);
    },[stateUpdate])

    const rootClassName = classNames(classes.root, className);


    return(
        <div className={rootClassName}>
            <Paper style={{height: 800, maxHeight: 800, overflow: 'auto'}} elevation={3}>
                <Tabs
                    centered
                    className={classes.Tabs}
                    indicatorColor="primary"
                    onChange={handleTabStateChange}
                    textColor="primary"
                    value={tabState}
                >
                    <Tab label="Context-Cords" {...a11yProps(0)}/>
                    <Tab label="Context-StopNr" {...a11yProps(1)}/>
                    <Tab label="Training" {...a11yProps(2)}/>
                    <Tab label="Testing" {...a11yProps(3)}/>
                </Tabs>
                <TabPanel
                    index={0}
                    value={tabState}
                >
                    {base64ImageCords.length > 0 ?
                        <img
                            className={classes.imgPlot}
                            src={`data:image/png;base64,${base64ImageCords}`}
                        />
                        :
                        <CircularProgress className={classes.progress}/>
                    }
                </TabPanel>
                <TabPanel
                    index={1}
                    value={tabState}
                >
                    {base64ImageStopNr.length > 0 ?
                        <img
                            className={classes.imgPlot}
                            src={`data:image/png;base64,${base64ImageStopNr}`}
                        />
                        :
                        <CircularProgress className={classes.progress}/>
                    }
                </TabPanel>
                <TabPanel
                    index={2}
                    value={tabState}
                >
                    {stateUpdate.policy_tours_base64.length > 0 ?
                        <div>
                        <LinearProgress className={classes.bar} variant="determinate" value={progress}/>
                        <img
                            className={classes.imgPlot}
                            src={`data:image/png;base64,${stateUpdate.policy_tours_base64}`}
                        />
                        </div>
                        :
                        <p>
                            No data available. Begin Training.
                        </p>
                    }
                </TabPanel>
            </Paper>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleStartTraining}
                disabled={debounceStartTraining}
            >
                Start Training
            </Button>
            &nbsp;
            <Button
                className={classes.button}
                variant="contained"
                color="danger"
                disabled
            >
                Stop Training
            </Button>
            &nbsp;
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Start Testing
            </Button>
            &nbsp;
            <Button
                className={classes.button}
                variant="contained"
                color="danger"
                disabled
            >
                Stop Testing
            </Button>
        </div>
    )
}

ImageRenderStream.propTypes = {
    base64ImageCords: PropTypes.string.isRequired,
    base64ImageStopNr: PropTypes.string.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    debounceStartTraining: PropTypes.bool.isRequired,
    episodeNumber: PropTypes.number.isRequired,
    handleStartTraining: PropTypes.func.isRequired,
    handleTabStateChange: PropTypes.func.isRequired,
    stateUpdate: PropTypes.object.isRequired,
    tabState: PropTypes.number.isRequired,
}

export default withStyles(styles)(ImageRenderStream);