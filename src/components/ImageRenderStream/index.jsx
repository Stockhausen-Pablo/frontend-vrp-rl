import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./components/TabPanel";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function ImageRenderStream(props){
    const {classes, className} = props;
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
                    <Tab label="Context" {...a11yProps(0)}/>
                    <Tab label="Training" {...a11yProps(1)}/>
                    <Tab label="Testing" {...a11yProps(2)}/>
                </Tabs>
                <TabPanel
                    index={0}
                    value={value}
                >
                    Item One
                </TabPanel>
                <TabPanel
                    index={1}
                    value={value}
                >
                    Item Two
                </TabPanel>
                <TabPanel
                    index={2}
                    value={value}
                >
                    Item Three
                </TabPanel>
            </Paper>
        </div>
    )
}

ImageRenderStream.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImageRenderStream);