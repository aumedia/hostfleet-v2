---
title: "OpenRouter vs Together vs Groq vs Fireworks vs Cerebras: the per-token model gateways compared (April 2026)"
description: "Five major LLM API gateways, side by side: published per-token pricing, supported models, what each one routes through, and where the per-token pricing breaks down. Sourced from public pricing pages — no measured benchmarks."
pubDate: 2026-04-27
category: ai-hosting
author: Alex Harmon
draft: false
---

If you don't want to rent a GPU and run an LLM yourself, you're picking between **per-token gateways** — services that host the model and bill you per million input/output tokens. The big five in 2026 are OpenRouter, Together AI, Groq, Fireworks AI, and Cerebras Inference. This article is a side-by-side of what each vendor *publishes on its pricing page*, with links. There are no latency or throughput numbers I measured. Where I quote a vendor's claim, I link to where they made it.

> **Methodology note.** Every price below is from the vendor's own pricing page as of April 2026. I checked each link the day this was written. The per-token economy moves fast — confirm before you commit. Where a vendor uses fuzzy language ("blazing fast", "industry-leading"), I say so and don't repeat the claim as fact.

## What is a "model gateway", actually

Three different things have collapsed into the same product category, and the word "gateway" muddles them:

1. **Aggregators** — one API in front of many providers' models. You pick a model, they route the request. **OpenRouter** is the canonical example.
2. **First-party model hosts** — they host the open-weights models themselves on their own GPU fleet, sell access per-token. **Together, Fireworks, Groq, Cerebras, Anyscale, Deepinfra** are all this.
3. **Specialty silicon hosts** — same as #2 but the differentiator is custom hardware. **Groq** (LPU), **Cerebras** (Wafer-Scale Engine), **SambaNova** (RDU). They claim huge throughput on a narrow model list.

OpenRouter sits on top of #2 and #3. The other four sit alongside each other. Treating them as a single "gateway" market hides the most important fact: when you call OpenRouter, your tokens often actually go to one of the others.

## Headline pricing — input/output per million tokens

All numbers in USD per million tokens, rounded to two decimals. Where a vendor offers multiple tiers (e.g., "Reference" vs "Pro"), I quote the default cited on the pricing page. Token prices change frequently — these are April 2026 snapshots.

### Llama 3.3 70B Instruct

