import Box from '@material-ui/core/Box';
import React from 'react';
import styles from './styles'
import {withStyles} from '@material-ui/core';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default withStyles(styles)(TabPanel);
