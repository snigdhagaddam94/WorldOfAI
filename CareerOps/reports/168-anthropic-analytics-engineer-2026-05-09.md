# Evaluation: Anthropic — Analytics Data Engineer

**Date:** 2026-05-09
**Archetype:** Senior Data Engineer / Analytics Engineer (IC)
**Score:** 4.0/5
**Legitimacy:** High Confidence
**URL:** https://job-boards.greenhouse.io/anthropic/jobs/4956672008
**PDF:** ❌ (batch mode — PDF skipped)
**Batch ID:** 85

---

## A) Role Summary

| Field | Detail |
|-------|--------|
| Archetype detected | Senior Data Engineer / Analytics Engineer (IC) |
| Domain | AI Safety / Tech Product Analytics |
| Function | Analytics Engineering — data pipelines, dbt models, metrics reporting |
| Seniority | Senior IC (5+ years required) |
| Remote | Hybrid — SF / NYC / Seattle (on-site expected in one of three hubs) |
| Team size | Small, early — "early member of the Data Science & Analytics team" |
| Comp listed | $275,000 – $370,000 USD annually |
| TL;DR | Build the analytics data foundation at one of the world's most well-funded AI labs — dbt-centric, stakeholder-facing, high autonomy. Comp is top decile for any data eng role. |

---

## B) Match with CV

### Requirement → CV Mapping

| JD Requirement | Match | CV Evidence |
|----------------|-------|-------------|
| 5+ years Analytics/Data Engineering | ✅ Strong | 12+ years across TQL, Prime Healthcare, Cognizant/Cargill |
| ETL / ELT pipeline design | ✅ Strong | "Built batch and streaming data pipelines using ADF and PySpark" (TQL); "Designed and implemented end-to-end data engineering infrastructure" (Prime Healthcare) |
| Python (expert) | ✅ Strong | cv.md Skills: "Python (expert)" |
| SQL (expert) | ✅ Strong | cv.md Skills: "SQL (expert)" |
| Workflow platforms (Airflow) | ✅ Match | cv.md Skills: "Infrastructure Automation: Terraform, Jenkins, Airflow" |
| Data integrity standards + SLAs | ✅ Strong | "Developed SQL and Python-based validations for ETL quality checks" (Prime Healthcare) |
| Stakeholder → technical requirement translation | ✅ Strong | "Partnered with stakeholders to gather business requirements and translate them into robust Azure data architecture" (TQL) |
| Dashboard / BI delivery | ✅ Match | Power BI dashboards at TQL and Prime Healthcare |
| dbt proficiency | ⚠️ Gap | Not mentioned in CV — hard gap for this role's core toolchain |
| Visualization tool: Hex | ⚠️ Minor gap | Not in CV; Power BI experience is adjacent |
| Modern analytics stack (BigQuery/Snowflake/Redshift) | ⚠️ Moderate gap | CV is Azure-native (Synapse, ADLS); Vinay hasn't worked with Snowflake or BigQuery explicitly |
| Startup / early-stage analytics experience | ⚠️ Nice-to-have | Enterprise/consulting background at Cognizant, Prime Healthcare, TQL |
| Bachelor's degree or equivalent | ✅ | MBA, Concordia University (2018) |

### Gaps & Mitigation

| Gap | Blocker? | Mitigation |
|-----|----------|------------|
| dbt | Soft blocker — central to role | Frame: "I've built Medallion architecture with ADF/Databricks performing the same T-layer transformations dbt handles. dbt is a different tool, same discipline." Note: dbt has a shallow learning curve for senior SQL/Python engineers. Can demonstrate by building a dbt project on the side pre-application. |
| Hex | No | Power BI + SSAS + Synapse show strong BI delivery chops. Hex is minor. |
| Snowflake/BigQuery | Soft blocker | Frame Azure Synapse as architecturally equivalent DWH; emphasize platform-agnostic data engineering principles. Mention ADLS → Synapse is comparable to S3 → Redshift/BigQuery pattern. |
| Startup experience | No — nice-to-have | Lead with "Spearheaded adoption of Azure Databricks" and proof-of-concept to production narrative from Prime Healthcare. Shows startup-style decision-making within larger orgs. |

### Sponsorship Check
Anthropic explicitly states: "Anthropic sponsors visas, though success varies by role and candidate. We retain an immigration lawyer to help with this."

**→ H1B sponsorship CONFIRMED. No blocker.**

---

## C) Level & Strategy

**JD level:** Senior IC — 5+ years required; early team, high autonomy and ownership.

**Candidate level:** Vinay at 12+ years is slightly over-leveled for the minimum bar, which is an advantage — he can frame himself as the engineer who builds foundations that don't need to be rebuilt.

