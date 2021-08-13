export default theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    Tabs:{
        borderBottom: "3px solid rgb(212, 212, 212)"
    },
    imgPlot:{
        width: '82%',
        height: '82%',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    progress:{
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    button: {
        width: '24%',
        padding: theme.spacing(1),
        marginTop: "10px",
    },
    bar:{
        height: '15px',
        borderRadius: 5,
        backgroundColor: '#97cbf3',
    },
    rightButton:{
        width: '25%',
        padding: theme.spacing(1),
        marginTop: "10px",
    },
    buttonContainer:{
        flexDirection: 'row',
        padding: theme.spacing(1),
    }
});
