# Licensing and troubleshooting

1. Sign in to https://portal.bharat-maps.com with an approved account and an active
   SDK subscription.
2. In API Keys choose Web SDK, enter your application name and exact HTTPS hostname.
3. Publish the DNS TXT record displayed by the portal. Use the exact name and value
   shown for your application; do not reuse a record from a different application.
4. Check DNS and wait for the application's Ready status. Keep the TXT record in DNS.
5. Copy the public `bm_web_` application key into your browser integration.

Turnstile configuration is managed automatically. You do not need a Cloudflare
account, site key or secret. Never put a parent SDK secret in frontend code.
Register each application hostname; individual visitors do not register anything.
Initial camera coordinates do not limit the license to a city. Access is controlled
by the subscription and application policy.

The SDK establishes a browser session and signs protected resource requests.
It handles token renewal and rate-limit cooldowns. Quotas apply to the underlying
subscription: creating another application key does not reset them.

| Symptom | Check |
| --- | --- |
| DNS verification pending | Exact TXT name/value and DNS propagation; use Check DNS again. |
| Application not Ready | DNS status and automatic browser-verification provisioning in the portal. |
| 401 | Application key, session authentication and device clock; reload after correcting configuration. |
| 403 | Registered hostname, active subscription, application status and domain verification. |
| 429 | Subscription/rate limits; allow the SDK cooldown and reduce unnecessary map/resource requests. |
| Verification failed | CSP, blocked Cloudflare scripts/frames, HTTPS and browser privacy extensions. |
| Blank map | Container height, WebGL2 support, JavaScript errors, worker URL and JavaScript MIME type. |

For local UI work use your own fixture data. The production licensed example needs
a registered HTTPS hostname; a domain license does not automatically authorize localhost.

Data delivered to a browser can be inspected and copied. Licensing limits access
and abuse; it cannot make browser-delivered data impossible to scrape.

Contact support@bharat-maps.com with your SDK version, hostname, error code and
approximate time. Remove credentials and personal data from screenshots and logs.