**Strategy — "Sell senior without lying":**
- Lead with scope: "I've built Medallion architectures serving multiple business units with millions of rows, not just pipelines for one team."
- Lead with ownership: "At Prime Healthcare I built end-to-end ELT infrastructure that moved clinical data from legacy SSIS to real-time Azure streaming — full lifecycle, no safety net."
- Acknowledge dbt directly and confidently: "I haven't used dbt in production, but I've designed and built the same transformation layer with ADF + Databricks. I can get to dbt production-ready in 2-3 weeks."

**If downleveled (L4/mid-level):** Accept only if comp meets $170K+ target — at Anthropic's ranges, even mid-level clears that easily. Establish 6-month review criterion: "If I'm delivering L5 output, I expect the title adjustment at the review."

---

## D) Comp & Demand

### Listed Compensation
| | Range |
|-|-------|
| Annual base (per JD) | **$275,000 – $370,000 USD** |
| Vinay's target | $170,000+ USD |
| Delta | +$105K to +$200K above walk-away |

### Market Context (Sources: Levels.fyi, h1bgrader.com, Glassdoor)
| Source | Data |
|--------|------|
| Levels.fyi — Anthropic Data Engineer L5 | Base $294,000 + equity |
| Anthropic median total comp (all roles) | $443K/year |
| Anthropic H1B LCA median (FY2025) | $300,000 |
| Anthropic H1B LCA 90th percentile | $340,000 |
| Glassdoor — Anthropic overall | $300K–$490K TC |

**Comp Score: 5/5** — Top decile of US data engineering market. Listed range ($275K–$370K) is well above Vinay's $170K target and above most senior data engineering comp benchmarks.

**Equity note:** Anthropic equity (RSUs/options) adds 30–50% to TC at senior levels. Total comp likely $350K–$500K+ depending on grant size.

---

## E) CV Customization Plan

| # | Section | Current State | Proposed Change | Why |
|---|---------|---------------|-----------------|-----|
| 1 | Professional Summary | Azure-focused, healthcare/logistics framing | Rewrite to emphasize "analytics data engineering," end-to-end pipeline ownership, Python/SQL depth, and ability to build analytics functions from scratch | JD calls for "early team member" who builds foundation |
| 2 | TQL role bullets | Generic "batch and streaming pipelines" | Lead with: "Designed Medallion architecture to transform raw operational logs into canonical datasets for enterprise reporting — staging, silver, gold with SLA enforcement" | Directly mirrors JD language ("raw logs into canonical datasets") |
| 3 | Skills section | Lists "Airflow" buried in Infrastructure | Surface Airflow, Python, SQL as top-3 skills with explicit proficiency labels | JD calls out Airflow and SQL/Python expertise explicitly |
| 4 | Prime Healthcare | General BI dashboard mention | Rephrase to: "Built self-serve analytics capabilities backed by Azure Synapse, enabling stakeholder access to curated metrics without engineering bottleneck" | JD explicitly calls for "self-serve analytics tools" |
| 5 | Gap bridging (dbt) | Not mentioned | Add to TQL or Prime Healthcare: "Designed data transformation frameworks equivalent to dbt's layered modeling approach — reusable, version-controlled, testable SQL transformations" | Acknowledges the pattern without overclaiming the tool |

**LinkedIn top 5:**
1. Add "Analytics Engineering" and "dbt" to Skills (dbt is a learnable/testable skill signal)
2. Headline: "Data Engineer | Analytics Foundations | Azure Databricks | Python | SQL"
3. About section: Add "built analytics functions from scratch" narrative
4. Feature the Prime Healthcare case study as proof of foundation-building
5. Follow/engage Anthropic Data team members on LinkedIn pre-application

---

## F) Interview Prep

### STAR Stories

