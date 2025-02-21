# 2. Use of Google Gemini as LLM API

Date: 2025-02-21

## Status

Accepted

## Context

We needed to choose a Large Language Model (LLM) API to provide text generation and natural language processing features in the project. The main options were Google Gemini and OpenAI.

## Decision

We chose Google Gemini as the LLM API for the following reasons:

* Cost-benefit: Google Gemini offers a more generous free plan compared to OpenAI.

* Integration with the Google ecosystem: We already use other Google tools, making integration easier.

* Performance: Gemini demonstrated performance comparable to OpenAI in text generation and natural language processing tasks.

## Consequences

* Integration with Google Gemini will require API key configuration and the use of Google's SDK.

* We will depend on the availability and performance of Google Gemini, which may impact project scalability.

* Future changes in Google Gemini’s pricing or functionality may require project adjustments.

