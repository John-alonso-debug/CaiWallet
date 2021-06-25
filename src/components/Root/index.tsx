/*
 * @Author: your name
 * @Date: 2021-06-21 15:12:32
 * @LastEditTime: 2021-06-25 18:30:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /safe-react-3.8.0/src/components/Root/index.tsx
 */
import { theme as styledTheme, Loader } from '@gnosis.pm/safe-react-components'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import * as Sentry from '@sentry/react'

import { LoadingContainer } from 'src/components/LoaderContainer'
import App from 'src/components/App'
import GlobalErrorBoundary from 'src/components/GlobalErrorBoundary'
import AppRoutes from 'src/routes'
import { history, store } from 'src/store'
import theme from 'src/theme/mui'
import { wrapInSuspense } from 'src/utils/wrapInSuspense'

import './index.module.scss'
import './OnboardCustom.module.scss'

const Root = (): React.ReactElement => (
  <ThemeProvider theme={styledTheme}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Sentry.ErrorBoundary fallback={GlobalErrorBoundary}>
            <App>
              {wrapInSuspense(
                <AppRoutes />,
                <LoadingContainer>
                  <Loader size="md" />
                </LoadingContainer>,
              )}
            </App>
          </Sentry.ErrorBoundary>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  </ThemeProvider>
)

export default Root
