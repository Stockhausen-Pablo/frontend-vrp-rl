export default theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    button: {
        width: '100%',
        padding: theme.spacing(1),
        display: "flex",
        marginTop: "10px"
    }
});
