// Instrument fetch requests with Datadog "dd-trace"
// module's fetch plugin. This example tests whether
// plugins work in deno.

import ddTrace from "dd-trace";

ddTrace.init();
ddTrace.use("fetch");

const response = await fetch("https://html.deno.dev/json");
console.log(await response.json());