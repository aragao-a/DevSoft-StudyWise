# 5. Choice of SQLite3 as Database

Date: 2025-02-21

## Status

Accepted

## Context

We needed to choose a database to store user information, quizzes, and results. The main options were Firebase Firestore and SQLite3.

## Decision

We chose SQLite3 for the following reasons:

* Local usability: SQLite3 allows data storage locally, making it easier for development and offline functionality.

* Simplicity: No need for external configuration or a cloud database service.

* Performance: Suitable for lightweight applications that do not require complex scaling.

## Consequences

* SQLite3 is not designed for large-scale distributed applications.

* Future scaling may require migration to a more robust database system.

* Unlike Firebase, SQLite3 does not offer built-in real-time synchronization.