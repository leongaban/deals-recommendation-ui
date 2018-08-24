export const styles = theme => ({
  buttonRed: {
    float: 'right',
    margin: '20px 20px 0 0',
    color: '#fff',
    backgroundColor: '#f44336',
    borderRadius: '20px',
    '&:hover': {
      color: '#f44336'
    }
  },
  formControl: {
    display: 'flex',
    float: 'left',
    margin: theme.spacing.unit * 3
  },
  group: {
    float: 'left',
    flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`
  },
  blackColor: {
    color: '#000'
  }
});
