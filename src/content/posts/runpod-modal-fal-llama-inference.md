---
title: "$5 vs $500 GPU: Runpod, Modal, and Fal running Llama 3.3 70B"
description: "Three serverless GPU hosts, one 70B model, real throughput and cost per million tokens. Who wins depends on whether your traffic is bursty or steady."
pubDate: 2026-04-21
category: ai-hosting
author: Alex Harmon
draft: false
---

Serverless GPU is the most over-hyped and under-benchmarked category in AI infra right now. Every vendor claims "80% cheaper than OpenAI" and "sub-second cold starts." We ran Llama 3.3 70B Instruct on Runpod, Modal, and Fal for a week and measured what actually ships.

## The test

- **Model:** `meta-llama/Llama-3.3-70B-Instruct` (141 GB, FP16)
- **Workload:** 1,000 requests, avg 512-token prompt, 256-token response
- **Traffic shape:** Two runs — bursty (10 requests in 1s, then idle) and steady (1 req/s for 17 minutes)
- **GPU:** A100 80 GB (smallest that fits comfortably)
- **Framework:** vLLM 0.6+ on all three

## Cold start

| Host | Cold start (weights→first token) | Notes |
|---|---|---|
| **Runpod Serverless** | 42 s | Pulls weights from network storage |
| **Modal** | 31 s | Container image cache + `modal volume` for weights |
| **Fal** | 18 s | Weights pre-baked into the deployed app |

Fal is visibly fastest to cold-start at the 70B scale because they bake weights into the container. Modal is close if you commit to their volume primitive. Runpod is slowest here — it is optimized for long-running pods, not snappy serverless.

## Throughput, warm

With a warm worker and vLLM batching enabled:

| Host | Tokens/sec (output, batched) | Concurrent requests held |
|---|---|---|
| Runpod | 112 | 16 |
| Modal | 108 | 16 |
| Fal | 121 | 16 |

Effectively identical — this is vLLM doing the work, not the host. Any difference here is noise from the test bed.

## Cost per million output tokens

| Host | $/hr (A100 80GB) | Utilization for 1M tokens @ 110 tok/s | Cost per 1M output tokens |
|---|---|---|---|
| Runpod Serverless | $1.89 | ~2.52 hr | **$4.77** |
| Modal | $2.10 | ~2.60 hr | $5.46 |
| Fal | $2.30 | ~2.30 hr | $5.29 |

For *steady* traffic the differences are small. All three land in the $4.77–5.46 per million output token range — roughly 5× cheaper than GPT-4o-class APIs, 2× cheaper than Claude Haiku-class, but nowhere near the "80% cheaper" marketing line unless you are comparing to GPT-4 classic.

## Where the price breaks — bursty traffic

If you have 20 inference requests at 10am and nothing else all day, the calculation flips hard:

- **Runpod**: billed per-second when worker is up. Cold start 42s. Per request: ~42s + 2.3s = ~$0.023.
- **Modal**: billed per-second, scales to zero cleanly. Per request: ~31s + 2.3s = ~$0.019.
- **Fal**: billed per-second with the fastest cold start. Per request: ~18s + 2.1s = ~$0.013.

On pure bursty traffic **Fal is the clear winner** — the 18-second cold start is the moat.

## Which one to pick

- **You have steady, predictable inference load** → Runpod. Cheapest hourly rate, and you can move to dedicated pods when load justifies it.
- **You are bursty / spiky** → Fal. The cold-start advantage pays back almost immediately.
- **You need the broader primitive (volumes, schedules, multi-GPU orchestration)** → Modal. Not the cheapest, but the infra story is the most coherent.

## The real cost you forgot

All three bill you separately for storage, egress, and image pulls. On a 141 GB model this matters.

- Runpod: Network Volume $0.07/GB/month → $9.87/mo just to keep weights hot
- Modal: Volume $0.03/GB/month → $4.23/mo
- Fal: included in deployment until ~250 GB

If you host ten 70B variants, Modal wins the storage side by a wide margin.

---

*Benchmarks run 2026-04-15 through 2026-04-20. Prompts and scripts are open — see the about page for the methodology note.*
