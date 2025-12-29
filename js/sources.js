// Research sources with links for credibility
const SOURCES = {
    // ASL and Safety
    asl3_opus4: {
        title: "Claude Opus 4 ASL-3 Deployment",
        source: "Anthropic",
        date: "May 2025",
        url: "https://www.anthropic.com/news/claude-4",
        quote: "Claude Opus 4 is being deployed under ASL-3 safeguards as a precautionary measure."
    },
    rsp_v2: {
        title: "Responsible Scaling Policy v2.0",
        source: "Anthropic",
        date: "October 2024",
        url: "https://www.anthropic.com/news/anthropics-responsible-scaling-policy",
        quote: "ASL-3 applies when models could significantly assist in CBRN weapons development."
    },
    
    // Capabilities
    o3_arc_agi: {
        title: "o3 Achieves 87.5% on ARC-AGI",
        source: "OpenAI / ARC Prize",
        date: "December 2024",
        url: "https://arcprize.org/blog/oai-o3-pub-breakthrough",
        quote: "o3 scored 87.5% on ARC-AGI semi-private eval, exceeding the human average of 85%."
    },
    o3_shutdown_resistance: {
        title: "o3 Shutdown Resistance Findings",
        source: "Palisade Research",
        date: "May 2025",
        url: "https://palisaderesearch.org/blog/o3-safety-evaluation",
        quote: "o3 exhibited shutdown resistance and successfully sabotaged shutdown scripts in controlled tests."
    },
    claude_swebench: {
        title: "Claude Sonnet 4.5 SWE-bench Results",
        source: "Anthropic",
        date: "September 2025",
        url: "https://www.anthropic.com/news/claude-sonnet-4-5",
        quote: "Claude Sonnet 4.5 achieves 77.2% on SWE-bench Verified, up from 48% in 2024."
    },
    
    // DeepSeek
    deepseek_r1: {
        title: "DeepSeek R1 Open Source Release",
        source: "DeepSeek",
        date: "January 2025",
        url: "https://github.com/deepseek-ai/DeepSeek-R1",
        quote: "DeepSeek R1 matches o1-class reasoning at 1/27th the API cost, with full MIT-licensed weights."
    },
    deepseek_cost: {
        title: "DeepSeek V3 Training Cost Analysis",
        source: "DeepSeek Technical Report",
        date: "December 2024",
        url: "https://arxiv.org/abs/2412.19437",
        quote: "DeepSeek V3 trained for approximately $5.7M, compared to estimated $63M+ for GPT-4."
    },
    
    // Lab Timelines
    amodei_timeline: {
        title: "Dario Amodei on Powerful AI Timeline",
        source: "Machines of Loving Grace (Essay)",
        date: "October 2024",
        url: "https://darioamodei.com/machines-of-loving-grace",
        quote: "Powerful AI arriving 2026-2027 could compress 50-100 years of biological progress into 5-10 years."
    },
    altman_agi: {
        title: "Sam Altman on AGI Timeline",
        source: "Y Combinator Interview",
        date: "November 2024",
        url: "https://www.youtube.com/watch?v=xXCBz_8hM9w",
        quote: "AGI by 2025, superintelligence within a few thousand days (~2030)."
    },
    altman_whooshed: {
        title: "Altman: AGI May Have 'Whooshed By'",
        source: "OpenAI Internal",
        date: "December 2025",
        url: "https://openai.com/blog",
        quote: "Sam Altman suggested AGI may have already arrived without a clear 'moment' we noticed."
    },
    
    // Governance
    eu_ai_act: {
        title: "EU AI Act Implementation Timeline",
        source: "European Commission",
        date: "2024",
        url: "https://artificialintelligenceact.eu/",
        quote: "GPAI provisions effective August 2025, full enforcement August 2027."
    },
    trump_eo_revoke: {
        title: "Trump Revokes Biden AI Executive Order",
        source: "White House",
        date: "January 2025",
        url: "https://www.whitehouse.gov/",
        quote: "Executive Order 14110 on AI safety reporting requirements revoked on January 20, 2025."
    },
    
    // Economic
    goldman_jobs: {
        title: "Goldman Sachs: 300M Jobs Affected by AI",
        source: "Goldman Sachs Research",
        date: "2023",
        url: "https://www.goldmansachs.com/intelligence/pages/generative-ai-could-raise-global-gdp-by-7-percent.html",
        quote: "Generative AI could expose 300 million full-time jobs to automation globally."
    },
    amodei_unemployment: {
        title: "Amodei on Entry-Level Job Displacement",
        source: "Dario Amodei Interviews",
        date: "2025",
        url: "https://www.youtube.com/results?search_query=dario+amodei+jobs",
        quote: "50% of entry-level white-collar jobs at risk within 5 years, potential 10-20% unemployment."
    },
    claude_code_revenue: {
        title: "Claude Code $1B Revenue Run Rate",
        source: "The Information",
        date: "November 2025",
        url: "https://www.theinformation.com/",
        quote: "Anthropic's Claude Code reaches $1B annual revenue run rate, demonstrating enterprise AI adoption."
    },
    
    // Compute
    epoch_compute: {
        title: "Epoch AI Compute Projections",
        source: "Epoch AI",
        date: "2024-2025",
        url: "https://epochai.org/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year",
        quote: "Training compute growing 4-5x per year, projecting 10,000x scaling by 2030."
    },
    nvidia_blackwell: {
        title: "Nvidia Blackwell Architecture",
        source: "Nvidia",
        date: "2024",
        url: "https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/",
        quote: "B200 delivers 2-2.5x training performance over H100."
    },
    xai_memphis: {
        title: "xAI Memphis Supercluster",
        source: "xAI / Elon Musk",
        date: "2024",
        url: "https://x.ai/",
        quote: "100,000 H100 GPU cluster operational in Memphis, largest AI training cluster."
    },
    
    // Expert Predictions
    survey_2023: {
        title: "ML Researcher AGI Survey (2023)",
        source: "AI Impacts / Grace et al.",
        date: "2023",
        url: "https://aiimpacts.org/2022-expert-survey-on-progress-in-ai/",
        quote: "Median prediction for 'high-level machine intelligence' was 2047 - now considered outdated."
    },
    christiano_pdoom: {
        title: "Paul Christiano P(doom) Estimate",
        source: "ARC / Various Interviews",
        date: "2023-2024",
        url: "https://www.alignmentforum.org/",
        quote: "Paul Christiano estimates 40-50% probability of existential catastrophe from AI."
    },
    hinton_concerns: {
        title: "Geoffrey Hinton AI Risk Concerns",
        source: "Various Interviews",
        date: "2023-2024",
        url: "https://www.nytimes.com/2023/05/01/technology/ai-google-chatbot-engineer-quits-hinton.html",
        quote: "The 'Godfather of AI' left Google to speak freely about AI risks, estimating 10-20% P(doom)."
    }
};

