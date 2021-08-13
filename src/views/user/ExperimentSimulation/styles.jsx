export default theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    componentStructure: {
        flexGrow: 1,
        marginLeft: theme.spacing(5),
    },
});