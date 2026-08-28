---
title: "What GPU do you need to run Llama 70B? VRAM, context, and KV-cache guide"
description: "Size Llama 70B for 4-bit, 8-bit, and BF16 with KV-cache math, context and concurrency headroom, and verified August 2026 GPU rates."
pubDate: 2026-07-29
updatedDate: 2026-08-28
category: ai-hosting
author: Alex Harmon
draft: false
---

**Source-backed deployment guide; calculations are labeled.** This refresh uses Meta's Llama architecture paper and Llama 3.3 model card, current inference-runtime documentation, and public GPU prices checked on **August 27–28, 2026**. HostFleet did not benchmark tokens per second, latency, model quality, cloud capacity, or cold starts. Read the [HostFleet methodology and affiliate policy](https://hostfleet.net/about/) for how sourced and measured claims are separated.

**GPU prices verified:** August 27, 2026<br>
**Model and runtime sources checked:** August 28, 2026

# What GPU do you need to run Llama 70B? VRAM, context, and KV-cache guide

For **Llama 3.3 70B**, use a **48 GB GPU only as the entry point for a 4-bit, short-context, single-user test**. Use **80–96 GB** when the 4-bit deployment needs longer contexts or concurrency, or when you want to attempt 8-bit on one GPU. For BF16/FP16, **180 GB is the first credible single-GPU tier for modest contexts**, while a full 128K context or several active sequences can justify a **288 GB tier or multiple GPUs**.

The common shortcut—70 billion parameters times four bits equals about 35 GB—counts only raw weights. It does not count quantization metadata, CUDA graphs, runtime workspace, temporary tensors, or the key-value cache that grows with context and concurrent sequences.

This guide makes the missing cache term explicit. It is still a planning model, not a promise that a particular quantized artifact or inference engine will fit.

## The buying answer

| Llama 70B deployment goal | Capacity to test first | Why |
|---|---:|---|
| 4-bit, one short sequence | **48 GB** | About 35 GB of raw weights leaves limited room for quantization overhead, runtime allocations, and cache |
| 4-bit, 32K context or several active short sequences | **80–96 GB** | A BF16 KV cache is about 10 GiB per full 32K sequence before runtime overhead |
| 8-bit, one short sequence | **80 GB lab floor; 96 GB safer** | Raw 8-bit weights are about 70 GB, so an 80 GB card has little operating headroom |
| BF16/FP16, short-to-moderate context | **180 GB** | Raw weights are about 140 GB; a 141 GB H200 is not a practical fit |
| BF16/FP16 near 128K, or more concurrency | **288 GB or multiple GPUs** | One full BF16 128K KV cache is about 40 GiB before runtime allocations |

These are **capacity starting points**, not speed recommendations. A newer GPU can be faster than an older card with the same VRAM, and an engine may not support every quantization or accelerator equally well. Confirm software compatibility and measure the exact deployment before buying reserved capacity.

## Llama 70B memory has three main buckets

The planning equation is:

```text
required GPU memory ≈ model weights + KV cache + runtime headroom
```

### 1. Model weights

A deliberately simple lower-bound estimate is:

```text
raw weight memory in decimal GB ≈ parameters in billions × bits per weight ÷ 8
```

For the public 70B parameter label in Meta's Llama 3.3 model card:

| Weight format | Raw-weight estimate | What the number omits |
|---|---:|---|
| 4-bit | about **35 GB** | Quantization scales, metadata, runtime workspace, and KV cache |
| 8-bit | about **70 GB** | Runtime workspace and KV cache; some methods retain selected values at higher precision |
| BF16 / FP16 | about **140 GB** | Runtime workspace and KV cache |

The formula uses decimal GB and the rounded 70B label. It is not a file-size claim for a specific GGUF, AWQ, GPTQ, bitsandbytes, or other artifact. Hugging Face's bitsandbytes documentation says 8-bit quantization halves model memory usage, but the actual footprint must still be read from the loaded model.

### 2. KV cache

During autoregressive inference, the server retains key and value tensors for tokens already processed. That cache is why context length and concurrent sequences are memory decisions.

Meta's Llama 3 architecture paper lists the 70B design with **80 layers, model dimension 8,192, 64 attention heads, and 8 key/value heads**. The attention-head dimension is 8,192 ÷ 64 = 128. For a BF16 or FP16 cache at two bytes per value, the transparent estimate is:

