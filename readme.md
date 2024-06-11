
Instructions to run the example:

1. Install deps:
```sh
deno task setup
```

2. Run the example:
```sh
DD_TRACE_DEBUG=true DENO_FUTURE=1 deno run main.ts

error: Uncaught (in promise) TypeError: dc.tracingChannel is not a function
    at module.exports (file:///Users/sr/Library/Caches/deno/npm/registry.npmjs.org/dc-polyfill/0.1.6/patch-tracing-channel-has-subscribers.js:10:25)
    at Object.<anonymous> (file:///Users/sr/Library/Caches/deno/npm/registry.npmjs.org/dc-polyfill/0.1.6/dc-polyfill.js:34:61)
    at Object.<anonymous> (file:///Users/sr/Library/Caches/deno/npm/registry.npmjs.org/dc-polyfill/0.1.6/dc-polyfill.js:40:4)
    at Module._compile (node:module:729:34)
    at Object.Module._extensions..js (node:module:743:10)
    at Module.load (node:module:654:32)
    at Function.Module._load (node:module:522:12)
    at Module.require (node:module:673:19)
    at require (node:module:787:16)
    at Object.<anonymous> (file:///Users/sr/Library/Caches/deno/npm/registry.npmjs.org/dd-trace/5.15.0/packages/datadog-core/src/storage/async_resource.js:4:21)
```

The same example when run using node results in the following logs:

```
➜  deno_dd_trace_example git:(main) DD_TRACE_DEBUG=true node main.mjs 
Error: connect ECONNREFUSED 127.0.0.1:8126
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1606:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8126
}
Encoding payload: [{"trace_id":"46a2857432599b8d","span_id":"46a2857432599b8d","parent_id":"0000000000000000","name":"db.get_user","resource":"db.get_user","error":0,"meta":{"_dd.p.tid":"6668140b00000000","_dd.p.dm":"-0","service":"deno_dd_trace_example","version":"1.0.0","runtime-id":"72c04cb6-1a68-44a9-a995-3ab2ee267270","language":"javascript"},"metrics":{"_dd.agent_psr":1,"_dd.top_level":1,"user_id":123,"process_id":87090,"_sampling_priority_v1":1},"start":1718096907490010000,"duration":101612061,"links":[],"service":"deno_dd_trace_example"}]
User: John Doe
Flushing 0 metrics via HTTP
Request to the agent: {"path":"/v0.4/traces","method":"PUT","headers":{"Content-Type":"application/msgpack","Datadog-Meta-Tracer-Version":"5.17.0","X-Datadog-Trace-Count":"1","Datadog-Meta-Lang":"nodejs","Datadog-Meta-Lang-Version":"v22.1.0","Datadog-Meta-Lang-Interpreter":"v8"},"url":"http://127.0.0.1:8126/"}
Error: connect ECONNREFUSED 127.0.0.1:8126
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1606:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8126
}
➜  deno_dd_trace_example git:(main) DD_TRACE_DEBUG=true node fetch.mjs 
Inject into carrier: {"x-datadog-trace-id":"596952345489695783","x-datadog-parent-id":"596952345489695783","x-datadog-sampling-priority":"1"}.
Error: connect ECONNREFUSED 127.0.0.1:8126
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1606:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8126
}
Encoding payload: [{"trace_id":"0848ccfed4bfe427","span_id":"0848ccfed4bfe427","parent_id":"0000000000000000","name":"http.request","resource":"GET","error":0,"meta":{"_dd.p.tid":"6668140f00000000","_dd.p.dm":"-0","service":"deno_dd_trace_example","version":"1.0.0","runtime-id":"c3aa441c-0d61-4a00-846c-13892bf84240","component":"fetch","span.kind":"client","http.method":"GET","http.url":"https://html.deno.dev/json","out.host":"html.deno.dev","http.status_code":"200","language":"javascript"},"metrics":{"_dd.agent_psr":1,"_dd.top_level":1,"_dd.measured":1,"process_id":87183,"_sampling_priority_v1":1},"start":1718096911921010400,"duration":162067627,"links":[],"service":"deno_dd_trace_example","type":"http"}]
{ message: 'Hello from Deno Deploy' }
Flushing 0 metrics via HTTP
Request to the agent: {"path":"/v0.4/traces","method":"PUT","headers":{"Content-Type":"application/msgpack","Datadog-Meta-Tracer-Version":"5.17.0","X-Datadog-Trace-Count":"1","Datadog-Meta-Lang":"nodejs","Datadog-Meta-Lang-Version":"v22.1.0","Datadog-Meta-Lang-Interpreter":"v8"},"url":"http://127.0.0.1:8126/"}
Error: connect ECONNREFUSED 127.0.0.1:8126
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1606:16)
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 8126
}
```

We can ignore the connect errors and see that the traces are indeed generated. We need to get Deno to generate the traces as well.