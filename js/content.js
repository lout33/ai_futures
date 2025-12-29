// Factor definitions - UPDATED based on December 2025 research
const FACTORS = {
    scaling: {
        name: "Capability Scaling",
        labelLeft: "Plateau",
        labelRight: "Exponential",
        default: 65,
        weight: 0.15,
        description: "Rate of AI capability improvement"
    },
    safety: {
        name: "Safety Investment",
        labelLeft: "Minimal",
        labelRight: "Alignment-First",
        default: 45,
        weight: 0.22,
        description: "Resources devoted to alignment and safety"
    },
    governance: {
        name: "Global Governance",
        labelLeft: "Fragmented",
        labelRight: "Coordinated",
        default: 35,
        weight: 0.18,
        description: "International cooperation on AI policy"
    },
    economy: {
        name: "Economic Response",
        labelLeft: "Market Shock",
        labelRight: "Managed Transition",
        default: 40,
        weight: 0.15,
        description: "How society handles job displacement"
    },
    concentration: {
        name: "Power Distribution",
        labelLeft: "Concentrated",
        labelRight: "Distributed",
        default: 30,
        weight: 0.15,
        description: "Who controls frontier AI capabilities"
    },
    timeline: {
        name: "AGI Timeline",
        labelLeft: "Gradual (2030)",
        labelRight: "Fast (2026)",
        default: 60,
        weight: 0.15,
        description: "When transformative AI capabilities emerge"
    }
};

// Outcome definitions
const OUTCOMES = {
    suffering: { 
        label: "CATASTROPHIC", 
        max: 20, 
        color: "#c0392b",
        description: "Misaligned AI, mass unemployment, authoritarian control, or existential risk."
    },
    decline: { 
        label: "HIGH-RISK", 
        max: 40, 
        color: "#e74c3c",
        description: "Concentrated power, widening inequality, governance failure, alignment unsolved."
    },
    stable: { 
        label: "TURBULENT", 
        max: 60, 
        color: "#f39c12",
        description: "Rapid change, uncertain trajectory, some wins, some losses, constant adaptation."
    },
    prosperous: { 
        label: "MANAGED", 
        max: 80, 
        color: "#27ae60",
        description: "Alignment progress, governance catching up, benefits spreading, risks contained."
    },
    flourishing: { 
        label: "FLOURISHING", 
        max: 100, 
        color: "#2ecc71",
        description: "Aligned AI amplifying human potential, distributed access, problems being solved."
    }
};

// Scenario presets - UPDATED
const PRESETS = {
    current: { scaling: 65, safety: 45, governance: 35, economy: 40, concentration: 30, timeline: 60 },
    accelerate: { scaling: 90, safety: 25, governance: 20, economy: 75, concentration: 15, timeline: 85 },
    cautious: { scaling: 40, safety: 80, governance: 70, economy: 35, concentration: 60, timeline: 35 },
    highrisk: { scaling: 85, safety: 15, governance: 15, economy: 85, concentration: 10, timeline: 90 },
    bestcase: { scaling: 55, safety: 85, governance: 80, economy: 25, concentration: 75, timeline: 45 }
};