```text
KV bytes per token per sequence =
  2 for key and value
  × 80 layers
  × 8 KV heads
  × 128 values per head
  × 2 bytes
  = 327,680 bytes
```

That is **0.3125 MiB per token per active sequence**. It produces the following cache-only estimates:

| Filled context per active sequence | BF16/FP16 KV cache, one sequence | Four full sequences |
|---:|---:|---:|
| 8,192 tokens | **2.5 GiB** | **10 GiB** |
| 32,768 tokens | **10 GiB** | **40 GiB** |
| 65,536 tokens | **20 GiB** | **80 GiB** |
| 131,072 tokens | **40 GiB** | **160 GiB** |

**Estimate assumptions:** the Llama 3 70B architecture in Meta's paper; every sequence filled to the stated length; keys and values stored at two bytes each; no prefix sharing; and no cache quantization. Real engines allocate cache in blocks, may reserve less than the theoretical maximum, and can reuse prefixes or evict blocks.

vLLM documents an FP8 KV-cache option that can reduce the cache footprint and allow more tokens in memory. That is an optimization to evaluate, not permission to divide every number blindly: vLLM recommends calibrated scales for maximum accuracy, and backend support matters. The conservative table above keeps the cache at BF16/FP16.

### 3. Runtime headroom

Weights plus theoretical cache still do not equal a deployable configuration. The engine needs memory for kernels, CUDA graphs, temporary tensors, communication buffers, and its own allocator. The exact requirement changes with engine version, maximum sequence count, batch policy, tensor parallelism, and quantization backend.

This is why an H200 with 141 GB of VRAM is not an honest BF16 Llama 70B recommendation. The raw-weight estimate already consumes roughly 140 decimal GB. There is effectively no room for the serving process or a useful cache.

## Why context and concurrency change the recommendation

### 4-bit on 48 GB: keep the test narrow

A 48 GB A40 or RTX A6000 is still a sensible low-cost place to prove that a 4-bit artifact loads and answers short requests. But it is a poor basis for promising a 32K context or multi-user service.

The raw 4-bit estimate is about 35 GB. Add a theoretical 10 GiB BF16 cache for one filled 32K sequence and the deployment is already close to the card's advertised capacity before quantization overhead or runtime workspace. The units are not identical—weight arithmetic above uses decimal GB while GPU and cache reporting commonly use binary GiB—but that mismatch does not rescue a configuration with almost no margin.

Treat 48 GB as a **compatibility experiment**. If the intended product needs long documents, several active chats, or a generous maximum sequence count, start testing at 80 or 96 GB instead.

### 8-bit on 80 GB: a floor, not a comfortable target

An 80 GB A100 or H100 can attempt 8-bit Llama 70B because the raw weight estimate is about 70 GB. It does not follow that a long-context endpoint will fit.

At 32K, the theoretical BF16 cache is another 10 GiB for one full sequence. That consumes essentially all remaining nominal capacity before the engine's own allocations. A 96 GB RTX PRO 6000 creates more memory margin, although its actual throughput and software support must be tested rather than inferred from VRAM.

If 8-bit quality is a requirement rather than a habit, compare an 80 GB lab run with a 96 GB production candidate. If the engine still cannot hold the target sequence count, reduce context or concurrency, evaluate KV-cache quantization, or distribute the model.

### BF16 on 180 GB: credible, but not unlimited

A 180 GB B200 leaves roughly 40 GB above the simple 140 GB raw-weight estimate. That makes it the first credible current single-GPU capacity tier for BF16 Llama 70B, but it does not guarantee the model plus a full 128K BF16 cache will fit. That cache alone is about 40 GiB, leaving no honest allowance for the runtime.

For a short or moderate context, 180 GB is a defensible first test. For 128K, multiple simultaneous sequences, or generous allocator headroom, a 288 GB B300 or a supported multi-GPU topology is the safer planning tier.

Multi-GPU changes the operational problem. Tensor parallelism adds topology, communication, placement, and failure-recovery constraints. Capacity may fit across two cards while latency or cost becomes unacceptable. Benchmark the exact topology rather than treating total VRAM as one pooled card.

## Current cloud price ladder for the capacity tiers

