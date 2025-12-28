// Factor definitions with impact previews and narrative connections
const FACTORS = {
    autonomy: {
        name: "AI Autonomy",
        labelLeft: "Human-in-the-Loop",
        labelRight: "Full Autonomy",
        default: 25,
        weight: 0.18,
        impactPreviews: {
            low: "Human oversight maintained in all critical decisions, slower but safer AI deployment with robust accountability.",
            mid: "Moderate increase in independent system decision making, leading to faster optimization but requiring robust oversight.",
            high: "Fully autonomous AI systems making critical decisions independently, maximizing efficiency but with limited human control."
        },
        narrativeKeyword: "safety concerns",
        narrativeTemplates: {
            low: "Strong human oversight ensures that <highlight>safety protocols</highlight> remain paramount, with AI serving as a powerful assistant rather than autonomous decision-maker.",
            mid: "There are significant <highlight>safety concerns</highlight> as society navigates the introduction of more autonomous systems.",
            high: "Autonomous AI systems now make critical decisions with minimal <highlight>human oversight</highlight>, raising profound questions about accountability and control."
        },
        summaryIcons: {
            low: { label: "Human-In-The-Loop", icon: "human" },
            mid: { label: "Hybrid Control", icon: "hybrid" },
            high: { label: "Full Autonomy", icon: "robot" }
        }
    },
    privacy: {
        name: "Data Privacy",
        labelLeft: "Strict Protection",
        labelRight: "Open Access",
        default: 30,
        weight: 0.15,
        impactPreviews: {
            low: "High focus on individual rights and consent limits data availability, slowing some AI advancements but boosting public trust.",
            mid: "Balanced approach to data governance with sector-specific regulations enabling innovation while protecting sensitive information.",
            high: "Open data ecosystems accelerate AI development but raise significant concerns about surveillance and individual privacy."
        },
        narrativeKeyword: "strict data regulations",
        narrativeTemplates: {
            low: "Public trust is tentatively maintained through <highlight>strict data regulations</highlight>, though this has led to some stagnation in personalization features.",
            mid: "A <highlight>balanced data framework</highlight> enables innovation while protecting core privacy rights, though enforcement remains inconsistent.",
            high: "The emphasis on <highlight>open data access</highlight> has accelerated AI capabilities but eroded personal privacy protections significantly."
        },
        summaryIcons: {
            low: { label: "Strict Protection", icon: "lock" },
            mid: { label: "Balanced Privacy", icon: "shield" },
            high: { label: "Open Access", icon: "unlock" }
        }
    },
    speed: {
        name: "Technological Speed",
        labelLeft: "Slow & Steady",
        labelRight: "Rapid Innovation",
        default: 50,
        weight: 0.15,
        impactPreviews: {
            low: "Deliberate pace of development prioritizes safety testing and societal adaptation over competitive advantage.",
            mid: "Balanced pace of development allows for regulatory adaptation but risks falling behind in global competition.",
            high: "Breakneck innovation speed pushes boundaries but outpaces regulatory frameworks and societal adjustment."
        },
        narrativeKeyword: "pace of development",
        narrativeTemplates: {
            low: "The <highlight>measured pace of development</highlight> has allowed institutions to adapt, though some worry about competitive disadvantage.",
            mid: "Development proceeds at a <highlight>balanced pace</highlight>, allowing some regulatory catch-up while maintaining innovation momentum.",
            high: "The <highlight>rapid pace of innovation</highlight> has outstripped society's ability to adapt, creating significant disruption."
        },
        summaryIcons: {
            low: { label: "Slow & Steady", icon: "turtle" },
            mid: { label: "Balanced Speed", icon: "balance" },
            high: { label: "Rapid Innovation", icon: "rocket" }
        }
    },
    economy: {
        name: "Socioeconomic Impact",
        labelLeft: "Universal Basic Income",
        labelRight: "Market-Driven Adaptation",
        default: 75,
        weight: 0.18,
        impactPreviews: {
            low: "Strong social safety nets and UBI programs cushion workforce transitions, maintaining social stability but requiring significant public investment.",
            mid: "Mixed approach combining targeted support programs with market incentives for retraining and adaptation.",
            high: "Emphasis on retraining and market solutions for displaced workers, creating initial instability but potentially new job sectors."
        },
        narrativeKeyword: "workforce transition",
        narrativeTemplates: {
            low: "Universal support programs ensure the <highlight>workforce transition</highlight> occurs with minimal individual hardship, though at significant fiscal cost.",
            mid: "A combination of support programs and market mechanisms helps manage the <highlight>workforce transition</highlight>, with mixed results across sectors.",
            high: "While efficiency has improved, a widespread <highlight>workforce transition</highlight> is underway, with many industries shifting towards hybrid human-AI collaboration models."
        },
        summaryIcons: {
            low: { label: "Universal Support", icon: "safety-net" },
            mid: { label: "Mixed Approach", icon: "handshake" },
            high: { label: "Market Adaptation", icon: "chart" }
        }
    },
    environment: {
        name: "Environmental Focus",
        labelLeft: "Sustainable Development",
        labelRight: "Resource Extraction",
        default: 40,
        weight: 0.17,
        impactPreviews: {
            low: "Prioritizes green technologies and carbon neutrality, necessitating slower industrial growth and higher initial costs.",
            mid: "Balanced approach integrates environmental considerations with economic development, pursuing efficiency gains.",
            high: "Rapid resource utilization accelerates AI infrastructure but increases environmental footprint significantly."
        },
        narrativeKeyword: "sustainability",
        narrativeTemplates: {
            low: "The focus on <highlight>sustainability</highlight> is evident in the rise of green data centers, though it requires continued investment.",
            mid: "Environmental considerations are <highlight>balanced with growth</highlight>, with gradual improvements in AI's ecological footprint.",
            high: "The prioritization of rapid expansion has come at <highlight>environmental cost</highlight>, with AI infrastructure consuming unprecedented resources."
        },
        summaryIcons: {
            low: { label: "Sustainable Dev", icon: "leaf" },
            mid: { label: "Balanced Growth", icon: "seedling" },
            high: { label: "Resource Focus", icon: "factory" }
        }
    },
    cooperation: {
        name: "Global Cooperation",
        labelLeft: "Isolationism",
        labelRight: "Unified Governance",
        default: 90,
        weight: 0.17,
        impactPreviews: {
            low: "National interests dominate AI policy, leading to fragmented standards and potential AI arms races.",
            mid: "Regional cooperation emerges with some international coordination, but enforcement mechanisms remain weak.",
            high: "Strong international agreements and shared standards facilitate coordinated global AI deployment and regulation."
        },
        narrativeKeyword: "coordinated standards",
        narrativeTemplates: {
            low: "The lack of <highlight>international coordination</highlight> has led to a fragmented landscape of competing AI systems and standards.",
            mid: "Partial <highlight>international cooperation</highlight> has emerged, though enforcement of shared standards remains challenging.",
            high: "Global relations show signs of strengthening through <highlight>coordinated standards</highlight>, fostering a shared, albeit slower, approach to managing AI risks."
        },
        summaryIcons: {
            low: { label: "Isolationism", icon: "wall" },
            mid: { label: "Partial Cooperation", icon: "handshake" },
            high: { label: "Unified Governance", icon: "globe" }
        }
    }
};

