// import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai';

// export const ai = genkit({
//   plugins: [googleAI()],
//   model: 'googleai/gemini-2.0-flash',
// });

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
// Import OpenTelemetry API only if required by dependencies
import { trace } from '@opentelemetry/api';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});


// import { genkit } from 'genkit';
// import { googleAI } from '@genkit-ai/googleai';
// import { AlwaysOnSampler, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
// import { NodeSDK } from '@opentelemetry/sdk-node';

// // OpenTelemetry setup (production only)
// if (process.env.NODE_ENV === 'production') {
//   const sdk = new NodeSDK({
//     instrumentations: [], // Add instrumentations as needed
//     traceExporter: new JaegerExporter(),
//     sampler: new AlwaysOnSampler(),
//     // spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
//   });
//   sdk.start();
// }

// export const ai = genkit({
//   plugins: [googleAI()],
//   model: 'googleai/gemini-2.0-flash',
// });
