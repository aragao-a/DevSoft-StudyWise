# 6. Use of LocalTunnel for API Testing

Date: 2025-02-21

## Status

Accepted

## Context

We needed a solution to expose local APIs during development and testing. The main options were Ngrok and LocalTunnel.

## Decision

We chose LocalTunnel for the following reasons:

* Simplicity: LocalTunnel is easy to set up and use.

* Free usage: Offers a free plan suitable for our testing needs.

* Integration: Works well with our development environment.

## Consequences

* LocalTunnel’s stability and performance may vary depending on demand.

* Future testing needs in more complex environments may require migration to a paid solution (e.g., Ngrok).

* Windows firewall may occasionally block LocalTunnel connections, requiring manual adjustments.