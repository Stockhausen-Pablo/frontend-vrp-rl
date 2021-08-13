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
        color: '#05ebf3'
    }
});
