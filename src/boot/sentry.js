import * as Sentry from '@sentry/vue'
import { boot } from 'quasar/wrappers'

export default boot(({ app, router }) => {
  Sentry.init({
    app,
    dsn: 'http://38212ccd900490677dcf90bd12447f30@sentry.alaa.tv/3',
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router)
      }),
      new Sentry.Replay()
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/alaatv\.com\/api/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  })
})
