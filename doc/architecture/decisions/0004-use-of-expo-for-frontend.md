# 4. Use of Expo for Frontend

Date: 2025-02-21

## Status

Accepted

## Context

We needed to choose a frontend technology that would work for both web and mobile. The main options were React Native (without Expo) and Expo.

## Decision

We chose Expo for the following reasons:

* Cross-platform: Expo allows developing applications for iOS, Android, and web with a single codebase.

* Ease of use: Expo abstracts the complexity of native environment configurations.

* Ecosystem: Expo offers integrated tools for testing, publishing, and monitoring.

## Consequences

* We will depend on Expo’s updates and support for new features and bug fixes.

* Advanced native customizations may be limited.

* The learning curve may be challenging for developers without prior Expo experience.