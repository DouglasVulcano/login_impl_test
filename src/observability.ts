import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions'
import * as Sentry from '@sentry/react'

const SERVICE_NAME = 'login_impl_test'
const SERVICE_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0'

/**
 * Inicializa observabilidade no frontend. É **inerte sem configuração**: cada bloco só liga
 * quando a env var correspondente existe, então build/testes/dev não precisam de nada.
 *
 * - Sentry (erros + performance): liga com VITE_SENTRY_DSN.
 * - OpenTelemetry Web (traces via OTLP): liga com VITE_OTLP_TRACES_ENDPOINT. Sempre exporte para um
 *   OpenTelemetry Collector, nunca direto para o vendor — o Collector faz o fan-out.
 */
export function initObservability(): void {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      release: `${SERVICE_NAME}@${SERVICE_VERSION}`,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
    })
  }

  const otlpEndpoint = import.meta.env.VITE_OTLP_TRACES_ENDPOINT
  if (otlpEndpoint) {
    const provider = new WebTracerProvider({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: SERVICE_NAME,
        [ATTR_SERVICE_VERSION]: SERVICE_VERSION,
      }),
      spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter({ url: otlpEndpoint }))],
    })
    provider.register()
  }
}