| Provider | Input ($/M tok) | Output ($/M tok) | Source |
|---|---|---|---|
| OpenRouter | varies (routes to underlying provider) | varies | [OpenRouter Llama 3.3 70B](https://openrouter.ai/meta-llama/llama-3.3-70b-instruct) |
| Together AI | $0.88 | $0.88 | [Together pricing](https://www.together.ai/pricing) |
| Groq | $0.59 | $0.79 | [Groq pricing](https://groq.com/pricing/) |
| Fireworks AI | $0.90 | $0.90 | [Fireworks pricing](https://fireworks.ai/pricing) |
| Cerebras | not currently offered on default plan | — | [Cerebras pricing](https://www.cerebras.ai/inference) |

### Llama 3.1 8B Instruct

| Provider | Input ($/M tok) | Output ($/M tok) | Source |
|---|---|---|---|
| OpenRouter | varies | varies | [OpenRouter Llama 3.1 8B](https://openrouter.ai/meta-llama/llama-3.1-8b-instruct) |
| Together AI | $0.18 | $0.18 | [Together pricing](https://www.together.ai/pricing) |
| Groq | $0.05 | $0.08 | [Groq pricing](https://groq.com/pricing/) |
| Fireworks AI | $0.20 | $0.20 | [Fireworks pricing](https://fireworks.ai/pricing) |
| Cerebras | $0.10 | $0.10 | [Cerebras pricing](https://www.cerebras.ai/inference) |

### DeepSeek-V3 / -R1 family (where offered)

| Provider | Model | Input ($/M tok) | Output ($/M tok) | Source |
|---|---|---|---|---|
| OpenRouter | DeepSeek-R1 | varies — currently routes to multiple providers | varies | [OpenRouter DeepSeek-R1](https://openrouter.ai/deepseek/deepseek-r1) |
| Together AI | DeepSeek-V3 | $1.25 | $1.25 | [Together pricing](https://www.together.ai/pricing) |
| Fireworks AI | DeepSeek-V3 | $0.90 | $0.90 | [Fireworks pricing](https://fireworks.ai/pricing) |
| Groq | not currently in the supported list | — | — | [Groq supported models](https://console.groq.com/docs/models) |

The OpenRouter prices are deliberately blank because OpenRouter charges you what the underlying provider charges plus a 5% platform fee on top of credits ([OpenRouter fees doc](https://openrouter.ai/docs/use-cases/byok)). Always check the model page on OpenRouter for the live number — it updates as routing changes.

## What you're actually paying for

Per-token pricing is comparable in the abstract but the **service** behind a token differs in three ways that the matrix hides:

**1. Throughput and latency.** Groq and Cerebras market themselves heavily on tokens-per-second. Groq's pricing page claims [hundreds of tokens/sec for Llama 3.3 70B](https://groq.com/pricing/) on their LPU hardware. Cerebras claims similar numbers on [their inference page](https://www.cerebras.ai/inference). I have not verified these claims. They may be true under specific batch sizes and contexts, but a single number on a pricing page is not a methodology.

**2. Context window in practice.** Many providers list "128K context" or "1M context" on the spec sheet but cap actual usable context lower on cheaper tiers, or charge a separate rate above 32K. Read the small print on each pricing page.

**3. Rate limits.** Free or low tiers have aggressive RPM/TPM (requests-per-minute, tokens-per-minute) caps that don't show up in the per-token math but absolutely show up in production. Check each vendor's [rate-limit doc](https://docs.together.ai/docs/rate-limits) before assuming you can sustain your projected throughput.

## OpenRouter — the meta-question

OpenRouter is the only true *aggregator* of the five. When you call `meta-llama/llama-3.3-70b-instruct`, OpenRouter picks one of the underlying providers (currently includes Together, Fireworks, Lambda, DeepInfra, and others — see the [model page](https://openrouter.ai/meta-llama/llama-3.3-70b-instruct) for the live list). You pay the underlying rate plus OpenRouter's credit fee.

**When OpenRouter wins:**
- You want a single API across 100+ models without juggling five accounts.
- You want OpenRouter to fail over automatically if one provider has an outage. They publish their [routing and uptime logic](https://openrouter.ai/docs/features/provider-routing).
- You want to BYOK (bring your own key) for one provider but route everything else through them. Documented [here](https://openrouter.ai/docs/use-cases/byok).

**When going direct wins:**
- You're sending serious volume to one model — direct contracts at Together, Fireworks, or DeepInfra get cheaper.
- You need a feature OpenRouter doesn't expose (e.g., Together's fine-tuning API, Fireworks' on-demand model deployment).
- You need streaming with absolute lowest latency — one fewer hop matters here.

## Specialty silicon — Groq and Cerebras

Both make extraordinary claims about throughput on their respective custom chips. Both are real companies shipping production traffic. Both have narrower model menus than the GPU-based hosts.

**Groq** — runs Llama, Mixtral, Whisper, Qwen, DeepSeek-R1 distill, and a handful of others on their LPU. [Full supported list](https://console.groq.com/docs/models). Their value prop is consistent low latency for chat-style workloads. Free tier exists with hard rate limits.

**Cerebras** — runs Llama 3.1 8B, 70B, 405B, Qwen, and a handful of others on the WSE-3. [Pricing here](https://www.cerebras.ai/inference). Their value prop is highest tokens/sec for streaming generation. Free trial, then paid tier.

**The honest take.** If you have a workload where chat latency dominates UX (think: realtime voice agents, autocomplete, IDE), trial both Groq and Cerebras side-by-side with *your* prompts and *your* model and see what you actually get. Vendor benchmarks are best-case numbers and the gap between best-case and your-case can be 5×.

## When per-token gateways are the wrong choice

Three cases where you should not use any of these:

1. **You need a private model fine-tuned on your data.** Per-token gateways host *public* model weights. For a custom fine-tune, go to Together's fine-tuning, Fireworks' on-demand, or rent GPUs (see our [serverless GPU pricing matrix](/serverless-gpu-pricing-matrix-2026/)).
2. **You need on-prem or VPC deployment.** None of the per-token gateways run inside your network. AWS Bedrock, Azure AI Foundry, or self-hosted is the path.
3. **Your volume is so high that the per-token margin matters more than dev velocity.** At that point, GPU rental + your own inference server (vLLM, TGI, sgLang) starts to pencil out.

For the small-to-medium case — you're shipping a product, you want a chat or completion endpoint, you don't want to think about hardware — the per-token gateway market in 2026 is the cleanest deal in cloud computing. Just check the price the morning you launch, because it might have changed.

## Sources

- OpenRouter Llama 3.3 70B model page — https://openrouter.ai/meta-llama/llama-3.3-70b-instruct
- OpenRouter Llama 3.1 8B model page — https://openrouter.ai/meta-llama/llama-3.1-8b-instruct
- OpenRouter DeepSeek-R1 model page — https://openrouter.ai/deepseek/deepseek-r1
- OpenRouter BYOK / fees doc — https://openrouter.ai/docs/use-cases/byok
- OpenRouter provider routing — https://openrouter.ai/docs/features/provider-routing
- Together AI pricing — https://www.together.ai/pricing
- Together AI rate limits — https://docs.together.ai/docs/rate-limits
- Groq pricing — https://groq.com/pricing/
- Groq supported models — https://console.groq.com/docs/models
- Fireworks AI pricing — https://fireworks.ai/pricing
- Cerebras inference pricing — https://www.cerebras.ai/inference