The table below uses selected public one-GPU options from [HostFleet's live GPU pricing table](https://hostfleet.net/gpu-pricing/). HostFleet's complete 21-provider ledger rechecked every displayed rate against its official source on **August 27, 2026**. These rows illustrate a capacity ladder; they do not prove stock, quota, regional access, or performance.

| Capacity tier | Selected published option | Public rate checked Aug. 27 | 720-hour estimate | Important boundary |
|---|---|---:|---:|---|
| 48 GB | [RunPod Pods A40](https://www.runpod.io/pricing) | **$0.44/hr** | about **$317** | Secure Cloud always-on Pod rate; storage and stopped-resource behavior are separate |
| 80 GB | [Hyperstack A100 80 GB](https://www.hyperstack.cloud/gpu-pricing) | **$1.35/hr** | about **$972** | Tracked one-GPU flavor includes fixed CPU, RAM, and local storage; dataset location is Canada-1 |
| 96 GB | [Nebius RTX PRO 6000](https://nebius.com/prices) | **$1.80/hr** | about **$1,296** | One-GPU prescribed configuration includes 24 vCPU and 218 GB RAM |
| 141 GB | [Koyeb H200](https://www.koyeb.com/pricing) | **$3.00/hr** | about **$2,160** | Serverless instance; scale-to-zero is public preview and region-specific availability is not guaranteed |
| 180 GB | [Koyeb B200](https://www.koyeb.com/pricing) | **$5.50/hr** | about **$3,960** | Serverless instance with the same preview and availability caveats |
| 288 GB | [Nebius B300](https://nebius.com/prices) | **$7.85/hr** | about **$5,652** | One-GPU prescribed configuration; public price is not evidence of capacity |

**Estimate assumptions:** one GPU remains allocated for 720 hours in a 30-day month; public USD list rates; no discounts, taxes, additional storage, network, or separately billed resources beyond what each exact row includes. The monthly column is arithmetic, not a vendor quote.

The selected products are not interchangeable. RunPod's row is an always-on Pod. Hyperstack and Nebius rows are GPU VM configurations. Koyeb's rows are per-second serverless GPU instances. Compare the billing boundary as well as the accelerator. The [serverless GPU pricing matrix](https://hostfleet.net/serverless-gpu-pricing-matrix-2026/) separates those product models, while the [GPU cost calculator](https://hostfleet.net/gpu-cloud-cost-calculator-2026/) lets you change allocated hours.

Koyeb's scale-to-zero documentation, checked August 28, explicitly includes GPU instances but labels the feature public preview. The default idle period is five minutes. A supported new request can wake a sleeping service, but HTTP/2 requests cannot do so, and no public GPU wake-time SLA is documented. At the current H200 rate, a nominal five-minute idle tail is **$0.25**; for B200 it is about **$0.46**. Those are rate × 5/60 estimates and exclude active work and wake/model-load time.

If the chosen GPU will stay warm continuously, compare the 720-hour result with the [A100 rental price guide](https://hostfleet.net/a100-rental-price-per-hour-2026/) or [H100 rental price guide](https://hostfleet.net/h100-rental-price-per-hour-2026/), as applicable. If it can genuinely return to zero, compare total allocated seconds—including model loading and idle tails—not just inference time.

## The same weight arithmetic for other open-model sizes

The method generalizes, but architecture-specific KV cache does not. The raw-weight columns below use public parameter counts from the linked model cards and the same bits-per-weight formula. The suggested 4-bit tier is only a first capacity test for a short context and one active sequence.

| Example model | Published parameters | 4-bit raw weights | 8-bit raw weights | BF16/FP16 raw weights | First 4-bit capacity test |
|---|---:|---:|---:|---:|---:|
| [Qwen3 8B](https://huggingface.co/Qwen/Qwen3-8B) | 8.2B | about 4.1 GB | about 8.2 GB | about 16.4 GB | 16 GB |
| [Mistral Small 3.1](https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503) | 24B | about 12 GB | about 24 GB | about 48 GB | 24 GB |
| [Qwen3 32B](https://huggingface.co/Qwen/Qwen3-32B) | 32.8B | about 16.4 GB | about 32.8 GB | about 65.6 GB | 24–32 GB |
| Llama 3.3 70B | 70B | about 35 GB | about 70 GB | about 140 GB | 48 GB |

Do not reuse Llama's 0.3125 MiB-per-token cache estimate for those models. KV-cache size depends on layer count, key/value head count, head dimension, cache dtype, and sequence count. Repeat the architecture math or use the inference engine's cache report.

## A deployment test that produces a real answer

The capacity table should narrow the first rental, not replace a test. Use this sequence before committing to a warm month:

1. **Choose the exact artifact.** Record model revision, quantization method, file size, and inference-engine version.
2. **Set the real limits.** Configure the intended maximum model length, maximum active sequences, batch policy, and cache dtype.
3. **Load at the smallest plausible tier.** Capture weight memory, cache capacity reported by the engine, and free memory after initialization.
4. **Fill the context.** Test short, typical, and maximum prompt-plus-output lengths rather than one tiny prompt.
5. **Add concurrency gradually.** Run one sequence, then the expected active count, while recording peak GPU memory, time to first token, completion latency, and out-of-memory events.
6. **Repeat after restarts.** A deployment that fits once but fails during cold load, graph capture, or a version change is not production capacity.
7. **Price allocated time.** Include startup, model loading, idle retention, failed runs, and storage—not only successful generation seconds.

For RunPod specifically, read [RunPod pricing: Pods vs Serverless](https://hostfleet.net/runpod-pricing-guide-2026/) before interpreting the A40 hourly rate. The cheaper product can become the more expensive deployment if shutdown behavior does not match the traffic pattern.

## Verdict

The useful answer to “what GPU runs Llama 70B?” is a range tied to the serving configuration:

- **48 GB** is the 4-bit, short-context experiment tier.
- **80–96 GB** is the practical zone for longer-context 4-bit work or single-GPU 8-bit testing.
- **180 GB** is the first credible single-GPU BF16 tier for moderate contexts.
- **288 GB or multiple GPUs** is the safer plan for BF16 near 128K or meaningful concurrency.

The key correction is that weights are only the first line. For the Llama 3 70B architecture, one BF16 KV cache consumes about **2.5 GiB at 8K, 10 GiB at 32K, and 40 GiB at 128K per filled sequence**. Concurrency multiplies that cache requirement.

Choose the smallest tier that preserves headroom for the intended context and sequence count, then prove it with the exact artifact and runtime. That is less satisfying than a universal GPU name, but it is the difference between a model that loads and a service that stays up.

## Sources

Model and runtime sources were accessed **August 28, 2026**. Pricing sources were checked **August 27, 2026**, except Koyeb scale-to-zero documentation, checked August 28.

- [Meta Llama 3.3 model card](https://raw.githubusercontent.com/meta-llama/llama-models/main/models/llama3_3/MODEL_CARD.md) — 70B parameter label, 128K context, and GQA description
- [The Llama 3 Herd of Models](https://arxiv.org/html/2407.21783) — 70B layer, dimension, attention-head, and key/value-head architecture values
- [Hugging Face bitsandbytes documentation](https://huggingface.co/docs/transformers/quantization/bitsandbytes) — weight-quantization behavior and memory-footprint guidance
- [vLLM quantized KV-cache documentation](https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/) — FP8 KV-cache options, supported schemes, and calibration guidance
- [vLLM engine arguments](https://docs.vllm.ai/en/latest/configuration/engine_args/) — model-length, sequence, cache, and scheduler controls
- [Qwen3 8B model card](https://huggingface.co/Qwen/Qwen3-8B) — 8.2B parameter count
- [Qwen3 32B model card](https://huggingface.co/Qwen/Qwen3-32B) — 32.8B parameter count
- [Mistral Small 3.1 24B model card](https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503) — 24B parameter count
- [RunPod pricing](https://www.runpod.io/pricing) — selected A40 Pod rate
- [Hyperstack GPU pricing](https://www.hyperstack.cloud/gpu-pricing) — selected A100 80 GB rate
- [Nebius AI Cloud pricing](https://nebius.com/prices) — selected RTX PRO 6000 and B300 rates
- [Koyeb pricing](https://www.koyeb.com/pricing) — selected H200 and B200 rates
- [Koyeb scale-to-zero documentation](https://www.koyeb.com/docs/run-and-scale/scale-to-zero) — preview status, GPU eligibility, default idle period, and wake-protocol limits
- HostFleet GPU pricing dataset — `/opt/hostbot-v2/src/data/gpu-pricing.json`, updated August 27, 2026
- HostFleet full source-verification ledger — `/opt/hostbot/data/ai-hosting/notes/2026-08-27-gpu-pricing-full-verification.md`
- HostFleet Koyeb limits note — `/opt/hostbot/data/ai-hosting/notes/2026-08-28-koyeb-gpu-scale-to-zero-limits.md`

*Signing up for a GPU host? Using our affiliate link supports HostFleet's testing budget at no extra cost to you: [RunPod (+$5 credit on your first $10)](https://hostfleet.net/go/runpod). Links are labeled, and source citations in this article are never affiliate links.*