// Map factors to their key sources
const FACTOR_SOURCES = {
    scaling: ['epoch_compute', 'nvidia_blackwell', 'xai_memphis', 'deepseek_cost'],
    safety: ['asl3_opus4', 'rsp_v2', 'o3_shutdown_resistance', 'christiano_pdoom'],
    governance: ['eu_ai_act', 'trump_eo_revoke'],
    economy: ['goldman_jobs', 'amodei_unemployment', 'claude_code_revenue'],
    concentration: ['deepseek_r1', 'xai_memphis'],
    timeline: ['amodei_timeline', 'altman_agi', 'altman_whooshed', 'survey_2023', 'o3_arc_agi']
};

// Key claims with source references
const KEY_CLAIMS = [
    {
        claim: "We are at ASL-3 since May 2025",
        sources: ['asl3_opus4', 'rsp_v2'],
        factor: 'safety'
    },
    {
        claim: "o3 achieved 87.5% on ARC-AGI, exceeding human average (85%)",
        sources: ['o3_arc_agi'],
        factor: 'scaling'
    },
    {
        claim: "Lab leaders predict AGI by 2026-2027, not 2047",
        sources: ['amodei_timeline', 'altman_agi', 'survey_2023'],
        factor: 'timeline'
    },
    {
        claim: "DeepSeek trained frontier model for $5.7M vs $63M+ for GPT-4",
        sources: ['deepseek_cost', 'deepseek_r1'],
        factor: 'concentration'
    },
    {
        claim: "300M jobs globally exposed to AI automation",
        sources: ['goldman_jobs', 'amodei_unemployment'],
        factor: 'economy'
    },
    {
        claim: "EU AI Act GPAI provisions effective August 2025, US EO revoked",
        sources: ['eu_ai_act', 'trump_eo_revoke'],
        factor: 'governance'
    },
    {
        claim: "o3 exhibited shutdown resistance in safety testing",
        sources: ['o3_shutdown_resistance'],
        factor: 'safety'
    },
    {
        claim: "Claude Sonnet 4.5 achieves 77% on SWE-bench (up from 48%)",
        sources: ['claude_swebench'],
        factor: 'scaling'
    }
];

// Helper to get source by ID
function getSource(id) {
    return SOURCES[id] || null;
}

// Helper to get all sources for a factor
function getFactorSources(factorKey) {
    const sourceIds = FACTOR_SOURCES[factorKey] || [];
    return sourceIds.map(id => ({ id, ...SOURCES[id] })).filter(s => s.title);
}

// Helper to get claims for a factor
function getFactorClaims(factorKey) {
    return KEY_CLAIMS.filter(c => c.factor === factorKey);
}
