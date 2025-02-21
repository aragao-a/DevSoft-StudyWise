# 3. Choice of Node.js for Backend

Date: 2025-02-21

## Status

Accepted

## Context

We needed to choose a backend technology for the project. The main options were Node.js and Python (with frameworks like Sanic or Django).

## Decision

We chose Node.js for the following reasons:

* Performance: Node.js is highly efficient for I/O-bound applications, such as RESTful APIs.

* Ecosystem: npm offers a vast range of ready-to-use libraries and tools.

* Language uniformity: Since the frontend uses JavaScript (with Expo), using Node.js allows sharing knowledge and code between frontend and backend.

## Consequences

* The learning curve may be challenging for developers with a Python background.

* CPU-intensive applications may require integration with other technologies (e.g., workers in Python or Rust).

* Project maintenance will be simplified due to language uniformity.

