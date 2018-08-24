export const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tabsRoot: {
    border: '1px solid #4a4a4a',
    backgroundColor: '#f0f0f0',
    boxShadow: 'none'
  },
  tabsIndicator: {
    color: '#f44336',
    backgroundColor: '#f44336'
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    color: '#f44336',
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    '&:hover': {
      color: '#c9372c',
      opacity: 1
    },
    '&$tabSelected': {
      color: '#c9372c'
    },
    '&:focus': {
      color: '#c9372c'
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});
