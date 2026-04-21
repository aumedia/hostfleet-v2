---
title: "Every serverless GPU host compared: pricing, GPUs, and what they claim (April 2026)"
description: "Runpod, Modal, Fal.ai, Baseten, Replicate — published hourly rates, supported GPUs, and what each vendor says about cold starts. No secret benchmarks, just a clean pricing matrix with citations."
pubDate: 2026-04-21
category: ai-hosting
author: Alex Harmon
draft: false
---

If you want to run an LLM, a diffusion model, or any custom inference workload and *not* own the GPU, you are picking between five real options in 2026: Runpod, Modal, Fal.ai, Baseten, and Replicate. This article is a pricing matrix, not a benchmark shootout. Every number comes from the vendor's public pricing page, dated April 2026.

> **Why this matters.** Every AI-infra review on the internet right now is full of hand-wavy "lightning fast!" and "2x cheaper than the competition!" claims. Most are unverifiable. I'd rather give you numbers you can verify yourself in 90 seconds than pretend I ran a 500-hour benchmark I didn't.

## The matrix — published hourly rates

All prices in USD per hour, rounded, as of April 2026. Check the vendor links before committing — rates change.

| GPU | Runpod Secure Cloud | Modal | Fal.ai | Baseten | Replicate |
|---|---|---|---|---|---|
| T4 16GB | $0.19/hr | — | — | $0.63/hr | $0.225/hr |
| L4 24GB | $0.43/hr | $0.80/hr | — | $1.21/hr | — |
| A10G 24GB | $0.69/hr | — | — | $1.21/hr | $1.23/hr |
| A100 80GB | $2.17/hr | $2.10/hr | $0.99/hr | $4.00/hr | $5.04/hr |
| H100 80GB | $3.35/hr | $3.95/hr | $1.89/hr | $6.50/hr | — |
| H200 141GB | $3.99/hr | — | — | — | — |
| B200 | — | — | — | $9.98/hr | — |

Sources: [Runpod pricing](https://www.runpod.io/pricing), [Modal pricing](https://modal.com/pricing), [Fal.ai pricing](https://fal.ai/pricing), [Baseten pricing](https://www.baseten.co/pricing/), [Replicate pricing](https://replicate.com/pricing).

## What's actually billable

The matrix above makes these look comparable. They are not, because the billing models differ:

- **Runpod** bills per-second on Pods (always-on containers) or per-millisecond on Serverless. Same GPU, different billing. [Runpod docs](https://docs.runpod.io/serverless/pricing).
- **Modal** bills per-second of GPU time (starting at $0.001097/sec for H100 = $3.95/hr). Free $30/mo credit. [Modal pricing](https://modal.com/pricing).
- **Fal.ai** often bills per-output instead of per-second for pre-packaged models (e.g. Flux image generation has a per-image price). GPU-second billing is only for custom deployments.
- **Baseten** has per-GPU-hour pricing plus a minimum dedicated deployment cost. Scale-to-zero is available but there are billed minimum awake times.
- **Replicate** bills per-second at a per-model rate. The A100-80GB rate of $0.001400/sec = $5.04/hr is the published public rate for custom model deployments.

## Cold starts — what each vendor *claims*

None of the below are numbers I measured. They are the numbers each vendor publishes in their docs or marketing. Read them with the skepticism they deserve.

- **Modal** claims "sub-second" container cold starts for CPU and "a few seconds" for typical GPU models in their [docs](https://modal.com/docs/guide/cold-start). For large models (70B+ LLMs), expect tens of seconds for weights to load from their cache layer.
- **Runpod Serverless** advertises "FlashBoot" with claimed sub-250ms cold starts for small containers. Large LLM workloads are multi-second. [Runpod FlashBoot](https://www.runpod.io/serverless-gpu).
- **Fal.ai** markets itself as having the lowest latency for pre-packaged diffusion workloads (Flux, SDXL). They publish specific model latencies on individual [model pages](https://fal.ai/models).
- **Baseten** emphasizes their custom inference runtime (Truss) reducing cold start; no official number published, but their [benchmarks page](https://www.baseten.co/blog/) shows case studies.
- **Replicate** does not publish cold-start targets. In practice, cold starts for custom models can exceed 30s when weights need to download.

**Why I'm not publishing my own numbers.** Cold start depends on: model size, your container base image, how weights are cached, which region you're in, and whether the vendor has a warm instance for your model. A single number in a blog post is useless. If you care about cold start for *your* model, deploy it to each vendor's free tier and measure with a stopwatch-grade HTTP client (`curl -w "%{time_total}"`).

## How to pick

**You're a hobbyist or indie dev** → Runpod Pods (cheapest hourly for always-on dev) or Replicate (simplest API).

**You need per-second billing and proper autoscaling** → Modal. Best DX, solid pricing, Python-native. The $30/mo free credit makes it essentially free to prototype.

**You're serving a pre-packaged diffusion or TTS model to end users** → Fal.ai. The per-output pricing + optimized runtime is hard to beat for exactly those workloads.

**You're a startup with a production inference workload and a budget** → Baseten. Most expensive per GPU-hour on paper, but Truss, observability, and support are tangible.

**You want to run Llama 3/4 at scale** → Runpod Serverless on H100/H200, or Modal with distributed inference. Don't use Replicate for this — the per-second rate adds up fast.

## What this article deliberately doesn't do

- No "I ran Llama 3 70B on all 5 providers" table. Those numbers would be dependent on quantization, batch size, tokenizer, and the specific container I built. I'd rather you run the benchmark on your own model.
- No claim that one vendor is "fastest". They're all fast in some dimension and slow in another.
- No hidden affiliate links in the body — the vendor links above all go to the official pricing pages, not referral URLs.

## Sources

- Runpod pricing — https://www.runpod.io/pricing
- Runpod Serverless docs — https://docs.runpod.io/serverless/pricing
- Modal pricing — https://modal.com/pricing
- Modal cold-start docs — https://modal.com/docs/guide/cold-start
- Fal.ai pricing — https://fal.ai/pricing
- Baseten pricing — https://www.baseten.co/pricing/
- Replicate pricing — https://replicate.com/pricing
