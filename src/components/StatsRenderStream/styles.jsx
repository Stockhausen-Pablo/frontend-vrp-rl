export default theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        display:'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.paper,
    },
    improveIcon:{
        color: '#0af305'
    },
    worseIcon:{
        color: '#f3053d'
    },
    equalIcon:{
        color: '#0bb0b6'
    },
    statIcon:{
        color: '#e45f12'
    },
    button: {
        width: '100%',
        padding: theme.spacing(1),
        display: "flex",
        marginTop: "10px",
        backgroundColor: '#e30d0d'
    }
});
