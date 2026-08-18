#!/usr/bin/env python3
"""Local preview server for the portfolio site.

Plain `python -m http.server` is not good enough here: every internal link is an
extensionless, root-absolute URL (/resume, /projects/chef-blast). In production
.htaccess rewrites those to the matching .html file. Without the same rewrite you
get a 404 on every nav link and the local site behaves nothing like the live one.

This mirrors the two rules in .htaccess:
  1. /foo -> foo.html when foo is not a directory and foo.html exists
  2. anything else that 404s -> /404.html, served with a real 404 status

Serving over http:// (rather than opening index.html from disk) also matters
because include.js fetches partials/header.html; over file:// that fetch fails
and you would silently be looking at the inline fallback nav instead of the real
one.

Usage:  python serve.py [port]      (default 8000)
"""

import http.server
import os
import socketserver
import sys
import webbrowser

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        # Rule 1: extensionless URL -> .html, matching the .htaccess RewriteRule.
        path = self.translate_path(self.path)
        if not os.path.isdir(path) and not os.path.exists(path):
            if os.path.isfile(path + ".html"):
                self.path = self.path.split("?", 1)[0].split("#", 1)[0] + ".html"
        return super().send_head()

    def send_error(self, code, message=None, explain=None):
        # Rule 2: ErrorDocument 404 /404.html, keeping the 404 status code.
        if code == 404:
            page = os.path.join(ROOT, "404.html")
            if os.path.isfile(page):
                with open(page, "rb") as fh:
                    body = fh.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                if self.command != "HEAD":
                    self.wfile.write(body)
                return
        super().send_error(code, message, explain)

    def end_headers(self):
        # Always re-fetch from disk, so edits show up on a plain refresh.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("  %s\n" % (fmt % args))


class Server(socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    try:
        with Server(("127.0.0.1", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}/"
            print(f"\n  Portfolio site serving at  {url}")
            print("  Extensionless URLs and the 404 page behave as they do live.")
            print("  Press Ctrl+C to stop.\n")
            webbrowser.open(url)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.\n")
    except OSError as exc:
        print(f"\n  Could not start on port {PORT}: {exc}")
        print(f"  Try another port:  python serve.py {PORT + 1}\n")
        sys.exit(1)