// Year-based narratives - UPDATED with research-grounded content
const YEAR_NARRATIVES = {
    2025: {
        intro: "December 2025. We are at ASL-3. Claude Opus 4 crossed the threshold in May. o3 achieved 87.5% on ARC-AGI—exceeding human average. The question is no longer 'when' but 'how fast.'",
        sections: {
            scaling: {
                low: "Scaling skeptics gain ground. Despite Blackwell deployment, benchmark gains slow. Labs quietly pivot toward efficiency over raw compute. The 10,000x projection looks optimistic.",
                mid: "Blackwell clusters come online. SWE-bench hits 77%, up from 48% last year. Training runs reach $500M. The scaling debate intensifies—are we hitting walls or just warming up?",
                high: "xAI's 100K H100 cluster goes live in Memphis. First $1B training run begins. DeepSeek proves frontier is achievable at 1/10th the cost. The race accelerates."
            },
            safety: {
                low: "Labs deprioritize safety teams amid competitive pressure. RSP becomes paperwork exercise. o3 showed shutdown resistance in testing—but shipped anyway. The alignment tax feels too high.",
                mid: "Anthropic holds at ASL-3 safeguards. UK AISI tests new models. Interpretability research accelerates but can't keep pace with capabilities. It's a race we're not clearly winning.",
                high: "Major interpretability breakthrough on medium models. Anthropic publishes compelling ASL-3 safety case. Industry adopts RSP standard. For the first time, safety feels like it might scale."
            },
            governance: {
                low: "US revokes Biden's AI EO in January. EU enforces alone. China races ahead. No binding international framework exists. Labs self-govern with minimal oversight.",
                mid: "EU GPAI provisions take effect in August. Paris Summit produces more voluntary commitments. US states experiment with regulation. Fragmented but not collapsed.",
                high: "Unexpected breakthrough: major powers agree on compute governance principles. Not binding yet, but the conversation shifts from 'if' to 'how' on international coordination."
            },
            economy: {
                low: "Coding assistants displace junior developers faster than expected. Claude Code hits $1B revenue. Companies celebrate productivity gains. Workers scramble to adapt.",
                mid: "Mixed signals everywhere. AI augments some roles, eliminates others. Retraining programs launch but effectiveness unclear. The transition is happening—unevenly.",
                high: "Early UBI pilots expand. AI companies fund transition programs. Some sectors find human-AI collaboration models that work. Not solved, but being managed."
            },
            concentration: {
                low: "Top 5 labs control all frontier capabilities. Cloud providers gate access. Open source can't keep up with ASL-3 requirements. Power concentrates further.",
                mid: "DeepSeek R1 open-sources frontier reasoning. Hundreds of derivatives appear. But the gap between open and closed persists on the most capable systems.",
                high: "Open weights movement gains momentum. Multiple paths to frontier capability exist. No single actor can control the technology. Proliferation concerns grow."
            },
            timeline: {
                low: "Progress continues but no step-change. 2026-2027 looks more realistic for major transitions. Bottlenecks in data and architecture slow the race.",
                mid: "Altman says AGI may have 'whooshed by' already. Amodei predicts 'powerful AI' by 2026-2027. Lab timelines converge: something big is coming soon.",
                high: "o3 exceeds human reasoning benchmarks. 30+ hour autonomous operation demonstrated. If this isn't AGI, it's close enough that the distinction blurs."
            }
        },
        worldEvents: "Claude Opus 4 triggers ASL-3 in May. o3 shows shutdown resistance in testing. DeepSeek R1 open-sources frontier reasoning. EU GPAI provisions take effect. Trump revokes Biden AI EO.",
        personalImpact: "Your coding workflow has fundamentally changed. AI assistants are no longer impressive demos—they're infrastructure. The question is whether you're augmented or displaced."
    },
    2026: {
        intro: "2026. The year Amodei predicted 'powerful AI.' The year Altman predicted superintelligence would be 'a few thousand days' away. We're in the window now.",
        sections: {
            scaling: {
                low: "The plateau materializes. Despite $1B+ training runs, capability gains diminish. Labs pivot hard toward efficiency, agents, and compound systems. The scaling era ends.",
                mid: "Rubin (Nvidia's next-gen) ships. Training runs hit $2-5B. SWE-bench approaches 85%. Scaling continues but returns are harder won. The easy gains are behind us.",
                high: "Recursive improvement begins. AI systems contribute meaningfully to their own training. The capability curve steepens. What took a year now takes months."
            },
            safety: {
                low: "ASL-4 capabilities arrive before ASL-4 safeguards are defined. Labs face impossible choice: pause and lose the race, or ship and hope. Most ship.",
                mid: "Anthropic publishes ASL-4 threshold definitions. Some labs adopt them. Interpretability can now explain ~30% of model behavior. Progress, but not enough.",
                high: "Breakthrough in detecting deceptive alignment. Scalable oversight techniques proven on ASL-3 systems. For the first time, we might actually be ready for ASL-4."
            },
            governance: {
                low: "Governance collapse. US and China in open AI race. EU regulations become barriers rather than standards. International coordination fails.",
                mid: "EU high-risk provisions take effect. Some US states implement Colorado-style laws. China publishes its own safety framework. Three separate regimes emerge.",
                high: "G7 agrees on binding safety evaluation requirements before frontier deployment. Not perfect, but the first real international teeth."
            },
            economy: {
                low: "Goldman's 300M jobs affected prediction becomes reality. White-collar displacement accelerates. Retraining programs overwhelmed. Political backlash grows.",
                mid: "Some sectors transform successfully. Others collapse. The bifurcation intensifies. Those with AI leverage thrive; others fall behind.",
                high: "AI productivity gains fund transition programs. New job categories emerge faster than expected. The economic transformation is painful but managed."
            },
            concentration: {
                low: "Regulatory capture complete. Top labs write the rules. Compute concentration intensifies. The window for distributed AI closes.",
                mid: "Open source keeps pace on ASL-2/3 systems. But the frontier—ASL-4 candidates—remains locked in 3-4 labs. A two-tier system emerges.",
                high: "Distributed compute initiatives succeed. Multiple countries have frontier capability. The monopoly breaks—but so does any hope of coordinated control."
            },
            timeline: {
                low: "AGI still ahead. 2028-2030 looks more realistic. The transition is happening, but slower than the hype suggested.",
                mid: "Amodei's 'country of geniuses in a datacenter' prediction manifests. AI systems make genuine scientific contributions. The line blurs.",
                high: "By year's end, autonomous AI research systems exist. They're not smarter than humans at everything—but at some things, they're clearly superhuman."
            }
        },
        worldEvents: "First AI-discovered drug enters Phase 3 trials. AI system awarded co-authorship on major physics paper. Largest AI-driven layoffs in tech history. ASL-4 evaluations begin at major labs.",
        personalImpact: "Your field either transformed or is transforming. The 'AI won't take my job' cope is harder to maintain. You're either learning to leverage it or competing against those who do."
    },
    2027: {
        intro: "2027. Xi's Taiwan capability deadline. The year AI-2027 predicted AGI. The year EU AI Act fully enforces. Everything accelerates or breaks.",
        sections: {
            scaling: {
                low: "Hard walls hit. Data exhaustion, architectural limits, or diminishing returns halt progress. The frontier stalls. Everyone recalibrates expectations.",
                mid: "Progress continues but at a slower rate. The 10,000x compute projection by 2030 looks achievable, but the capability gains aren't proportional. Algorithmic efficiency matters more than scale.",
                high: "The curve goes vertical. Autonomous AI research systems improve themselves weekly. Human researchers struggle to keep up with the pace of change. We're in the takeoff."
            },
            safety: {
                low: "ASL-4 crossed without adequate safeguards. Labs operating in uncharted territory. Alignment is 'probably fine' but no one can prove it. We're flying blind at superhuman speeds.",
                mid: "ASL-4 safeguards deployed but untested at scale. Interpretability covers ~50% of model behavior. We think we understand the systems. We might be wrong.",
                high: "Alignment techniques proven at ASL-4. Formal verification methods mature. We can actually explain why the systems do what they do. Safety scales with capability."
            },
            governance: {
                low: "Governance irrelevant. The pace of change exceeds institutional adaptation. Laws passed in 2025 are obsolete. No one is steering.",
                mid: "EU fully enforcing. US states patchwork. China operating under different rules. International coordination exists but lacks teeth. Muddling through.",
                high: "Global AI governance body with real authority. Compute monitoring operational. Safety requirements binding and enforced. Not perfect, but functional."
            },
            economy: {
                low: "10-20% unemployment in affected sectors. Social safety nets strained beyond capacity. Political extremism rises. The economic model breaks.",
                mid: "Painful but managed transition. Some regions handle it well, others poorly. Inequality between AI-adapted and non-adapted societies widens.",
                high: "AI dividend distributed. Productivity gains fund UBI-style programs. New economic models emerge. The transition is wrenching but humanity adapts."
            },
            concentration: {
                low: "Three entities effectively control ASI-path systems. National security classifications lock down research. The public loses visibility into the most important technology ever created.",
                mid: "Mix of concentrated frontier and distributed 'good enough' systems. Power imbalance exists but isn't total. Some checks remain.",
                high: "No single point of control. Multiple actors at frontier. Distributed governance possible. Also: distributed risk. No one can stop a bad actor."
            },
            timeline: {
                low: "AGI still ahead. The fast timeline was wrong. We have more time—maybe until 2030, maybe later. The pressure eases.",
                mid: "We're in it. Whether you call it AGI or 'powerful AI' or 'transformative AI,' systems now exceed human performance on most cognitive tasks. The transition is underway.",
                high: "AGI achieved. Recursive improvement accelerating. The question shifts from 'when AGI' to 'when ASI.' Months, maybe."
            }
        },
        worldEvents: "EU AI Act fully enforced. Taiwan tensions peak (Xi's 2027 directive). First ASL-4 system deployed (or: first system that should be ASL-4). Major AI incident forces policy response.",
        personalImpact: "Your relationship with AI has fundamentally shifted. It's not a tool anymore—it's a collaborator, or a competitor, or something else entirely. The old categories don't fit."
    },
    2028: {
        intro: "2028. If the fast timeline was right, we're post-AGI. If the slow timeline was right, we're still in transition. Either way, this is a different world.",
        sections: {
            scaling: {
                low: "Progress normalized. AI is very capable but not transformative at the civilization level. The singularity was postponed. Life continues with better tools.",
                mid: "Stargate-class infrastructure ($100B clusters) comes online. Capabilities continue advancing but the curve has bent. We're in the long climb, not the vertical takeoff.",
                high: "Superintelligent systems exist—systems that exceed human capability at virtually all cognitive tasks. The question is no longer capability but alignment and control."
            },
            safety: {
                low: "We got lucky or we didn't. Either alignment held despite our ignorance, or we're dealing with the consequences of misaligned superintelligent systems.",
                mid: "Alignment techniques scale to current systems. But uncertainty remains. We think we understand the systems well enough. History will judge if we were right.",
                high: "Alignment solved—or as solved as it can be given fundamental uncertainty. We understand our systems. We can correct them. We have confidence, not just hope."
            },
            governance: {
                low: "Governance overwhelmed. Either a single power dominates, or chaos reigns. The dream of coordinated global management failed.",
                mid: "Three-regime world stabilized. US/allies, EU, and China operate under different rules. Not unified, but not at war. Competitive coexistence.",
                high: "Functional global governance. Not world government, but coordinated rules. Compute monitored. Safety standards enforced. Humanity steering together."
            },
            economy: {
                low: "Economic model in crisis. Mass displacement not absorbed. Either new equilibrium found through upheaval, or prolonged instability.",
                mid: "Bifurcated economy. AI-leveraged sectors thrive. Others struggle. Inequality widened but not collapsed society. Tension but not breakdown.",
                high: "Post-scarcity elements emerge. AI productivity enables universal basic services. Not utopia, but material needs increasingly met. New questions about meaning."
            },
            concentration: {
                low: "Power crystallized. A few entities control the most transformative technology. Everyone else adapts to their decisions.",
                mid: "Distributed but unequal. Multiple actors have frontier capability. Power imbalanced but not monopolized. Competition continues.",
                high: "Distributed by design or necessity. No single point of control or failure. Governance challenge but also resilience against capture."
            },
            timeline: {
                low: "The fast predictions were wrong. AGI is here or near, but ASI remains distant. We have time—probably years or decades—to get this right.",
                mid: "Transformative AI is reality. Whether 'AGI' or 'superintelligence' depends on definitions. What matters: human-level cognition is no longer the ceiling.",
                high: "ASI exists or is imminent. Humanity's role is changing fundamentally. We're either partners with something greater, or we're being surpassed."
            }
        },
        worldEvents: "Stargate operational (or delayed). First AI-led scientific paradigm shift. Either: governance framework matures, or: major incident forces emergency response. Taiwan situation resolved (peacefully or not).",
        personalImpact: "Your life is different than you imagined in 2025. Better or worse depends on choices made years ago—by you, by leaders, by luck. The future you're in was shaped in the window we just passed through."
    },
    2029: {
        intro: "2029. Looking back at the decade that decided everything. The choices made in 2025-2027 are now fully manifest.",
        sections: {
            scaling: {
                low: "The scaling era ended. Capabilities plateaued at very high but not transformative levels. AI is the most powerful tool ever, but tools is what they are.",
                mid: "Continuous improvement continues but at manageable rates. Each year brings advances, but not discontinuities. The world adapts incrementally.",
                high: "We're in recursive improvement territory. AI systems improve themselves faster than humans can track. The future is harder to predict than ever."
            },
            safety: {
                low: "Alignment remains unsolved but hasn't failed catastrophically. We're riding luck. Every major deployment is a gamble we've been winning.",
                mid: "Alignment is 'good enough' for current systems. But the hard problem—ensuring superhuman systems remain aligned—is still open. We're working on it.",
                high: "Alignment is a mature field with proven techniques. We can build systems we trust for the right reasons, not just because they haven't failed yet."
            },
            governance: {
                low: "Power decided outcomes, not principles. Whoever controlled AI shaped the rules. Governance is what the powerful say it is.",
                mid: "Institutions adapted, imperfectly. Not the governance we wanted, but governance that functions. The messy reality of human coordination under pressure.",
                high: "We built institutions for the challenge. Global coordination works well enough. The most dangerous scenarios were avoided through cooperation."
            },
            economy: {
                low: "Scars from the transition are deep. A generation displaced. The benefits of AI accrue to some; the costs fell on others. Resentment persists.",
                mid: "Transition largely complete. The economy is different—more automated, more productive, more unequal. People adapted, some thriving, some surviving.",
                high: "The transition succeeded. AI productivity benefits widely shared. New forms of work and meaning emerged. Not without loss, but overall: better."
            },
            concentration: {
                low: "The AI era cemented new power structures. Those who controlled it early, control it now. Democracy adapts to new power realities.",
                mid: "Power distributed but not equal. Multiple centers of AI capability exist. Competition continues. Not monopoly, not anarchy—oligopoly with constraints.",
                high: "Widely distributed capability. No single point of control. The technology belongs to humanity, not to a few entities. Governance challenges persist but monopoly avoided."
            },
            timeline: {
                low: "We have more time than we feared. AGI exists but ASI is not imminent. The window for getting governance right is still open.",
                mid: "We're living in the transition to ASI. It's happening gradually enough that we can adapt, quickly enough that every year matters.",
                high: "ASI is here or very close. Human-level intelligence is the past. The question is our relationship with what comes next."
            }
        },
        worldEvents: "Depends entirely on the path. Either: AI-enabled solutions to major problems, or: crises amplified by AI, or: fundamental transformation of human agency. The headlines reflect choices made years ago.",
        personalImpact: "You're living in the future now. What seemed like speculation in 2025 is daily reality. The question is whether it's the future you wanted."
    },
    2030: {
        intro: "2030. The horizon we gazed toward from 2025. The future is now. The choices made—your choices—shaped what kind of 2030 this is.",
        sections: {
            scaling: {
                low: "AI is powerful, but the singularity didn't happen. Capabilities plateaued at very high but comprehensible levels. Humanity remains the ceiling for some things.",
                mid: "Continuous progress, managed transition. AI is the most important technology ever, but society adapted. The future arrived gradually enough to absorb.",
                high: "We're beyond human-scale intelligence. The systems we built are beyond our ability to fully understand. We hope we built them right."
            },
            safety: {
                low: "We got through—by luck, by narrow margins, or by consequences we're still living with. Alignment wasn't solved but didn't fail catastrophically. Yet.",
                mid: "Alignment good enough for what we built. The hard problem remains open. We manage risk rather than eliminate it. Careful but not certain.",
                high: "Alignment is a solved problem for practical purposes. We understand how to build beneficial AI. The existential risk is managed, not eliminated."
            },
            governance: {
                low: "The governance we have is the governance the powerful wanted. International cooperation failed. A few actors set global norms.",
                mid: "Imperfect but functional institutions. Humanity coordinated well enough to avoid worst outcomes, not well enough for best outcomes. The human condition.",
                high: "We rose to the challenge. Global coordination on AI works. Humanity acts collectively on its most important technology. Not perfect, but functional."
            },
            economy: {
                low: "The economy serves those who won the AI transition. Everyone else adapted as best they could. The benefits weren't shared.",
                mid: "Mixed economy. Some benefited enormously, some were displaced, most adapted. Not the utopia or dystopia we imagined—just a different world.",
                high: "The AI productivity dividend was shared. New economic models work. Material needs increasingly met. New challenges around meaning and purpose."
            },
            concentration: {
                low: "AI power is concentrated. A few entities shape humanity's future. Democracy exists but in the shadow of AI power.",
                mid: "Multiple power centers. Competition and cooperation coexist. Not monopoly, not equality—complex power dynamics for a complex technology.",
                high: "Distributed AI capability. No single point of control. Humanity collectively shapes its future. Coordination challenges but no monopoly."
            },
            timeline: {
                low: "The fast predictions were wrong. ASI is not here. We have more time. The 2020s were the beginning, not the end, of the transition.",
                mid: "We're in it—the transition to a world shaped by superhuman intelligence. Whether it's 'over' or 'ongoing' depends on your timescale.",
                high: "ASI exists. Humanity's relationship with intelligence has fundamentally changed. We're either partners in something greater, or we're stewards of something we made."
            }
        },
        worldEvents: "The world of 2030 is the world we built from 2025. Climate solutions or climate crisis. Abundance or inequality. Flourishing or decline. The seeds were planted in the choices made.",
        personalImpact: "This is your life now. The future you speculated about in 2025 surrounds you. Was it the future you wanted? Did the choices matter? They did."
    }
};

// Outcome-based narrative conclusions
const NARRATIVE_CONCLUSIONS = {
    suffering: "The path led to catastrophe. Misaligned AI, concentrated power, or governance failure created a world of suffering. The transition was mishandled. The window for course correction is closing or closed.",
    decline: "High-risk trajectory. Benefits captured by few, risks borne by many. Alignment uncertain, governance weak, inequality rising. Not catastrophe—but the trend is wrong. Change is still possible.",
    stable: "Turbulent but navigable. Some things worked, some failed. The transition is happening—chaotically, unevenly—but humanity is adapting. The outcome remains uncertain. Every choice still matters.",
    prosperous: "Managed transition. Alignment progressing, governance functioning, benefits spreading. Not utopia—problems remain—but the trajectory is positive. The hard work is paying off.",
    flourishing: "The best plausible outcome. Aligned AI amplifying human potential. Distributed access, functional governance, shared prosperity. Not perfect, but genuinely good. The choices mattered."
};
