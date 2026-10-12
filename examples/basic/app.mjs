import {BharatMap, BharatLicenseClient, createBharatTurnstileProvider,
    setBharatMapsWorkerUrl} from '../../dist/bharatmaps.mjs';

// Replace this with the public key for the HTTPS hostname hosting this example.
const webKey = 'YOUR_PUBLIC_WEB_KEY';
const status = document.getElementById('status');
let license;
let map;
try {
    if (webKey === 'YOUR_PUBLIC_WEB_KEY') throw new Error('Set your public Web SDK key in app.mjs and deploy to its registered HTTPS hostname.');
    setBharatMapsWorkerUrl(new URL('../../dist/bharatmaps-worker.mjs', import.meta.url).href);
    license = new BharatLicenseClient({
        webKey,
        portalUrl: 'https://portal.bharat-maps.com',
        gatewayUrl: 'https://maps.bharat-maps.com',
        getEvidence: createBharatTurnstileProvider(document.getElementById('verification')),
        onStateChange(state, error) {
            if (error) { status.hidden = false; status.textContent = `License: ${state} (${error.message})`; }
        }
    });
    await license.ready();
    map = new BharatMap({
        container: 'map',
        style: 'https://maps.bharat-maps.com/web/v1/styles/light.json',
        transformRequest: license.transformRequest,
        center: [78.96, 22.59], zoom: 4
    });
    map.on('load', () => { status.hidden = true; });
    map.on('error', event => { status.hidden = false; status.textContent = event.error?.message ?? 'Map loading failed'; });
    // Applications with client-side navigation should do this on component teardown.
    window.addEventListener('pagehide', () => { map.remove(); license.dispose(); }, {once: true});
} catch (error) {
    status.textContent = error.message;
    map?.remove();
    license?.dispose();
}
