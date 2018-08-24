import React from 'react';
import { connect } from 'react-redux';

// Redirect
import { Redirect } from 'react-router-dom';

// Utils
import { hasRights } from 'utils/auth';
import { cleanMapStateToProps } from 'utils/redux';

// Components
import Products from 'components/Common/products';
import Loading from 'components/Common/loading';

// Actions
import { saveRedirect } from 'actions/Global';

// Constants
import {
  PAGE_AUTH_REQS,
  ROUTEPATH_DEFAULT_PAGE,
  ROUTEPATH_LOGIN
} from 'copy/Global/routes';

// Components
import { Forbidden, NotFound } from 'components';

// Utils
import { getRouteFromPathName } from 'utils/routes';

const { AUTHORIZED } = PAGE_AUTH_REQS;

class RouteInterceptor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forbidden: false,
      notFound: false
    };
  }

  componentDidMount() {
    this.aclCheck(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.aclCheck(nextProps);
  }

  authRouteCheck(isAuthRoute) {
    const { userServices } = this.props;

    const isAuthorized = userServices && hasRights(userServices);
    // @TODO: userServices is always empty because AUTH_LOGGED_OUT clears it!
    // console.log('userServices', userServices)

    if (isAuthRoute) {
      // @TODO: In the future, we will check for Authorization privileges.
      this.setState({
        forbidden: !isAuthorized,
        notFound: false
      });
    } else {
      this.setState({ notFound: true });
    }
  }

  aclCheck(props) {
    const { authed, location = {} } = props;
    const { pathname } = location;

    // No user yet (Firebase still initializing).
    if (authed === null) return;

    // We don't want to redirect the user to the Login page after a successful login,
    // so we default to the root view.
    const redirectUrl = pathname === ROUTEPATH_LOGIN ? ROUTEPATH_DEFAULT_PAGE : pathname;

    const isAuthorizedRoute = getRouteFromPathName(redirectUrl, r => r.authReq === AUTHORIZED);

    // If the user is logged in, determine if they have access to this page,
    // or if it is indeed a 404.
    this.authRouteCheck(isAuthorizedRoute);

    if (authed === true) return;

    // Save the intended redirect route, if it exists.
    if (props.saveRedirect) {
      props.saveRedirect(isAuthorizedRoute ? redirectUrl : ROUTEPATH_DEFAULT_PAGE);
    }
  }

  render() {
    const { forbidden, notFound } = this.state;
    const { authed } = this.props;

    // If authentication is complete, but the user is not logged in,
    // redirect to the login view.
    if (authed === false) return <Redirect to="/login" />;

    if (forbidden) return <Forbidden />;
    if (notFound) return <NotFound />;

    // If user is logged in and accesses an unathenticated view,
    // redirect to the Products view.
    if (authed === true) return <Products />;

    return <Loading />;
  }
}

export const mapDispatchToProps = dispatch => ({
  saveRedirect: (...args) => dispatch(saveRedirect(...args))
});

export const RouteInterceptorJest = RouteInterceptor;

export default connect(cleanMapStateToProps([
  'authed',
  'location',
  'userServices'
]), mapDispatchToProps)(RouteInterceptor);
