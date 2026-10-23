<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Security + caching headers for the single-page portfolio.
 *
 * Applied from the application (not only Nginx) so the headers survive a fresh
 * server rebuild and are visible in `curl -I` without touching vhost config.
 * HSTS is intentionally short: raise max-age once HTTPS is confirmed permanent.
 */
class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $headers = [
            'X-Content-Type-Options' => 'nosniff',
            'X-Frame-Options' => 'SAMEORIGIN',
            'Referrer-Policy' => 'strict-origin-when-cross-origin',
            'Permissions-Policy' => 'camera=(), microphone=(), geolocation=(), payment=()',
            'Cross-Origin-Opener-Policy' => 'same-origin',
            'X-Permitted-Cross-Domain-Policies' => 'none',
        ];

        // Only advertise HSTS over TLS; sending it on plain HTTP is ignored anyway
        // and would leak the intent on a downgrade.
        if ($request->isSecure()) {
            $headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
        }

        foreach ($headers as $name => $value) {
            if (! $response->headers->has($name)) {
                $response->headers->set($name, $value);
            }
        }

        // Vite emits content-hashed filenames under /build, so they can be cached hard.
        // The HTML shell must never be cached or a deploy goes unnoticed for hours.
        if ($request->is('build/*')) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
        } elseif ($response->headers->get('Content-Type') && str_contains($response->headers->get('Content-Type'), 'text/html')) {
            $response->headers->set('Cache-Control', 'no-cache, must-revalidate');
        }

        return $response;
    }
}
