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
        width: '100%',
        height: '100%',
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
        width: '50%',
        padding: theme.spacing(1),
        display: "flex",
        marginTop: "10px"
    },
    bar:{
        height: '15px',
        borderRadius: 5,
        backgroundColor: '#63b0f6',
    }
});