// Outcome definitions
const OUTCOMES = {
    suffering: { 
        label: "SUFFERING", 
        max: 20, 
        color: "#c0392b",
        description: "Catastrophic outcomes. Widespread harm from AI."
    },
    decline: { 
        label: "DECLINE", 
        max: 40, 
        color: "#e74c3c",
        description: "Things getting worse. Concentrated power, growing inequality."
    },
    stable: { 
        label: "STABLE", 
        max: 60, 
        color: "#f39c12",
        description: "Muddling through. Mixed outcomes, uncertain trajectory."
    },
    prosperous: { 
        label: "PROSPEROUS", 
        max: 80, 
        color: "#27ae60",
        description: "Things improving. AI benefits spreading, risks managed."
    },
    flourishing: { 
        label: "FLOURISHING", 
        max: 100, 
        color: "#2ecc71",
        description: "Best outcomes. AI helps humanity thrive, power distributed."
    }
};

// Year-based narrative introductions
const YEAR_INTROS = {
    2025: "The year is 2025. The world stands at a cautious crossroads. Due to your configuration, the development of AI has seen",
    2026: "By 2026, the initial choices have begun to crystallize into trends. The AI landscape now reflects",
    2027: "The year 2027 marks a turning point. The cumulative effects of early decisions have led to",
    2028: "In 2028, the new normal has emerged. Society has largely adapted to",
    2029: "By 2029, the trajectory is clearer than ever. The world is experiencing",
    2030: "The year 2030 represents a new chapter. Looking back at the journey, humanity has achieved"
};

// Outcome-based narrative conclusions
const NARRATIVE_CONCLUSIONS = {
    suffering: "Overall, the path has led to significant hardship. The combination of factors has created a future where AI's promise has turned into widespread suffering, requiring urgent intervention to change course.",
    decline: "Overall, the trajectory is concerning. While not catastrophic, the current path leads to growing inequality and diminishing human agency, with little hope for improvement without significant change.",
    stable: "Overall, the path forward is one of careful steps, balancing innovation with societal well-being, leading to a future that is relatively stable but requires constant vigilance and adaptation.",
    prosperous: "Overall, the careful balance struck between innovation and caution has paid dividends. Humanity is on track for a future where AI genuinely serves human flourishing.",
    flourishing: "Overall, the choices made have led to an unprecedented era of human flourishing. AI has become a powerful tool for human empowerment, distributed equitably and governed wisely."
};

// Presets for quick scenarios
const PRESETS = {
    current: { autonomy: 40, privacy: 35, speed: 60, economy: 70, environment: 45, cooperation: 40 },
    cautious: { autonomy: 20, privacy: 25, speed: 30, economy: 30, environment: 25, cooperation: 80 },
    accelerate: { autonomy: 85, privacy: 80, speed: 90, economy: 85, environment: 75, cooperation: 30 },
    balanced: { autonomy: 50, privacy: 50, speed: 50, economy: 50, environment: 50, cooperation: 50 }
};
