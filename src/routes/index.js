import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { Layout } from 'components/Layout';
import { NotFound } from 'pages/NotFound';
import {
  MAIN_ROUTES,
  ADMIN_ROUTES,
  MAIN_REDIRECTS,
  ADMIN_REDIRECTS,
} from './routes';

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Layout sidebarLinks={ADMIN_ROUTES}>
            <Switch>
              {ADMIN_ROUTES.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
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

              <Route path="*" component={NotFound} />
            </Switch>
          </Layout>
        </Route>

        <Layout sidebarLinks={MAIN_ROUTES}>
          <Switch>
            {MAIN_ROUTES.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}

            {MAIN_REDIRECTS.map((route) => (
              <Redirect
                key={route.key}
                from={route.from}
                to={route.to}
                exact={route.exact}
              />
            ))}

            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Switch>
    </Router>
  );
}
