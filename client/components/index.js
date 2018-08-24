/**
 * @fileoverview
 * In order for any component to match a route, you must registed that component
 * here first.
 *
 * See: client/containers/RouteManager
 * See: client/routes
 */

// Common
export { default as Products } from 'components/Common/products';
export { default as Main } from 'components/Common/main';
export { default as RouteInterceptor } from 'components/Common/routeInterceptor';

// Auth
export { default as Login } from 'components/Auth/login';
export { default as ResetPassword } from 'components/Auth/resetPassword';
export { default as Forbidden } from 'components/Auth/forbidden';
export { default as NotFound } from 'components/Auth/notfound';
