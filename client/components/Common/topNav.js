import React, { Component } from 'react';
import { connect } from 'react-redux';

// MUI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Copy
import { APP_NAME } from 'copy/Global/common';

// Components
import RightMenu from 'components/Menus/rightMenu';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

const styles = {
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class TopNav extends Component {
  /**
   * Displays the user name (if the user is logged in).
   * @return {React.Component}
   */
  renderUserName() {
    const { authed, userFirstName, userLastName } = this.props;
    return authed && <span>{userFirstName} {userLastName}</span>;
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.flex}
            variant="title"
            color="inherit"
          >
            {APP_NAME}
          </Typography>
          { this.renderUserName() }
          <RightMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

const stylesHOC = withStyles(styles)(TopNav);

export const TopNavJest = TopNav;

export default connect(cleanMapStateToProps([
  'authed',
  'userFirstName',
  'userLastName'
]), null)(stylesHOC);
