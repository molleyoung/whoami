export const capabilities = [
  { id: "gtm-systems-orchestration", label: "GTM Systems & Orchestration", shortLabel: "Systems & Orchestration" },
  { id: "context-engineering", label: "Context Engineering", shortLabel: "Context Engineering" },
  { id: "analytics-revenue-intelligence", label: "Analytics & Revenue Intelligence", shortLabel: "Revenue Intelligence" },
  { id: "revenue-operations-governance", label: "Revenue Operations & Governance", shortLabel: "RevOps & Governance" },
  { id: "ai-enabled-operations", label: "AI-Enabled Operations", shortLabel: "AI-Enabled Operations" }
];

export const viewModes = [
  { id: "system-map", label: "System Map" },
  { id: "operator-view", label: "Operator View" },
  { id: "rep-experience", label: "Rep Experience" },
  { id: "results", label: "Results" },
  { id: "honest-read", label: "Honest Read" }
];

export const operatingModel = {
  title: "Command Line GTM",
  label: "Operating model",
  summary: "A way of building GTM operations as inspectable, repeatable systems: structured inputs, executable workflows, governed decisions, visible outputs, and durable documentation.",
  sequence: ["capture", "normalize", "orchestrate", "govern", "scale"]
};

export const stories = [
  {
    id: "quality-first-prospecting-engine",
    title: "Quality-First Prospecting Engine",
    featured: true,
    capabilities: ["gtm-systems-orchestration", "context-engineering", "analytics-revenue-intelligence", "ai-enabled-operations"],
    summary: "A recurring prospecting engine that connects eligible accounts, custom research, qualification, pickup-likelihood scoring, activation, and outcome visibility.",
    thesis: "Claude Code operates across the motion so the research, scoring, activation, documentation, and feedback loop behave as one system.",
    systems: [
      {
        name: "Claude Code",
        role: "Operating layer",
        operatingLayer: true,
        responsibilities: [
          "Pulls the eligible account population from Salesforce",
          "Builds the Floqer automation, including prompts and workflow logic",
          "Runs the Floqer automation",
          "Builds and operates the workflow from Floqer through TitanX",
          "Carries results into Salesforce, Outreach, and Orum",
          "Updates Salesforce list views",
          "Documents status in Jira",
          "Posts team updates, responses, results, and relevant links in Slack"
        ]
      },
      {
        name: "Salesforce",
        role: "Source + system of record + activation",
        group: "source",
        responsibilities: ["Source account population", "System of record", "Activation destination", "Rep list views", "Outcome tracking"]
      },
      {
        name: "Floqer",
        role: "Research + qualification",
        group: "transform",
        responsibilities: ["Custom web research", "Persona mapping", "Prospect sourcing", "Waterfall enrichment", "Context enrichment", "Validation", "Account scoring", "Prospect gating"]
      },
      {
        name: "TitanX",
        role: "Scoring layer",
        group: "transform",
        responsibilities: ["Pickup-likelihood scoring"]
      },
      {
        name: "Outreach",
        role: "Execution",
        group: "activate",
        responsibilities: ["Sequencing"]
      },
      {
        name: "Orum",
        role: "Execution",
        group: "activate",
        responsibilities: ["Dialing and call execution"]
      },
      {
        name: "Jira",
        role: "Operational visibility",
        group: "observe",
        responsibilities: ["Operational status and documentation"]
      },
      {
        name: "Slack",
        role: "Team visibility",
        group: "observe",
        responsibilities: ["Delivery of updates, responses, results, and links"]
      }
    ],
    operatorSteps: [
      { actor: "Claude Code", action: "Pull the eligible account population from Salesforce." },
      { actor: "Claude Code", action: "Build the Floqer automation, including prompts and workflow logic." },
      { actor: "Claude Code", action: "Run the Floqer automation." },
      { actor: "Floqer", action: "Perform custom web research, persona mapping, prospect sourcing, waterfall enrichment, context enrichment, validation, account scoring, and prospect gating." },
      { actor: "Claude Code", action: "Build and operate the workflow from Floqer through TitanX." },
      { actor: "TitanX", action: "Add pickup-likelihood scoring as one scoring layer inside the broader motion." },
      { actor: "Claude Code", action: "Carry the results into Salesforce and the Outreach / Orum execution motion." },
      { actor: "Claude Code", action: "Update Salesforce list views and document status in Jira." },
      { actor: "Claude Code", action: "Post the team update, responses, results, and relevant links in Slack." }
    ],
    repExperience: {
      before: ["Account and prospect context must be interpreted across disconnected inputs", "Prospect relevance and data quality require manual judgment", "Pickup likelihood is not visible in the dialing motion", "Activation and outcome context live across separate destinations"],
      after: ["Eligible accounts arrive with researched context", "Prospects are persona-mapped, enriched, validated, scored, and gated", "P1 records carry pickup-likelihood scoring into the motion", "Salesforce list views, Outreach sequencing, and Orum dialing are connected", "Updates, responses, results, and links are visible to the team in Slack"]
    },
    results: {
      measured: [
        "Approximately 12.5% cumulative dial-to-connect on scored P1 calls",
        "Connect rate trending closer to 9% as volume scaled",
        "Approximately 1,450 P1 dials",
        "182 connects",
        "93 conversations",
        "Approximately 7 SQLs or meetings",
        "Team-wide dial-to-connect remained approximately 4–5%, because most dialing was still outside the scored P1 motion"
      ],
      evidence: ["Recurring workflow connects account selection, research, qualification, scoring, activation, documentation, and team visibility", "Salesforce list views expose the rep-ready population", "Responses and outcomes feed the operating loop"],
      validating: ["Performance of the scored motion as volume continues to scale", "How the recurring engine affects the broader team motion over time"]
    },
    honestRead: [
      "Early 17–32% results were based on small samples.",
      "Performance normalized as volume scaled.",
      "TitanX is one pickup-likelihood scoring layer, not the prospecting strategy.",
      "Scoring alone did not materially change team-wide performance.",
      "The durable win is the broader recurring prospecting engine.",
      "The motion and outcome data are still evolving."
    ]
  },
  {
    id: "closed-won-review-agent",
    title: "Closed Won Review Agent",
    capabilities: ["gtm-systems-orchestration", "revenue-operations-governance", "ai-enabled-operations"],
    summary: "An unattended deal-review system that validates closed-won records, auto-approves clean deals, and sends actionable exceptions to Slack.",
    thesis: "Deterministic validation handles the rules; Claude handles address validation and human-readable fix guidance without adding work for Sales.",
    systems: [
      { name: "Salesforce", role: "Deal source + approval home", group: "source", responsibilities: ["Deal source", "Approval-status home"] },
      { name: "Python", role: "Validation engine", group: "transform", responsibilities: ["Deterministic validation rules", "Approximately 47 checks for direct deals", "Approximately 53 checks for partner deals"] },
      { name: "Claude", role: "Context layer", group: "transform", responsibilities: ["Address validation", "Human-readable fix guidance"] },
      { name: "Slack", role: "Exception delivery", group: "activate", responsibilities: ["Actionable exceptions"] },
      { name: "FoundryOps / g-gremlin", role: "Access layer", group: "source", responsibilities: ["Salesforce access"] },
      { name: "launchd", role: "Scheduler", group: "observe", responsibilities: ["Unattended scheduling", "Runs every two hours from 6am to 8pm"] }
    ],
    operatorSteps: [
      { actor: "launchd", action: "Runs the review every two hours from 6am to 8pm." },
      { actor: "FoundryOps / g-gremlin", action: "Provides Salesforce access for the review." },
      { actor: "Python", action: "Runs deterministic validation across direct or partner deal checks." },
      { actor: "Claude", action: "Validates addresses and produces human-readable fix guidance." },
      { actor: "Salesforce", action: "Stores approval status for reviewed deals." },
      { actor: "Slack", action: "Delivers actionable exceptions for correction." }
    ],
    repExperience: {
      before: ["Approval could take approximately 2.6 days", "Exceptions could reach shipping, invoicing, or provisioning"],
      after: ["Zero additional process, stages, tools, or data entry for Sales", "Clean deals can be auto-approved", "Actionable exceptions arrive with fix guidance"]
    },
    results: {
      measured: ["Mean time-to-approval decreased from approximately 2.6 days to under one day", "Same-day approval increased from 60% to approximately 90%", "241 deals auto-approved", "49 deals caught and corrected before shipping, invoicing, or provisioning", "Approximately 47 checks for direct deals", "Approximately 53 checks for partner deals", "Runs every two hours from 6am to 8pm", "Zero additional process, stages, tools, or data entry for Sales"],
      evidence: ["Salesforce remains the approval-status home", "Rules are deterministic where deterministic validation is appropriate", "Slack exceptions include human-readable guidance"],
      validating: []
    },
    honestRead: ["Claude is used for address validation and readable guidance, not as a replacement for deterministic validation.", "The system improves control without adding a new seller workflow."]
  },
  {
    id: "event-import-pipeline",
    title: "Event Import Pipeline",
    capabilities: ["gtm-systems-orchestration", "revenue-operations-governance"],
    summary: "A config-driven event-processing pipeline that cleans, reviews, routes, and activates event records while preserving every intermediate state.",
    thesis: "One event configuration drives a repeatable, auditable workflow from raw list to governed activation.",
    systems: [
      { name: "Event config", role: "Run definition", group: "source", responsibilities: ["Config-driven workflow"] },
      { name: "Pipeline", role: "Processing layer", group: "transform", responsibilities: ["Clean", "Dedupe", "Salesforce match", "Exclusion check", "Create", "Route"] },
      { name: "Operator review", role: "Control point", group: "transform", responsibilities: ["Review before creation and activation"] },
      { name: "Salesforce", role: "System of record", group: "activate", responsibilities: ["Record creation", "Routing", "Campaign membership"] },
      { name: "Outreach", role: "Activation", group: "activate", responsibilities: ["Sequence enrollment"] },
      { name: "Run files", role: "Audit trail", group: "observe", responsibilities: ["Preserved intermediate files", "Dry-run", "Resume", "Individual-step execution"] }
    ],
    operatorSteps: [
      { actor: "Pipeline", action: "Load the event configuration and raw list." },
      { actor: "Pipeline", action: "Clean and dedupe the records." },
      { actor: "Pipeline", action: "Match against Salesforce and run exclusion checks." },
      { actor: "Operator", action: "Review the prepared population before changes are made." },
      { actor: "Pipeline", action: "Create and route approved records." },
      { actor: "Salesforce", action: "Add campaign membership." },
      { actor: "Outreach", action: "Enroll eligible records in the approved sequence." },
      { actor: "Pipeline", action: "Preserve intermediate files for auditability; support dry-run, resume, and individual-step execution." }
    ],
    repExperience: {
      before: ["Event lists vary from a handful of records to hundreds of badge scans", "Existing relationships and active motions must be identified before activation"],
      after: ["Cleaned and reviewed records are routed into Salesforce", "Eligible records receive campaign membership and Outreach enrollment", "Existing customers, open opportunities, existing SQLs, and contacts already in active sequences are held back"]
    },
    results: {
      measured: ["More than 10 events processed", "Event sizes from approximately 5 records to more than 600 badge scans"],
      evidence: ["Config-driven workflow", "Every run preserves intermediate files for auditability", "Supports dry-run, resume, and individual-step execution", "Existing customers, open opportunities, existing SQLs, and contacts already in active sequences are held back"],
      validating: []
    },
    honestRead: ["The proof is operational throughput and control—not an inferred pipeline or conversion claim.", "Confidential IDs, thresholds, company lists, and raw examples are intentionally excluded."]
  },
  {
    id: "sales-knowledge-agent",
    title: "Sales Knowledge Agent",
    capabilities: ["context-engineering", "ai-enabled-operations", "revenue-operations-governance"],
    summary: "A custom Rovo agent that gives AEs and SDRs curated, sourced sales and product answers with governed connectors and access.",
    thesis: "Trusted answers require curated sources, naming controls, regional rules, and connector governance—not just a chat interface.",
    systems: [
      { name: "Rovo", role: "Agent experience", group: "activate", responsibilities: ["Custom agent for AEs and SDRs", "Curated and sourced answers"] },
      { name: "Confluence", role: "Primary trusted source", group: "source", responsibilities: ["Sales and product knowledge"] },
      { name: "Google Drive", role: "Phased source", group: "source", responsibilities: ["Connected in phases"] },
      { name: "GitHub", role: "Phased source", group: "source", responsibilities: ["Connected in phases"] },
      { name: "RevOps + IT", role: "Governance", group: "observe", responsibilities: ["Review before new connectors are enabled", "Naming, access, language, and regional controls"] }
    ],
    operatorSteps: [
      { actor: "RevOps + IT", action: "Review source, access, naming, language, and regional requirements." },
      { actor: "Confluence", action: "Serve as the primary trusted source for curated answers." },
      { actor: "Rovo", action: "Return sourced sales and product answers to early AE and SDR users." },
      { actor: "RevOps + IT", action: "Review additional Google Drive and GitHub connectors before enabling them in phases." },
      { actor: "Rollout", action: "Use early-user rollout before a full-team launch." }
    ],
    repExperience: {
      before: ["Sales and product answers must be found across source systems", "Internal and customer-facing language can require different treatment"],
      after: ["AEs and SDRs can request curated, sourced answers", "Naming, access, language, and regional controls are applied", "The primary trusted source remains explicit"]
    },
    results: {
      measured: [],
      evidence: ["Custom Rovo agent for AEs and SDRs", "Confluence established as the primary trusted source", "Google Drive and GitHub connected in phases", "Early-user rollout before full-team launch"],
      validating: ["MVP adoption and answer quality during early-user rollout", "Connector expansion after RevOps and IT review"]
    },
    honestRead: ["This is an MVP rollout; no adoption or productivity metrics are claimed.", "Source quality, access, and naming controls are part of the product—not administrative afterthoughts."]
  },
  {
    id: "gtm-insights-revenue-intelligence",
    title: "GTM Insights and Revenue Intelligence",
    capabilities: ["analytics-revenue-intelligence", "context-engineering", "ai-enabled-operations"],
    summary: "A biweekly analysis workflow that turns activity, pipeline, and SaaS reporting into sourced statistical analysis and readable operating narratives.",
    thesis: "Revenue intelligence becomes useful when reporting, analysis, narrative, and publication run as one repeatable operating cadence.",
    systems: [
      { name: "Tableau", role: "Reporting layer", group: "source", responsibilities: ["47 views", "Three workbooks", "Activity, Pipeline, and SaaS reporting"] },
      { name: "Statistical analysis", role: "Analysis layer", group: "transform", responsibilities: ["Biweekly automated pipeline analysis"] },
      { name: "Claude", role: "Narrative layer", group: "transform", responsibilities: ["Transforms statistical analysis into narratives"] },
      { name: "Confluence", role: "Published record", group: "activate", responsibilities: ["Narrative publication"] },
      { name: "Slack", role: "Distribution", group: "activate", responsibilities: ["Team publication"] }
    ],
    operatorSteps: [
      { actor: "Tableau", action: "Provide Activity, Pipeline, and SaaS reporting across 47 views in three workbooks." },
      { actor: "Analysis workflow", action: "Run the biweekly automated pipeline analysis." },
      { actor: "Claude", action: "Transform the statistical analysis into an operating narrative." },
      { actor: "Confluence + Slack", action: "Publish the narrative into the team’s operating channels." }
    ],
    repExperience: {
      before: ["Operating signals live across many reporting views", "Statistical output still requires interpretation"],
      after: ["Analysis is synthesized into a readable narrative", "The narrative is published into Confluence and Slack on a repeatable cadence"]
    },
    results: {
      measured: ["47 views across three Tableau workbooks", "Two completed runs in the current documented proof"],
      evidence: ["Biweekly automated pipeline analysis", "Activity, Pipeline, and SaaS reporting", "Statistical analysis transformed into Claude-generated narratives", "Publication into Confluence and Slack"],
      validating: ["The cadence is active; evidence will expand with additional completed runs"]
    },
    honestRead: ["The current documented proof contains two completed runs.", "The system demonstrates a working analysis-to-narrative cadence; broader impact is not inferred."]
  },
  {
    id: "signal-based-outbound-engine",
    title: "Signal-Based Outbound Engine",
    capabilities: ["gtm-systems-orchestration", "analytics-revenue-intelligence", "ai-enabled-operations"],
    summary: "An active build for normalizing disparate signals into transparent, trigger-based outbound plays and measurable rep prioritization.",
    thesis: "Signals should retain strength, recency, decay, and source context instead of collapsing into one opaque account score.",
    systems: [
      { name: "Signal sources", role: "Inputs", group: "source", responsibilities: ["Disparate signal sources"] },
      { name: "Signal history", role: "Context layer", group: "transform", responsibilities: ["Account-level history", "Strength", "Recency", "Decay", "Layered signals"] },
      { name: "Play engine", role: "Orchestration", group: "transform", responsibilities: ["Trigger-based plays", "Rep prioritization"] },
      { name: "Visibility", role: "Operating output", group: "activate", responsibilities: ["Manager visibility", "Leadership visibility"] },
      { name: "Measurement", role: "Learning loop", group: "observe", responsibilities: ["Signal", "Segment", "Play", "Motion-level measurement"] }
    ],
    operatorSteps: [
      { actor: "Normalization", action: "Bring disparate signal sources into a consistent operating model." },
      { actor: "Context layer", action: "Maintain account-level history and preserve signal strength, recency, and decay." },
      { actor: "Play engine", action: "Layer signals and trigger the relevant outbound play." },
      { actor: "Rep experience", action: "Prioritize work while preserving the reason behind the signal." },
      { actor: "Measurement", action: "Evaluate performance at the signal, segment, play, and motion levels." }
    ],
    repExperience: {
      before: ["Signals arrive from disparate sources", "One opaque score can hide why an account is prioritized"],
      after: ["Designed experience: layered signals preserve strength, recency, decay, and source context", "Designed experience: trigger-based plays guide rep prioritization", "Designed experience: managers and leaders can inspect the motion"]
    },
    results: {
      measured: [],
      evidence: ["Active build includes normalization, account-level history, layered signals, trigger-based plays, rep prioritization, visibility, and measurement design"],
      validating: ["All performance improvements", "Signal-, segment-, play-, and motion-level outcomes"]
    },
    honestRead: ["This is an active build. The experience is designed, but improvement claims are not presented as measured outcomes.", "The architecture avoids treating one opaque account score as the whole decision."]
  },
  {
    id: "gtm-context-layer",
    title: "GTM Context Layer",
    capabilities: ["context-engineering", "revenue-operations-governance", "ai-enabled-operations"],
    summary: "A three-part context architecture that makes GTM data, business definitions, and AI runtime behavior inspectable and governable.",
    thesis: "Reliable AI work requires a shared understanding of the data, the business rules, and the runtime instructions used to interpret requests.",
    systems: [
      { name: "Data catalog", role: "What exists", group: "source", responsibilities: ["What data exists", "What fields mean", "Which data is unreliable"] },
      { name: "Business knowledge resource", role: "What the business means", group: "transform", responsibilities: ["Rules of engagement", "Lifecycle", "Ownership", "Metrics", "GTM definitions"] },
      { name: "Runtime context layer", role: "How AI should operate", group: "activate", responsibilities: ["Which definitions to use", "How to map fuzzy requests", "What traps to avoid", "What to refuse"] }
    ],
    operatorSteps: [
      { actor: "Data catalog", action: "Document available data, field meaning, and unreliable inputs." },
      { actor: "Business knowledge resource", action: "Define rules of engagement, lifecycle, ownership, metrics, and GTM language." },
      { actor: "Runtime context layer", action: "Tell AI which definitions to use, how to map fuzzy requests, what traps to avoid, and what to refuse." }
    ],
    repExperience: {
      before: ["Definitions and data reliability must be rediscovered for each request", "Fuzzy questions can map to inconsistent fields or business logic"],
      after: ["Designed experience: shared definitions and known data limitations are available", "Designed experience: runtime instructions guide interpretation and refusal behavior"]
    },
    results: {
      measured: [],
      evidence: ["Three-part architecture defined: data catalog, business knowledge resource, and runtime context layer"],
      validating: ["Architecture is being designed and built; operational outcomes are not yet claimed"]
    },
    honestRead: ["This is designing and building, not a completed context platform.", "The architecture makes unreliable data and refusal behavior explicit instead of hiding uncertainty."]
  },
  {
    id: "revenue-lifecycle-redesign",
    title: "Revenue Lifecycle Redesign",
    capabilities: ["revenue-operations-governance", "gtm-systems-orchestration", "analytics-revenue-intelligence"],
    summary: "A public-safe design for aligning buyer lifecycle, sales engagement, qualification, opportunity governance, automation, and funnel measurement.",
    thesis: "Lifecycle design must connect entry and exit criteria to automation and reporting so leakage can be inspected.",
    systems: [
      { name: "Buyer lifecycle", role: "Lifecycle", group: "source", responsibilities: ["Buyer lifecycle", "Source and signal"] },
      { name: "Sales engagement", role: "Engagement", group: "transform", responsibilities: ["Sales engagement", "Qualification"] },
      { name: "Opportunity lifecycle", role: "Governance", group: "transform", responsibilities: ["Opportunity lifecycle", "Entry and exit criteria"] },
      { name: "Automation", role: "Orchestration", group: "activate", responsibilities: ["Automation"] },
      { name: "Funnel reporting", role: "Measurement", group: "observe", responsibilities: ["Funnel reporting", "Leakage"] }
    ],
    operatorSteps: [],
    repExperience: {
      before: ["Current-state experience is not published in this public-safe case"],
      after: ["Designed structure connects buyer lifecycle, sales engagement, source and signal, qualification, opportunity lifecycle, entry and exit criteria, automation, and funnel reporting"]
    },
    results: {
      measured: [],
      evidence: ["Public-safe lifecycle structure is defined"],
      validating: ["Implementation status and measured outcomes are not claimed"]
    },
    honestRead: ["This case is in design.", "No implementation status or measured outcome is implied."]
  }
];

