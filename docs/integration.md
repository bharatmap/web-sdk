# Integration and hosting

## Browser requirements

Use HTTPS, WebGL2, Web Crypto and ES modules. Host the application on the exact
hostname registered in the portal. An apex domain and its `www` subdomain are
separate hostnames. A visitor does not need an individual license.

## Files and bundlers

Install `@bharatmaps/web-sdk`, import its ESM entry and `@bharatmaps/web-sdk/styles.css`.
Copy `node_modules/@bharatmaps/web-sdk/dist/bharatmaps-worker.mjs` to your public
assets directory. Call `setBharatMapsWorkerUrl()` with its same-origin URL before
constructing a map. Always deploy renderer, worker and CSS from the same version.

For direct browser modules, serve the four `dist/` files from the release together.
The example in `examples/basic/` imports them without a bundler. Replace the key
placeholder in `app.mjs` and deploy the repository's distribution files on your
registered HTTPS origin. Do not open the example as `file://`.

## Map and lifecycle

The map container needs an explicit height. Wait for `license.ready()` before
creating the map and pass `license.transformRequest` to the map constructor.
On teardown call `map.remove()` followed by `license.dispose()`.

Available styles:

- `https://maps.bharat-maps.com/web/v1/styles/light.json`
- `https://maps.bharat-maps.com/web/v1/styles/dark.json`
- `https://maps.bharat-maps.com/web/v1/styles/light-simplified.json`
- `https://maps.bharat-maps.com/web/v1/styles/dark-simplified.json`

Use `map.setStyle(url)` to change appearance. U-PIN is disabled.

## Common API

| Operation | API |
| --- | --- |
| Immediate camera update | `map.moveCameraTo(options)` |
| Eased camera transition | `map.easeCameraTo(options)` |
| Flight animation | `map.animateCameraTo(options)` |
| Fit bounds | `map.fitCameraToBounds(bounds, options)` |
| Marker | `new BharatMarker().setLngLat([lng, lat]).addTo(map)` |
| Popup | `new BharatPopup().setLngLat([lng, lat]).setText(text).addTo(map)` |
| Navigation controls | `map.addControl(new BharatNavigationControl())` |
| GeoJSON or vector data | `map.addSource(id, source)` |
| Map layer | `map.addLayer(layer)` |
| Feature interaction | `map.queryRenderedFeatures(point)` |
| Events | `map.on(event, handler)` / `map.off(event, handler)` |

Coordinates use longitude, latitude. See `dist/bharatmaps.d.ts` for the complete
API contract. Prefer `setText` for untrusted popup content.

## CSP and privacy

Adapt your site's content security policy to permit:

- `script-src`: your SDK/application origin and `https://challenges.cloudflare.com`.
- `frame-src`: `https://challenges.cloudflare.com`.
- `connect-src`: your origin, `https://portal.bharat-maps.com`,
  `https://maps.bharat-maps.com` and `https://challenges.cloudflare.com`.
- `worker-src`: your worker's same origin.
- `style-src`: SDK CSS and the inline element styles required by map controls.
- `img-src`: your image origins, `data:` and `blob:` as required by map assets.

Invisible Turnstile runs browser verification automatically. Browser privacy tools
or blocked network requests can cause verification errors. Include the
[Cloudflare Turnstile Privacy Addendum](https://www.cloudflare.com/turnstile-privacy-policy/)
in your privacy notice.

Preserve SDK legal notices and attribution required by any additional data you add.