| # | JD Requirement | Story | S | T | A | R |
|---|---------------|-------|---|---|---|---|
| 1 | Build foundational data pipelines | Medallion at TQL | Multiple business units with siloed operational data | Design and implement unified data pipeline architecture | Built Medallion (staging/silver/gold) in Azure Databricks with ADF orchestration | Scalable batch + streaming platform serving analytics and reporting org-wide |
| 2 | Transform raw logs into canonical datasets | Prime Healthcare log pipeline | Legacy SSIS ETL had no canonical layer; analysts queried raw tables | Build transformation layer for clinical + financial data | Designed ELT with ADF + Databricks; created canonical clinical, operational, and financial datasets | Single source of truth for clinical reporting; reduced ad-hoc query time |
| 3 | Data integrity standards + SLAs | Prime Healthcare validation framework | No formal SLA or DQ monitoring on healthcare data pipelines | Implement quality controls on HIPAA-sensitive data | Built SQL + Python-based validation suite with alerting; defined SLA contracts with business stakeholders | Zero data integrity incidents post-implementation; HIPAA compliance maintained |
| 4 | Stakeholder → technical requirements | Cargill platform modernization | Global teams with fragmented data in Oracle, Hadoop, SQL Server | Integrate diverse sources into unified Azure platform | Led requirement-gathering sessions across global teams; translated to Azure architecture | Unified data platform; reduced integration complexity for analytics teams |
| 5 | Self-serve analytics tools | Power BI at TQL/Prime Healthcare | Analysts dependent on engineering for every data request | Build self-serve BI layer | Developed Power BI dashboards backed by Synapse/Databricks with automated refresh | Analysts self-serve 80%+ of reporting needs without engineering tickets |
| 6 | Ambiguity / early-stage building | Prime Healthcare proof-of-concept | No cloud data infrastructure; greenfield build | Build PoC pipeline demonstrating Azure feasibility | Designed and built PoC pipeline; demonstrated to leadership; scaled to production | Full production ELT system replacing legacy SQL Server/SSIS; reduced processing time + infra costs |

### Recommended Case Study
**Prime Healthcare cloud migration** — Frame it as: "I walked into a team with legacy SSIS, no cloud infrastructure, and a mandate to modernize. I built the PoC, got buy-in, and shipped production. That's exactly what building a data foundation looks like — and it's what I'd do at Anthropic."

### Red-Flag Questions
- *"Have you used dbt?"* → "I haven't used dbt in production — I've built equivalent transformation layers in ADF + Databricks. Same discipline, different tool. I can get productive in dbt within 2–3 weeks; the SQL modeling patterns are what matter and those I know cold."
- *"This is a startup environment. Our engineers wear many hats."* → "At Prime Healthcare I was the first cloud data engineer on a greenfield infrastructure build. I defined the stack, built the first pipelines, set up CI/CD in DevOps, and wrote the data quality standards — all simultaneously. Ambiguity is where I'm strongest."
- *"Your background is Azure. We use [GCP/AWS/Snowflake]."* → "I'm Azure-native but the architectural patterns — Medallion layering, streaming vs. batch tradeoffs, SLA enforcement, self-serve BI — are platform-agnostic. I've migrated from on-prem to Azure; I can adapt to any modern stack."

---

## G) Posting Legitimacy

**Assessment: High Confidence — Real, Active Opening**

| Signal | Status | Detail |
|--------|--------|--------|
| Description quality | ✅ Specific | Concrete tech stack (dbt, Airflow, Hex), specific responsibilities, realistic requirements — not generic |
| Salary transparency | ✅ Full range listed | $275K–$370K USD — specific and matches Anthropic's known comp bands |
| Company hiring signals | ✅ Active | Anthropic raised $2.5B+ rounds; known aggressive hiring in 2025-2026; no layoff signals |
| H1B sponsorship statement | ✅ Explicit | "Anthropic sponsors visas, though success varies by role and candidate. We retain an immigration lawyer to help with this." |
| Reposting detection | Unverified | Not in scan-history.tsv (first appearance today) |
| Posting freshness | Unverified (batch mode) | Cannot verify days-live without Playwright |

**Context Notes:** Anthropic is expanding rapidly. This appears to be a genuine early-hire role for their analytics data engineering function. The explicit H1B language and comp transparency are strong legitimacy signals.

---

## Score Global

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Match with CV | 3.5/5 | Strong technical foundations (Python, SQL, ETL, pipelines, Medallion, ADF/Databricks) — dbt and modern analytics stack gap pulls down |
| Career trajectory | 3.5/5 | Good brand signal (Anthropic = elite); IC role doesn't directly accelerate Director path but opens leadership doors at a top AI lab |
| Comp | 5/5 | $275K–$370K base is 1.6–2.2x above Vinay's $170K target — exceptional |
| Cultural signals | 4.5/5 | H1B explicitly confirmed, AI-forward mission, technically rigorous team |
| Red flags | -0.25 | dbt gap is real; startup-oriented framing vs enterprise background |
| **Global** | **4.0/5** | Strong buy — worth applying after dbt gap mitigation (even a small personal project using dbt on a sample dataset) |

**Recommendation: APPLY — with targeted CV customization and a quick dbt proof-of-knowledge (personal project or LinkedIn Learning cert) before submitting.**

---

## Keywords Extracted (ATS)

`Analytics Data Engineer` · `dbt` · `ETL pipelines` · `SQL` · `Python` · `Airflow` · `data modeling` · `canonical datasets` · `data integrity` · `SLA` · `self-serve analytics` · `stakeholder requirements` · `data warehouse` · `Hex` · `workflow orchestration` · `batch pipelines` · `streaming pipelines` · `analytics foundations` · `metrics reporting` · `data products`
