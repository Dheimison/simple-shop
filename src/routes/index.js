import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { NotFound } from 'pages/NotFound';
import { Layout } from 'containers/Layout';
import {
  USER_ROUTES,
  ADMIN_ROUTES,
  USER_REDIRECTS,
  ADMIN_REDIRECTS,
} from './routes';

export function Routes() {
  const allUserPaths = USER_ROUTES.map((route) => route.path);
  const allAdminPaths = ADMIN_ROUTES.map((route) => route.path);

  return (
    <Router>
      <Switch>
        {USER_REDIRECTS.map((route) => (
          <Redirect
            key={route.key}
            from={route.from}
            to={route.to}
            exact={route.exact}
          />
        ))}

        {ADMIN_REDIRECTS.map((route) => (
          <Redirect
            key={route.key}
            from={route.from}
            to={route.to}
            exact={route.exact}
          />
        ))}

        <Route exact path={allAdminPaths}>
          <Layout
            currentLinks={ADMIN_ROUTES}
            userLinks={USER_ROUTES}
            adminLinks={ADMIN_ROUTES}
          >
            <Switch>
              {ADMIN_ROUTES.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </Layout>
        </Route>

        <Route exact path={allUserPaths}>
          <Layout
            currentLinks={USER_ROUTES}
            userLinks={USER_ROUTES}
            adminLinks={ADMIN_ROUTES}
          >
            <Switch>
              {USER_ROUTES.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </Layout>
        </Route>

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
