import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            head: {
                backgroundColor: 'black',
                color: 'white',
            },
            body: {
                fontSize: 14,
            },
        },

        MuiTableRow: {
            root: {
                '&:nth-of-type(odd)': {
                  backgroundColor: 'hover',
                },
            },
        },
    }
});

export default theme