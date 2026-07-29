---
title: "What GPU do you need to run Llama 70B? VRAM guide for self-hosting open models"
description: "A source-backed Llama 70B VRAM guide covering 4-bit, 8-bit, and BF16 memory estimates, quantization caveats, and practical current cloud GPU capacity options."
pubDate: 2026-07-29
category: ai-hosting
author: Alex Harmon
draft: false
---

*Affiliate disclosure: HostFleet may earn a commission if you sign up through links on this page. That never changes the recommendation. Read the live [HostFleet about page](https://hostfleet.net/about/) for methodology and affiliate-policy context. This is a source-backed deployment guide: model sizes and quantization behavior come from the linked model cards and documentation. The VRAM and cost columns are transparent estimates, not performance benchmarks or capacity promises.*

**GPU prices verified:** July 28, 2026  
**Model-card sources checked:** July 28, 2026

# What GPU do you need to run Llama 70B? VRAM guide for self-hosting open models

For a **Llama 70B** model, start with a **48 GB GPU for a 4-bit, short-context experiment**, an **80 GB GPU for an 8-bit deployment**, and **180 GB or multiple GPUs for BF16 weights**. The first number is a practical starting point, not a promise that every quantized file, context length, runtime, or concurrency level will fit.

The reason is simple: a 70-billion-parameter model has roughly **35 GB of 4-bit weights**, **70 GB of 8-bit weights**, or **140 GB of BF16/FP16 weights** before the server has made room for its runtime and KV cache. Meta's Llama 3.3 model card identifies the text model as 70B, and Hugging Face documents that 8-bit quantization halves memory use. This guide applies the same deliberately simple weight arithmetic to a few current open-model sizes, then maps them to conservative starting VRAM tiers in HostFleet's live GPU dataset and gives the cheapest published rate for the selected GPU tier.

It does **not** claim tokens-per-second, latency, or production throughput. Those depend on the model file, inference engine, context length, batch size, GPU variant, and availability. If the real question is ongoing spend after selecting a GPU, use the [LLM hosting cost calculator](https://hostfleet.net/calculators/llm-hosting-cost/) alongside this guide.

## The short answer

| Your goal | Sensible starting capacity | Why | Selected published option in the current dataset |
|---|---:|---|---|
| Try Llama 3.3 70B at 4-bit with a short context and one user | **48 GB** | 4-bit weights are about 35 GB, leaving some room for the server and cache | RunPod Pods A40 — 48 GB, **$0.44/hr** |
| Run Llama 70B at 8-bit | **80 GB** | 8-bit weights alone are about 70 GB; 48 GB is not enough | RunPod Pods A100 PCIe — 80 GB, **$1.39/hr** |
| Run Llama 70B in BF16/FP16 on one GPU | **180 GB** | 140 GB of raw weights leaves essentially no operating room on a 141 GB H200 | RunPod Pods B200 — 180 GB, **$5.89/hr** |
| Serve long contexts or concurrent requests | **More VRAM or multiple GPUs** | KV cache and runtime memory grow with context and active sequences | Size from the actual engine's memory report, not this table |

The dollar figures are USD per GPU-hour from [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/), refreshed **July 23, 2026** and checked against vendor pricing pages on July 29. They are selected published rates, not a stock guarantee. The RunPod rows are always-on Pod rates, so a stopped GPU is not the same thing as a zero bill. See [RunPod pricing: Pods vs Serverless](https://hostfleet.net/runpod-pricing-guide-2026/) before treating the lowest hourly rate as the lowest operating cost.

## Why a 70B model does not just need 35 GB

The basic estimate is intentionally boring:

```text
raw weight memory (GB) ≈ parameter count in billions × bits per weight ÷ 8
```

For Llama 70B, that gives:

| Weight format | Raw-weight estimate | What it means |
|---|---:|---|
| 4-bit | about **35 GB** | A lower bound for the quantized weights, before quantization metadata, runtime allocations, and KV cache |
| 8-bit | about **70 GB** | Roughly twice the 4-bit raw footprint; Hugging Face says 8-bit quantization halves memory use versus the usual higher-precision form |
| BF16 / FP16 | about **140 GB** | Two bytes per parameter before the server starts doing inference work |

That formula uses decimal GB and rounds the model's public 70B label. It is an **estimate**, not a claim about one particular GGUF, AWQ, GPTQ, bitsandbytes, or engine build. Quantizers store scales and other metadata; an inference server needs workspace memory; and every active request needs a KV cache. Those extras are exactly why an H200's 141 GB is not an honest single-GPU recommendation for 140 GB of BF16 weights.

A useful rule: choose the GPU for the **weights plus headroom**, not for a screenshot that says the raw file size is smaller than VRAM. A 48 GB card can be a good 4-bit experiment target; it is a bad premise for saying 70B will handle a large context, a high batch size, or multiple users without testing.

## VRAM guide: Llama 70B and other open-model sizes

The table below gives raw-weight estimates for four model cards, then a deliberately conservative first cloud-GPU target for **4-bit inference with a short context and one active sequence**. It is not a compatibility list. The recommended card is the lowest-capacity advertised VRAM tier that leaves meaningful space above the 4-bit weight estimate; its price is the cheapest published rate for that selected GPU tier.

| Example open model | Published parameter count | 4-bit raw weights (estimate) | 8-bit raw weights (estimate) | BF16/FP16 raw weights (estimate) | First 4-bit cloud target | Cheapest published rate for selected GPU |
|---|---:|---:|---:|---:|---|---:|
| Qwen3 8B | 8.2B | about 4.1 GB | about 8.2 GB | about 16.4 GB | T4 — 16 GB | Modal: **$0.59/hr** |
| Mistral Small 3.1 24B | 24B | about 12 GB | about 24 GB | about 48 GB | L4 — 24 GB | RunPod Pods: **$0.39/hr** |
| Qwen3 32B | 32.8B | about 16.4 GB | about 32.8 GB | about 65.6 GB | RTX 5090 — 32 GB | RunPod Pods: **$0.99/hr** |
| Llama 3.3 70B | 70B | about 35 GB | about 70 GB | about 140 GB | A40 / RTX A6000 — 48 GB | RunPod Pods A40: **$0.44/hr** |

There are two deliberately unglamorous caveats behind this table:

1. **The 4-bit targets are first-deployment targets, not throughput targets.** The cheap 48 GB A40 row is a capacity match for a short-context 70B experiment. It may be a poor choice for a latency-sensitive public API, and the exact card or region may not be available when you need it.
2. **The listed price is not a complete bill.** It excludes storage, network, CPU/RAM, and any time the container is left running. A cheaper always-on Pod can cost more than a higher-rate serverless worker if the workload truly scales to zero. The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) explains that operating-model difference.

For a new deployment, the table answers one narrow question: *what is the smallest advertised VRAM tier worth testing first?* It does not answer whether that GPU delivers acceptable latency for your prompt length or traffic.

## Llama 70B: choose the precision before choosing the GPU

### 4-bit: the normal self-hosting entry point

A 4-bit Llama 70B is the realistic entry point when the goal is to prove that self-hosting works. Its approximate 35 GB of weights is why 48 GB is the first sensible single-GPU tier rather than 24 GB or 32 GB. The gap is not lavish: it has to cover the runtime, quantization overhead, and at least some KV cache.

Start with one user, a constrained context window, and the exact quantized artifact you plan to serve. Measure the engine's reported memory use before increasing context, batching, or concurrency. If it does not fit reliably, the fix is not a more optimistic spreadsheet—it is a bigger VRAM tier, a different quantization, shorter context, or a multi-GPU deployment.

### 8-bit: 80 GB is the useful single-GPU floor

At 8-bit, raw Llama 70B weights are about 70 GB. An 80 GB A100 or H100 is the first normal single-GPU capacity point, but it still does not create unlimited cache. It is appropriate when 8-bit quality is a specific requirement and the traffic shape is modest.

If the endpoint must keep that GPU warm all month, compare the monthly shape before falling in love with a per-hour number. The current published A100 Pod rate of $1.39/hour is roughly **$1,001 for 720 hours** in GPU charges alone. That is arithmetic, not a vendor quote, and excludes storage and other billable resources.

### BF16/FP16: do not size to raw weights alone

BF16/FP16 Llama 70B weights consume about 140 GB before serving starts. A 141 GB H200 looks close on paper but leaves too little headroom to call it a practical plan. For a single GPU, 180 GB-class capacity is the first honest target in the current dataset; otherwise, distribute the model across GPUs with an engine that supports that topology.

This is also the point where deployment complexity changes. Multi-GPU serving introduces placement, communication, failure recovery, and cost questions that a one-GPU proof of concept does not. If you need a managed platform rather than a container you operate, start with [RunPod for inference APIs and jobs](https://hostfleet.net/runpod-for-ai-inference-apis-and-jobs/) and compare the control plane against your latency and operational needs.

## Context length and concurrency are VRAM decisions

The model weights are mostly fixed. The KV cache is not: it grows with the number of tokens kept in context and the number of sequences being served. That means these two changes can turn a deployment that starts successfully into an out-of-memory deployment:

- increasing the context window from a short chat to long documents;
- accepting more simultaneous requests or using larger batches.

Do not borrow a published 70B throughput number and use it as a sizing result. It says nothing reliable about your quantization, engine, prompt distribution, output length, cache format, or GPU allocation. The only safe process is to deploy the exact artifact, set the intended context and concurrency, then record peak VRAM and tail latency.

A small test plan is enough to avoid the most expensive mistake:

1. Load the exact model and quantization you will use.
2. Set the production-intended maximum context window.
3. Run one request, then the expected concurrent request count.
4. Capture peak GPU memory, time to first token, and completion latency.
5. Increase the GPU tier or lower the operating target before building an SLA around an unmeasured configuration.

## Which cloud GPU should you rent?

For a bounded 4-bit Llama 70B test, the selected 48 GB starting tier in the current dataset is a **RunPod Pod A40 at $0.44/hour**. That is a good place to validate a container and model load. It is not an endorsement of an A40 as the fastest 70B serving GPU, and it is not a capacity reservation.

For an 8-bit deployment, choose an **80 GB-class GPU**. For BF16/FP16, choose **180 GB or multi-GPU**. Once the capacity decision is clear, the next choice is whether the job needs a dedicated container or a worker that can scale down. [RunPod's Pods vs Serverless guide](https://hostfleet.net/runpod-pricing-guide-2026/) is the practical comparison; [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/) is the current rate reference.

If the product does not actually need to own model serving, do not rent a GPU merely because the model is available. A CPU-first application that calls an external inference service may be cheaper and operationally safer. The right dividing line is whether self-hosting buys a concrete requirement—data placement, custom weights, predictable dedicated capacity, or a workload that has been measured—not just the appearance of control.

## Verdict

For **Llama 3.3 70B**, use **48 GB** as the lowest reasonable single-GPU starting point for a **4-bit, short-context experiment**. Move to **80 GB** for 8-bit, and to **180 GB or multiple GPUs** for BF16/FP16. The important qualifier is not optional: real VRAM need includes more than weights. Context length, concurrency, quantization format, and runtime overhead decide whether the deployment remains healthy after the model first loads.

Use the selected GPU tier to test the exact deployment, then size upward from observed peak memory. That is slower than copying a blanket “70B needs X GB” claim, but it is substantially cheaper than discovering the cache limit after the endpoint is live.

## Sources

- [Meta Llama 3.3 model card](https://raw.githubusercontent.com/meta-llama/llama-models/main/models/llama3_3/MODEL_CARD.md) — 70B model description, checked July 28, 2026
- [Qwen3 8B model card](https://huggingface.co/Qwen/Qwen3-8B) — 8.2B parameter count, checked July 28, 2026
- [Qwen3 32B model card](https://huggingface.co/Qwen/Qwen3-32B) — 32.8B parameter count, checked July 28, 2026
- [Mistral Small 3.1 24B model card](https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503) — 24B parameter count, checked July 28, 2026
- [Hugging Face bitsandbytes quantization documentation](https://huggingface.co/docs/transformers/quantization/bitsandbytes) — 8-bit memory behavior and quantization support, checked July 28, 2026
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, refreshed July 23, 2026
- [RunPod pricing](https://www.runpod.io/pricing) — provider pricing source for the selected Secure Cloud RunPod entries, checked July 29, 2026
- [Modal pricing](https://modal.com/pricing) — provider pricing source for the selected Modal T4 entry, checked July 29, 2026

*Signing up for a GPU host? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*


