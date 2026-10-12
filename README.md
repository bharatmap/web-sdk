# Bharat Maps Web SDK

Interactive vector maps for the browser. Version 0.1.1.

This repository distributes compiled SDK files, TypeScript declarations, documentation,
examples and license notices. SDK development sources are maintained separately.

## Install

```sh
npm install @bharatmaps/web-sdk@0.1.1
```

The versioned npm-compatible archive and checksums are also available in
[GitHub Releases](https://github.com/bharatmap/web-sdk/releases).

## Get a Web SDK key

Open [API Keys](https://portal.bharat-maps.com/api-keys), choose Web SDK and enter
your application's exact HTTPS hostname. Add the DNS TXT record shown by the
portal, verify it and wait for Ready. Browser verification is configured automatically.
Use the public `bm_web_` key in your application. Never embed a parent SDK secret.

## Initialize a map

```ts
import {
  BharatMap, BharatLicenseClient, createBharatTurnstileProvider,
  setBharatMapsWorkerUrl
} from '@bharatmaps/web-sdk';
import '@bharatmaps/web-sdk/styles.css';

// Copy the matching package's dist/bharatmaps-worker.mjs to this URL.
setBharatMapsWorkerUrl('/assets/bharatmaps-worker.mjs');
const license = new BharatLicenseClient({
  webKey: 'YOUR_PUBLIC_WEB_KEY',
  portalUrl: 'https://portal.bharat-maps.com',
  gatewayUrl: 'https://maps.bharat-maps.com',
  getEvidence: createBharatTurnstileProvider(document.getElementById('verification')!)
});
await license.ready();
const map = new BharatMap({
  container: 'map',
  style: 'https://maps.bharat-maps.com/web/v1/styles/light.json',
  transformRequest: license.transformRequest,
  center: [78.96, 22.59],
  zoom: 4
});

// On component teardown: map.remove(); license.dispose();
```

Provide `<div id="map"></div>` with an explicit height and
`<div id="verification"></div>`. Handle initialization errors in your application.
The initial camera position does not define license coverage.

## Documentation and examples

- [Integration and hosting](https://github.com/bharatmap/web-sdk/blob/main/docs/integration.md)
- [Licensing and troubleshooting](https://github.com/bharatmap/web-sdk/blob/main/docs/licensing.md)
- [Browser example](https://github.com/bharatmap/web-sdk/tree/main/examples/basic)
- [Portal documentation](https://portal.bharat-maps.com/docs/web-sdk)
- [Live map](https://maps.bharat-maps.com)

## Distribution

`dist/bharatmaps.mjs` is the ESM renderer, `dist/bharatmaps-worker.mjs` is its worker,
`dist/bharatmaps.css` is the stylesheet and `dist/bharatmaps.d.ts` provides the API types.
Keep these files at the same version. Runtime JavaScript dependencies are bundled;
`@types/geojson` and `gl-matrix` are installed for TypeScript declarations.
Source maps and development sources are excluded from version 0.1.1 onward.
Compiled browser code remains inspectable.

## License and support

See [LICENSE](LICENSE), [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt) and
`licenses/` for required notices. Access to Bharat Maps data requires an active
license and remains subject to your subscription limits.

Report SDK issues at https://github.com/bharatmap/web-sdk/issues or contact
support@bharat-maps.com. Do not include private keys or customer data in public issues.
