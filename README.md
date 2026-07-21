# Node.js: Microservices — Learning Fork

> Fork of [LinkedInLearning/nodejs-microservices-4403064](https://github.com/LinkedInLearning/nodejs-microservices-4403064) — course *Node.js: Microservices* by Daniel Khan.
> Original README (install steps, license) is preserved below in [Original course info](#original-course-info).

---

## 🎯 Why I'm going through this

I already build and ship backend services, but this course is about going deeper on the core microservices patterns — service discovery, fault tolerance, queues — beyond just wiring them up.

Goal: for each pattern — understand *why* it works, see where it breaks, and know when it's actually the right call to reach for it.

---

## 🗂 Progress

Branch naming: `CHAPTER#_MOVIE#`, `b` = beginning state, `e` = end state. Chapters 1–2 (env setup, planning) have no code branches. Tick **Status** as you go.

### 3. Your First Service: The Catalog Service
| Video | Branch (b → e) | Status |
|---|---|---|
| Creating the service | `03_02b` → `03_02e` | ✅ |
| Adding business logic and database access | `03_04b` → `03_04e` | ✅ |
| Creating your first REST endpoint | `03_05b` → `03_05e` | ✅ |
| Completing the API | `03_06b` → `03_06e` | ✅ |
| Testing REST endpoints | `03_07b` → `03_07e` | ✅ |

### 4. Creating a Service Registry
| Video | Branch (b → e) | Status |
|---|---|---|
| Setting up the registry | `04_02b` → `04_02e` | 🟡 |
| Registering services | `04_03b` → `04_03e` | ☐ |
| Creating and testing the registration route | `04_04b` → `04_04e` | ☐ |
| Unregistering services | `04_05b` → `04_05e` | ☐ |
| Querying the registry | `04_06b` → `04_06e` | ☐ |
| Removing expired services | `04_07b` → `04_07e` | ☐ |
| Registering on service on start | `04_08b` → `04_08e` | ☐ |
| Adding heartbeat and unregistering on shutdown | `04_09b` → `04_09e` | ☐ |

### 5. Using Services
| Video | Branch (b → e) | Status |
|---|---|---|
| Creating the service client | `05_02b` → `05_02e` | ☐ |
| Using the catalog service | `05_03b` → `05_03e` | ☐ |
| Sanitizing data | `05_05b` → `05_05e` | ☐ |
| Creating the CartService | `05_06b` → `05_06e` | ☐ |

### 6. Authenticating APIs
| Video | Branch (b → e) | Status |
|---|---|---|
| Creating the user service | `06_02b` → `06_02e` | ☐ |
| Add JWT tokens to the user service | `06_03b` → `06_03e` | ☐ |
| Make the front end use JWT authentication | `06_04b` → `06_04e` | ☐ |
| Using bearer headers | `06_05b` → `06_05e` | ☐ |
| Protecting endpoints with JWT | `06_06b` → `06_06e` | ☐ |

### 7. Adding Fault Tolerance and Resilience
| Video | Branch (b → e) | Status |
|---|---|---|
| Chaos testing | `07_02b` → `07_02e` | ☐ |
| Adding caching to reduce load and bridge outages | `07_03b` → `07_03e` | ☐ |
| Setting up the order service | `07_06b` → `07_06e` | ☐ |
| Producing orders | `07_07b` → `07_07e` | ☐ |
| Consuming orders | `07_08b` → `07_08e` | ☐ |

Videos without a listed branch (e.g. "Designing a REST API", "Testing the catalog service", "Using queues for decoupling", "Installing up RabbitMQ", "Service monitoring with OpenTelemetry and Jaeger") are conceptual/config steps with no separate code state in the repo — same goes for every chapter-intro video ("What's your goal for this chapter?", "API authentication with JWT").

Other branches, meaning inferred from the name only — not documented anywhere in the original repo, worth double-checking before relying on it: `start` (presumably initial state), `final` (presumably same as `main`'s final state), plus `fix-routes-file` and `update-eslintrc`, which read like one-off fixes rather than a lesson state.

**Status legend:** ☐ not started · 🟡 in progress · ✅ done, matches `e` · 🔁 done differently, worth revisiting

---

## 🧭 How I'm working through it

1. Checkout the `b` branch for the video.
2. Create my own branch off it: `git checkout -b wip/03_02`.
3. Watch the video, implement it myself without looking at `e`.
4. Diff against `e` to check correctness, don't copy from it.
5. Update the table above with the topic and any notes worth keeping.

---

## 🐳 Local Infrastructure

Replaces the manual `docker run` steps from `_Resources` with a single `docker-compose.yml` at repo root.

**Not included:** MongoDB — using MongoDB Atlas (cloud) instead of a local container. Connection string goes in `.env` (see `.env.example`).

```bash
docker compose up -d                    # redis, jaeger, rabbitmq
docker compose --profile tools up -d    # + redis-commander
docker compose down
docker compose logs -f
```

| Service | Purpose | URL / Port |
|---|---|---|
| Redis | caching | `localhost:7379` |
| Redis Commander | Redis UI | http://localhost:8081 |
| Jaeger | tracing (OpenTelemetry) | UI: http://localhost:16686 |
| RabbitMQ | message broker | UI: http://localhost:15672 (guest/guest) |

Redis Commander runs as a container here instead of the global `npm install -g redis-commander` from the original course snippets — drop that service from `docker-compose.yml` if you'd rather run it that way.

---

This repo is for the LinkedIn Learning course [Node.js: Microservices](https://www.linkedin.com/learning/node-js-microservices-22685072) by Daniel Khan.

### Installing

1. [Node.js](https://nodejs.org/en) (current LTS)
2. A Git client — [git-scm.com](https://git-scm.com/downloads)
3. [Docker](https://www.docker.com/)

Verify with:
```bash
node -v
docker -v
git -v
```

### Branches

This repository has branches for each of the videos in the course, named `CHAPTER#_MOVIE#`. `b` = beginning state, `e` = end state, `main` = final state of the whole course.

If switching branches fails with `error: Your local changes ... would be overwritten by checkout`, either commit (`git add . && git commit -m "..."`) or stash your changes first.

Licensed under the LinkedIn Learning Exercise File License. Instructor: Daniel Khan.