export const proofPoints = [
  {
    id: "speed-to-lead",
    title: "Speed-to-Lead",
    metric: "6x improvement",
    context: "Contact processing, routing automation, SLAs, alerts, and rep visibility."
  },
  {
    id: "quote-approval-workflow",
    title: "Quote Approval Workflow",
    metric: "50% faster quote approvals",
    context: "Pricing, product structure, approval workflows, CRM configuration, and templates."
  },
  {
    id: "ai-enhanced-meddpicc",
    title: "AI-Enhanced MEDDPICC",
    metric: "70% less rep data entry",
    context: "MEDDPICC data derived from call, meeting, and email intelligence."
  }
];

export const aiTooling = [
  {
    id: "codex",
    name: "Codex",
    featured: true,
    description: "Used to inspect the existing repository, plan the architecture, implement and test the Proof Console, and maintain the version-controlled site.",
    exampleLabel: "Inspect this implementation",
    exampleUrl: "./"
  },
  { id: "chatgpt", name: "ChatGPT", description: "Working partner for exploration, synthesis, iteration, and structured problem solving." },
  { id: "claude", name: "Claude", description: "Working partner for analysis, narrative generation, validation support, drafting, and refinement." },
  { id: "claude-code", name: "Claude Code", description: "Operating layer for building and running connected workflows across systems, data, activation, documentation, and visibility." }
];

export const siteBuild = {
  entries: [
    { hash: "concept", label: "Concept, architecture, and content", value: "Molly Young" },
    { hash: "build", label: "Implementation", value: "Codex" },
    { hash: "partners", label: "Working partners", value: "ChatGPT, Claude, and Claude Code" },
    { hash: "foundation", label: "Foundation", value: "GitHub Pages · HTML · CSS · JavaScript · structured story data · Git · GitHub" }
  ]
};
