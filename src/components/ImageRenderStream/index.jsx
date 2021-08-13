import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./components/TabPanel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function ImageRenderStream(props){
    const {classes, className, base64ImageCords, base64ImageStopNr, handleStartTraining} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const rootClassName = classNames(classes.root, className);

    return(
        <div className={rootClassName}>
            <Paper style={{height: 800, maxHeight: 800, overflow: 'auto'}} elevation={3}>
                <Tabs
                    className={classes.Tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Context-Cords" {...a11yProps(0)}/>
                    <Tab label="Context-StopNr" {...a11yProps(1)}/>
                    <Tab label="Training" {...a11yProps(2)}/>
                    <Tab label="Testing" {...a11yProps(3)}/>
                </Tabs>
                <TabPanel
                    index={0}
                    value={value}
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
                    value={value}
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
                    value={value}
                >
                    Item Three
                </TabPanel>
            </Paper>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleStartTraining}
            >
                Start Training
            </Button>
        </div>
    )
}

ImageRenderStream.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    base64ImageCords: PropTypes.string.isRequired,
    base64ImageStopNr: PropTypes.string.isRequired,
    handleStartTraining: PropTypes.func.isRequired
}

export default withStyles(styles)(ImageRenderStream);