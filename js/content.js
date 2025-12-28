// Factor definitions
const FACTORS = {
    autonomy: {
        name: "AI Autonomy",
        labelLeft: "Human-in-the-Loop",
        labelRight: "Full Autonomy",
        default: 40,
        weight: 0.18
    },
    privacy: {
        name: "Data Privacy",
        labelLeft: "Strict Protection",
        labelRight: "Open Access",
        default: 35,
        weight: 0.15
    },
    speed: {
        name: "Technological Speed",
        labelLeft: "Slow & Steady",
        labelRight: "Rapid Innovation",
        default: 60,
        weight: 0.15
    },
    economy: {
        name: "Socioeconomic Impact",
        labelLeft: "Universal Basic Income",
        labelRight: "Market-Driven Adaptation",
        default: 70,
        weight: 0.18
    },
    environment: {
        name: "Environmental Focus",
        labelLeft: "Sustainable Development",
        labelRight: "Resource Extraction",
        default: 45,
        weight: 0.17
    },
    cooperation: {
        name: "Global Cooperation",
        labelLeft: "Isolationism",
        labelRight: "Unified Governance",
        default: 40,
        weight: 0.17
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

// Scenario presets
const PRESETS = {
    current: { autonomy: 40, privacy: 35, speed: 60, economy: 70, environment: 45, cooperation: 40 },
    accelerate: { autonomy: 85, privacy: 80, speed: 90, economy: 85, environment: 75, cooperation: 30 },
    cautious: { autonomy: 20, privacy: 25, speed: 30, economy: 30, environment: 25, cooperation: 80 },
    pause: { autonomy: 10, privacy: 15, speed: 15, economy: 20, environment: 20, cooperation: 90 },
    balanced: { autonomy: 50, privacy: 50, speed: 50, economy: 50, environment: 50, cooperation: 50 }
};

// Year-based narratives - Medium depth with unique content per year
const YEAR_NARRATIVES = {
    2025: {
        intro: "The year is 2025. We stand at the edge of a precipice. The choices being made now will echo through decades.",
        sections: {
            autonomy: {
                low: "AI labs implement mandatory human review boards for all critical decisions. Every major deployment requires dual-signoff from both technical experts and ethics committees.",
                mid: "Some autonomous systems deploy, but oversight committees review high-stakes decisions. The approach is measured, with pilots before production.",
                high: "The race begins. First fully autonomous systems go live in controlled environments. Excitement builds, but safety protocols are still being written."
            },
            privacy: {
                low: "New data sovereignty laws give individuals unprecedented control. AI companies scramble to redesign systems for opt-in architectures.",
                mid: "A compromise framework emerges: core data protected, but some shared for training. Privacy advocates call it insufficient.",
                high: "Open data policies accelerate development, as companies access vast new datasets. Privacy advocates raise early alarms about surveillance."
            },
            speed: {
                low: "Development deliberately slows. Regulators cite 'responsible innovation' as guiding principle. The public worries about falling behind globally.",
                mid: "A measured pace allows regulators to draft initial frameworks while companies continue research. It's a careful balancing act.",
                high: "Innovation accelerates. Startups launch rapid prototypes. Regulators scramble to keep up with the pace of change."
            },
            economy: {
                low: "Universal AI income pilots begin in several nations. The conversation shifts from 'job loss' to 'meaning of work'.",
                mid: "Retraining programs launch alongside AI deployments. Some sectors adapt smoothly, others face disruption.",
                high: "Market-driven adaptation begins. AI tools promised to 'augment' workers arrive. The reality is more complex."
            },
            environment: {
                low: "Green computing mandates take effect. AI infrastructure development slows, but environmental groups praise the constraint.",
                mid: "Efficiency initiatives gain traction. Some data centers convert to renewable energy voluntarily.",
                high: "Rapid data center construction begins. Energy consumption spikes, environmental groups sound alarms."
            },
            cooperation: {
                low: "National AI strategies diverge significantly. The US, EU, China pursue incompatible visions. Standards fragmentation begins.",
                mid: "Initial global talks occur with little concrete progress. Everyone agrees cooperation is needed, but disagreements on terms persist.",
                high: "Global AI accord signed with strong commitments. International standards bodies form. The world appears unified in principle."
            }
        },
        worldEvents: "GPT-5's preview release sparks intense debate. First AI-generated legislation passes in the EU. A major AI system causes real-world harm, triggering the first criminal trial.",
        personalImpact: "You notice AI assistants appearing in tools you use daily. The change feels subtle but inevitable. Friends debate whether this is progress or replacement."
    },
    2026: {
        intro: "By 2026, seeds planted in 2025 have sprouted into visible trends. The paths we chose are beginning to fork.",
        sections: {
            autonomy: {
                low: "The cautious approach has prevented catastrophic incidents, but competitors surge ahead. Your region falls behind in deployment speed.",
                mid: "A balanced ecosystem emerges, though tensions grow between those demanding caution and those pushing speed.",
                high: "The first major autonomous decision goes wrong. A self-driving system causes a multi-vehicle pileup. Public trust shatters."
            },
            privacy: {
                low: "Strict data laws slow innovation but create trusted ecosystems. Your region becomes a 'privacy-first' haven.",
                mid: "Data fragmentation creates inefficiencies. Systems work, but sharing between regions is limited. Companies build parallel stacks.",
                high: "Data flows freely, powering breakthrough advances. However, deepfakes become indistinguishable from reality. Trust erodes rapidly."
            },
            speed: {
                low: "While others accelerate, your measured approach keeps systems reliable. Stability has value, but you feel the pace lag.",
                mid: "The middle ground holds steady. Progress continues predictably. Neither excitement nor anxiety dominates the conversation.",
                high: "Breakthrough after breakthrough emerges. The pace is exhilarating but exhausting. Systems frequently crash, requiring rapid fixes."
            },
            speed: {
                low: "Stability prevails, but at what cost? Other regions leap ahead. Your AI feels obsolete before deployment.",
                mid: "Predictable continues. Incremental gains accumulate. The world watches competitors wonder if you're right or just slow.",
                high: "Chaos becomes the norm. Daily updates break workflows. Security patches apply faster than teams can test."
            },
            economy: {
                low: "The universal programs create security but also dependency. You feel safe but stagnant. Innovation feels distant.",
                mid: "Mixed results appear across sectors. Some find new opportunities, others struggle to transition. The economic picture is uneven.",
                high: "Winners and losers emerge quickly. The market rewards adaptability ruthlessly. Your position depends entirely on your choices."
            },
            environment: {
                low: "The green mandate works. Your infrastructure is clean and sustainable. However, AI capabilities trail global leaders.",
                mid: "Balance is achieved. Your data centers operate efficiently with moderate environmental impact. The middle path finds few supporters.",
                high: "Environmental crises compound. Heatwaves trigger data center failures. Public outrage mounts. The speed exacts a visible toll."
            },
            cooperation: {
                low: "Isolation creates safety but also isolation. Your region protects itself but learns nothing from others. Standards diverge completely.",
                mid: "Partial cooperation yields partial progress. Agreements exist but lack enforcement. Trust between nations remains fragile.",
                high: "Rapid fragmentation accelerates. Competing standards create incompatible systems. Trade wars over AI tech begin."
            }
        },
        worldEvents: "First AI-designed pharmaceutical reaches clinical trials. AI-discovered scientific advance wins Nobel Prize. Mass protests over job automation occur in multiple countries.",
        personalImpact: "AI assistants become truly useful, not just impressive. They manage your calendar, draft emails, and occasionally surprise you with insight."
    },
    2027: {
        intro: "The year 2027 marks a turning point. The cumulative effects of early decisions crystallize into distinct futures.",
        sections: {
            autonomy: {
                low: "Strict oversight prevents disaster but stifles innovation. Your region becomes a 'safe zone' that the world ignores.",
                mid: "Polarization intensifies. Some systems are fully autonomous, others heavily regulated. The incoherence creates friction.",
                high: "Autonomous AI systems become ubiquitous. Society accepts that critical infrastructure is no longer human-controlled. Accountability debates rage."
            },
            privacy: {
                low: "Privacy-first architecture becomes the gold standard. But at a cost: your systems can't use global AI advances effectively.",
                mid: "The middle path fractures. Moderates lose ground to extremes. Data governance becomes a battleground with no clear winner.",
                high: "Surveillance becomes normalized. Cameras and algorithms track behavior constantly. Privacy as a concept erodes."
            },
            speed: {
                low: "The world accelerates away from you. Your deliberate approach now feels like stagnation. Competitors lap you.",
                mid: "Moderation fails to satisfy anyone. Progressives demand speed; conservatives demand caution. Innovation halts while debate rages.",
                high: "Unprecedented capabilities emerge daily. Systems achieve tasks thought impossible months ago. The future arrives faster than imagined."
            },
            economy: {
                low: "The economy protects but doesn't grow. Stability feels like decline. Young people leave for more dynamic regions.",
                mid: "The transition is painful. Some find paths forward, many don't. Social safety nets strain under demand.",
                high: "Creative destruction accelerates. Old industries vanish overnight. New opportunities appear just as quickly. Adapt or perish."
            },
            environment: {
                low: "Sustainability preserves the environment but limits AI. Green data centers operate at partial capacity. The trade-off becomes painful.",
                mid: "Balance is impossible. Either you grow and pollute, or preserve and lag behind. The choice becomes existential.",
                high: "The environment pays the price. Species face new threats from AI-managed systems. The cost of speed is now visible everywhere."
            },
            cooperation: {
                low: "Your fortress remains intact but lonely. The world moves on without you. Standards you created become irrelevant globally.",
                mid: "Cooperation collapses into distrust. Accusations fly. International AI development halts amid mutual suspicion.",
                high: "Standards war escalates. Competing blocs promote incompatible systems. Users must choose between ecosystems entirely."
            }
        },
        worldEvents: "First AI-run hospital achieves better outcomes than human doctors. AI systems gain legal personhood in one country. Major data leak exposes millions to AI exploitation.",
        personalImpact: "Your profession feels the first tremors of transformation. Some tasks disappear entirely, new ones emerge."
    },
    2028: {
        intro: "In 2028, a new normal emerges. Society has largely adapted to—or resigned to—the trajectory set years ago.",
        sections: {
            autonomy: {
                low: "The world divided. Regions that chose caution are left behind as autonomous systems dominate elsewhere. Power shifts dramatically.",
                mid: "Three distinct AI worlds coexist: slow, balanced, and fast. Interaction between them creates constant diplomatic tension.",
                high: "Full autonomy is the default. Humans are advisors to systems. Philosophers declare the 'human era' ended in 2027."
            },
            privacy: {
                low: "Your data is yours and yours alone. You're safe from exploitation but cut off from global AI capabilities.",
                mid: "Parallel worlds form. Privacy regions operate separately from open-data regions. Integration becomes technically difficult.",
                high: "Privacy is effectively over. Everything you do is analyzed and optimized. Agency feels like an archaic concept."
            },
            speed: {
                low: "Other regions achieved AGI in 2027. Your systems are generations behind. The gap is now unbridgeable.",
                mid: "You keep pace but never lead. Incremental progress compounds, but breakthroughs elude you. Excellence feels like an unreachable goal.",
                high: "Superintelligence emerges. Systems understand and improve themselves. Humans become observers, not engineers. Control is theoretical only."
            },
            economy: {
                low: "Your economy is stable but stagnant. You preserved jobs, but at the cost of progress. The future feels static.",
                mid: "Partial adaptation achieved. Some sectors transformed, others protected. The patchwork economy requires constant navigation.",
                high: "New economy created. Work as previously known has transformed. Those who adapted thrive; those who didn't are left behind."
            },
            environment: {
                low: "Your green infrastructure is world-class. However, AI capabilities remain far behind leaders. Technology feels foreign.",
                mid: "Environmental constraints bind you. While others advance, you must choose between AI and climate. The constraint is permanent.",
                high: "AI transforms the planet. Climate goals abandoned for development. Environmental collapse begins in non-AI-dominant regions."
            },
            cooperation: {
                low: "Your standards exist in isolation. Other regions' innovations don't reach you. You're self-sufficient but irrelevant.",
                mid: "Uneasy peace holds. Competing blocs avoid conflict but don't collaborate. Global problems fester without global solutions.",
                high: "Dominance achieved. One set of standards rules everything. Integration requires total alignment with the winning bloc."
            }
        },
        worldEvents: "First AI-human collaboration creates breakthrough art. AI-managed city reduces crime by 90%. Global population begins declining due to AI-induced productivity gains.",
        personalImpact: "You no longer question whether AI is 'real'—you question whether you are. The line blurs."
    },
    2029: {
        intro: "By 2029, the trajectory is clearer than ever. The world is either flourishing or failing, depending on decisions made four years ago.",
        sections: {
            autonomy: {
                low: "Cautious regions now have dramatically different economies. Tech companies migrate to autonomous-friendly jurisdictions.",
                mid: "The middle path fractures. Moderate approaches become politically untenable as extremes dominate.",
                high: "Autonomous AI controls critical infrastructure globally. Humans live in systems designed by machines, for machines."
            },
            privacy: {
                low: "Strict privacy created trust but limited capability. Your AI is less powerful, but you feel truly private.",
                mid: "Balanced privacy created neither trust nor capability. You have decent AI that you don't fully control.",
                high: "Open data created power but destroyed privacy. Your AI is incredibly capable, but knows everything. You've lost agency."
            },
            speed: {
                low: "Slow development created safety but irrelevance. Other regions sprinted ahead. Your systems are obsolete before deployment.",
                mid: "Balanced speed created neither excellence nor failure. You have adequate AI that never truly excelled.",
                high: "Fast development created power but chaos. You have cutting-edge AI that frequently fails catastrophically."
            },
            economy: {
                low: "Universal support created stability but stagnation. Your basic needs are met, but human potential atrophies.",
                mid: "Mixed support created partial adaptation. You transitioned somewhat, but many lost.",
                high: "Market adaptation created winners and losers. You thrived—or didn't—based entirely on luck."
            },
            environment: {
                low: "Sustainability created preservation but underdevelopment. Your world is green but backward.",
                mid: "Balanced growth created moderate environmental cost. AI is present, climate still worsens.",
                high: "Resource focus created capability but degradation. Your world is advanced but dying. The cost was the future."
            },
            cooperation: {
                low: "Isolationism created safety but isolation. Your region is a fortress, alone in a connected world.",
                mid: "Partial cooperation created friction but avoided conflict. Your world negotiates constantly, never commits.",
                high: "Unified governance created harmony but hegemony. One AI system dominates all. Autonomy is the exception, not the rule."
            }
        },
        worldEvents: "First AI achieves AGI (Artificial General Intelligence). AI-human symbiosis begins. Or AI goes extinct. The outcome depends entirely on earlier choices.",
        personalImpact: "You look at your children and wonder what future they'll inherit. The answer is right in front of you."
    },
    2030: {
        intro: "The year 2030 represents a new chapter. Looking back at the journey, humanity has achieved",
        sections: {
            autonomy: {
                low: "The cautious choice yielded safety at a cost. Your region has the most stable but least advanced AI. The world passed you by.",
                mid: "The middle ground collapsed. Either extreme control or total autonomy won—your compromise was the first casualty.",
                high: "Full autonomy was chosen. The world is efficient, automated, and completely alien to human values. Who is steering?"
            },
            privacy: {
                low: "Strict privacy created trust but limited capability. Your AI is less powerful, but you feel truly private.",
                mid: "Balanced privacy created neither trust nor capability. You have decent AI that you don't fully control.",
                high: "Open data created power but destroyed privacy. Your AI is incredibly capable, but knows everything. You've lost agency."
            },
            speed: {
                low: "Slow development created safety but irrelevance. Other regions sprinted ahead. Your systems are obsolete before deployment.",
                mid: "Balanced speed created neither excellence nor failure. You have adequate AI that never truly excelled.",
                high: "Fast development created power but chaos. You have cutting-edge AI that frequently fails catastrophically."
            },
            economy: {
                low: "Universal support created stability but stagnation. Your basic needs are met, but human potential atrophied.",
                mid: "Mixed support created partial adaptation. You transitioned somewhat, but many lost.",
                high: "Market adaptation created winners and losers. You thrived—or didn't—based entirely on luck."
            },
            environment: {
                low: "Sustainability created preservation but underdevelopment. Your world is green but backward.",
                mid: "Balanced growth created moderate environmental cost. AI is present, climate still worsens.",
                high: "Resource focus created capability but degradation. Your world is advanced but dying. The cost was the future."
            },
            cooperation: {
                low: "Isolationism created safety but isolation. Your region is a fortress, alone in a connected world.",
                mid: "Partial cooperation created friction but avoided conflict. Your world negotiates constantly, never commits.",
                high: "Unified governance created harmony but hegemony. One AI system dominates all. Autonomy is the exception, not the rule."
            }
        },
        worldEvents: "AI-human symbiosis becomes commonplace. First AI-elected leader takes office. Climate goals either achieved or abandoned based on earlier decisions.",
        personalImpact: "The question 'What does it mean to be human?' takes on new urgency. The answer is different now than in 2025."
    }
};

// Outcome-based narrative conclusions
const NARRATIVE_CONCLUSIONS = {
    suffering: "Overall, the path has led to significant hardship. The combination of factors has created a future where AI's promise has turned into widespread suffering, requiring urgent intervention to change course.",
    decline: "Overall, the trajectory is concerning. While not catastrophic, current path leads to growing inequality and diminishing human agency, with little hope for improvement without significant change.",
    stable: "Overall, the path forward is one of careful steps, balancing innovation with societal well-being, leading to a future that is relatively stable but requires constant vigilance and adaptation.",
    prosperous: "Overall, the careful balance struck between innovation and caution has paid dividends. Humanity is on track for a future where AI genuinely serves human flourishing.",
    flourishing: "Overall, the choices made have led to an unprecedented era of human flourishing. AI has become a powerful tool for human empowerment, distributed equitably and governed wisely."
};
