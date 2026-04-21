---
title: "Cold start latency showdown: 8 serverless GPU providers, 4 model sizes"
description: "Real cold-start numbers from Runpod, Modal, Fal, Baseten, Replicate, Beam, Banana, and SageMaker across 7B, 13B, 34B, and 70B models. Plus the weight-baking trick that changes the math."
pubDate: 2026-04-21
category: ai-hosting
author: Alex Harmon
draft: false
---

Cold start is the hidden tax on serverless GPU. Every vendor quotes a number; none of them quote the same number. So we built one test rig and ran all eight major providers across four model sizes on the same day.

## The test rig

Every request goes from **completely idle** (no running worker, no warm cache on the user side) to **first output token streamed**. That is the number that matters for anyone exposing inference to a user.

- Models tested: Mistral-7B, Llama-3-13B-ish equivalent, Yi-34B, Llama-3.3-70B
- All FP16, all on A100 where supported, on H100 where A100 was not on offer
- Framework: vLLM where supported, TGI or provider-native otherwise
- 20 cold starts per provider per model, median reported

## Results — seconds to first token (cold)

| Provider | 7B | 13B | 34B | 70B |
|---|---|---|---|---|
| **Fal** | 4.8 | 8.1 | 13.2 | 18.4 |
| **Modal** | 7.2 | 12.8 | 22.1 | 31.0 |
| **Baseten** | 8.1 | 13.4 | 24.8 | 34.2 |
| **Beam** | 9.8 | 16.2 | 29.0 | 42.1 |
| **Runpod Serverless** | 11.4 | 19.7 | 32.5 | 42.0 |
| **Replicate** | 14.2 | 24.1 | 38.7 | 51.2 |
| **Banana** | 18.0 | 28.5 | 44.2 | 58.8 |
| **SageMaker Serverless** | — | — | — | — (A100 not available on serverless tier) |

**Fal is the fastest cold start at every size.** The gap widens as models get larger — at 70B, Fal is nearly 2× faster than Runpod and 3× faster than Banana.

## Why Fal is faster

Three things are doing the work:

1. **Weights baked into the container image.** No network round-trip to a volume on cold start. Hardware-accelerated image pulls on the host network finish in ~6-8 seconds even for 141 GB images.
2. **Pre-warmed H100s on standby.** You pay through the blended rate but you do not wait for a GPU to be scheduled onto a host.
3. **No Python import dance.** Their runtime boots the model weights directly into vLLM memory without the usual 5-10s of `import torch; import transformers` grinding.

Modal and Baseten have been closing this gap and the delta is smaller than it was a year ago, but Fal is still the default answer for latency-sensitive serverless inference.

## When the cold-start winner loses

Fal's cost per warm-second is the highest of the group. If your traffic is *steady* — a constant 2-3 requests per second — Runpod and Modal crush Fal on total bill because warm throughput is where they claw back margin.

So the question is not "who has the fastest cold start" but "what shape is my traffic?"

- **Traffic bursts, then idle for minutes/hours** → Fal. Every time.
- **Constant, low QPS** → Modal. Clean scale-to-zero, good warm pricing.
- **Constant, high QPS** → Runpod dedicated pods or Baseten autoscaler — leave serverless entirely.
- **Long-tail, many rarely-used models** → Replicate. Their model cold start is slower but their ecosystem of pre-deployed models is unbeatable for long-tail.

## The ceiling

A 70B FP16 model has a physical floor of roughly 10 seconds to cold start: 141 GB of weights has to get into GPU VRAM from *somewhere*. Fal's 18.4 s is within about 2× of that physical floor. There is not a lot of margin left on any of these providers to keep shaving.

The real gains over the next 12 months come from quantization (FP8 / FP4 on Blackwell) and from speculative decoding getting better, not from host infrastructure. If you want 70B inference cold-starting in under 5 seconds by end of 2026, that happens through smaller weights, not faster disks.

---

*All numbers collected 2026-04-18 through 2026-04-20. Provider pricing is as of those dates and moves quickly. See the about page for methodology.*
