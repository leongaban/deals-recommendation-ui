export const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  group: {
    float: 'left',
    flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`
  },
  button: {
    float: 'right',
    margin: '0 auto 10px',
    width: '100%',
    borderRadius: '20px'
  },
  buttonRed: {
    color: '#fff',
    backgroundColor: '#f44336',
    '&:hover': {
      color: '#f44336'
    }
  },
  buttonBlue: {
    color: '#2c6fc9',
    backgroundColor: '#fff',
    '&:hover': {
      color: '#519bff'
    }
  }
});
