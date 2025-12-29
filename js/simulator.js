class NarrativeEngine {
    constructor() {
        this.sliders = {};
        this.selectedYear = 2025;
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateSliderFills();
        this.updateFactorValues();
        this.update();
        this.updateTimelineProgress();
        this.updateLastUpdate();
    }

    cacheElements() {
        for (const key in FACTORS) {
            this.sliders[key] = document.getElementById(key);
        }

        this.outcomeLabel = document.getElementById('outcomeLabel');
        this.probabilityValue = document.getElementById('probabilityValue');
        this.probabilityRing = document.getElementById('probabilityRing');
        this.narrativeContent = document.getElementById('narrativeContent');
        this.yearNodes = document.querySelectorAll('.year-node');
        this.timelineProgress = document.getElementById('timelineProgress');
        this.divergenceScore = document.getElementById('divergenceScore');
        this.confidenceLevel = document.getElementById('confidenceLevel');
        this.lastUpdate = document.getElementById('lastUpdate');
    }

    bindEvents() {
        // Slider events
        for (const key in this.sliders) {
            if (this.sliders[key]) {
                this.sliders[key].addEventListener('input', () => {
                    this.updateSliderFills();
                    this.updateFactorValues();
                    this.update();
                    this.clearPresetSelection();
                    this.updateLastUpdate();
                    this.highlightNarrativeSection(key);
                });
                
                this.sliders[key].addEventListener('mouseenter', () => this.highlightFactor(key));
                this.sliders[key].addEventListener('mouseleave', () => this.clearHighlights());
            }
        }

        // Year timeline events
        this.yearNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                const year = parseInt(e.currentTarget.dataset.year);
                this.selectYear(year);
            });
        });

        // Preset events
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const presetName = e.currentTarget.dataset.preset;
                this.loadPreset(presetName);
            });
        });

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.loadPreset('current');
            });
        }

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareScenario();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === '?') {
                this.showHelp();
            }
            // Year navigation with arrow keys
            if (e.key === 'ArrowRight') {
                this.navigateYear(1);
            }
            if (e.key === 'ArrowLeft') {
                this.navigateYear(-1);
            }
            // Close modal on Escape
            if (e.key === 'Escape') {
                this.closeSourcesModal();
            }
        });

        // Sources modal
        const sourcesBtn = document.getElementById('sourcesBtn');
        if (sourcesBtn) {
            sourcesBtn.addEventListener('click', () => this.openSourcesModal());
        }

        const closeSourcesModal = document.getElementById('closeSourcesModal');
        if (closeSourcesModal) {
            closeSourcesModal.addEventListener('click', () => this.closeSourcesModal());
        }

        // Close modal on overlay click
        const sourcesModal = document.getElementById('sourcesModal');
        if (sourcesModal) {
            sourcesModal.addEventListener('click', (e) => {
                if (e.target === sourcesModal) {
                    this.closeSourcesModal();
                }
            });
        }
    }

    getValues() {
        const values = {};
        for (const key in this.sliders) {
            values[key] = parseInt(this.sliders[key]?.value || FACTORS[key].default);
        }
        return values;
    }

    calculateScore() {
        const values = this.getValues();
        let score = 0;
        
        // New scoring logic based on research:
        // Higher safety, governance, economy (managed), concentration (distributed) = better
        // Higher scaling and timeline = more risk (need to balance with safety)
        
        for (const key in values) {
            let adjustedValue = values[key];
            
            // Factors where higher = better outcome
            // safety: more safety investment = better
            // governance: more coordination = better
            // economy: more managed transition = better (right side)
            // concentration: more distributed = better (right side)
            
            // Factors where higher = more risk (invert for score)
            // scaling: exponential scaling without safety = risk
            // timeline: faster timeline = less time to prepare = risk
            
            if (key === 'scaling') {
                // High scaling is risky unless safety is also high
                const safetyValue = values['safety'] || 50;
                adjustedValue = safetyValue > values[key] ? values[key] : 100 - (values[key] - safetyValue);
                adjustedValue = Math.max(0, Math.min(100, adjustedValue));
            }
            if (key === 'timeline') {
                // Faster timeline (higher value) = more risk
                adjustedValue = 100 - adjustedValue;
            }
            
            score += adjustedValue * FACTORS[key].weight;
        }
        
        return Math.round(score);
    }

    getOutcome(score) {
        for (const key in OUTCOMES) {
            if (score <= OUTCOMES[key].max) {
                return { key, ...OUTCOMES[key] };
            }
        }
        return { key: 'flourishing', ...OUTCOMES.flourishing };
    }

    loadPreset(presetName) {
        const preset = PRESETS[presetName];
        if (!preset) return;
        
        for (const key in preset) {
            if (this.sliders[key]) {
                this.sliders[key].value = preset[key];
            }
        }
        
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.preset === presetName);
        });
        
        this.updateSliderFills();
        this.updateFactorValues();
        this.update();
        this.updateLastUpdate();
    }

    clearPresetSelection() {
        // Don't clear - check if current values match any preset
        const values = this.getValues();
        let matchedPreset = null;
        
        for (const presetName in PRESETS) {
            const preset = PRESETS[presetName];
            let matches = true;
            for (const key in preset) {
                if (values[key] !== preset[key]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                matchedPreset = presetName;
                break;
            }
        }
        
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.preset === matchedPreset);
        });
    }

    updateSliderFills() {
        for (const key in this.sliders) {
            const slider = this.sliders[key];
            if (!slider) continue;
            
            const value = parseInt(slider.value);
            const fill = document.getElementById(`${key}-fill`);
            if (fill) {
                fill.style.width = `${value}%`;
            }
        }
    }

    updateFactorValues() {
        for (const key in this.sliders) {
            const slider = this.sliders[key];
            if (!slider) continue;
            
            const valueDisplay = document.getElementById(`${key}-value`);
            if (valueDisplay) {
                valueDisplay.textContent = slider.value;
            }
        }
    }

    selectYear(year) {
        this.selectedYear = year;
        
        this.yearNodes.forEach(node => {
            node.classList.toggle('active', parseInt(node.dataset.year) === year);
        });
        
        this.updateTimelineProgress();
        this.updateNarrative();
    }

    navigateYear(direction) {
        const years = [2025, 2026, 2027, 2028, 2029, 2030];
        const currentIndex = years.indexOf(this.selectedYear);
        const newIndex = Math.max(0, Math.min(years.length - 1, currentIndex + direction));
        this.selectYear(years[newIndex]);
    }

    updateTimelineProgress() {
        if (!this.timelineProgress) return;
        
        const years = [2025, 2026, 2027, 2028, 2029, 2030];
        const index = years.indexOf(this.selectedYear);
        const progress = (index / (years.length - 1)) * 100;
        this.timelineProgress.style.width = `${progress}%`;
    }

    highlightFactor(factorKey) {
        const card = document.querySelector(`.factor-card[data-factor="${factorKey}"]`);
        if (card) {
            card.classList.add('highlighted');
        }
    }

    clearHighlights() {
        document.querySelectorAll('.factor-card').forEach(card => {
            card.classList.remove('highlighted');
        });
    }

    generateNarrative() {
        const year = this.selectedYear;
        const values = this.getValues();
        const yearData = YEAR_NARRATIVES[year];
        
        if (!yearData) return '';
        
        let narrativeHTML = `<div class="narrative-intro">${yearData.intro}</div>`;
        
        const factorIcons = {
            scaling: '📈',
            safety: '🛡️',
            governance: '🌐',
            economy: '💼',
            concentration: '⚖️',
            timeline: '⏱️'
        };
        
        const factorsToShow = ['scaling', 'safety', 'governance', 'economy', 'concentration', 'timeline'];
        factorsToShow.forEach(factorKey => {
            const value = values[factorKey];
            const level = this.getImpactLevel(value);
            const sectionContent = yearData.sections[factorKey][level];
            
            narrativeHTML += `
                <div class="narrative-section-block expanded" data-factor="${factorKey}">
                    <div class="section-header">
                        <span class="section-icon">${factorIcons[factorKey]}</span>
                        <span class="section-title">${FACTORS[factorKey].name}</span>
                    </div>
                    <p class="section-content">${sectionContent}</p>
                </div>
            `;
        });
        
        narrativeHTML += `
            <div class="narrative-block world-events">
                <h4 class="block-header">Global Developments</h4>
                <p>${yearData.worldEvents}</p>
            </div>
            <div class="narrative-block personal-impact">
                <h4 class="block-header">Personal Impact</h4>
                <p>${yearData.personalImpact}</p>
            </div>
        `;
        
        return narrativeHTML;
    }

    getImpactLevel(value) {
        if (value < 35) return 'low';
        if (value < 65) return 'mid';
        return 'high';
    }

    calculateDivergence() {
        const values = this.getValues();
        let divergence = 0;
        
        // Calculate deviation from "current" baseline
        const baseline = PRESETS.current;
        for (const key in values) {
            divergence += Math.abs(values[key] - baseline[key]);
        }
        
        return (divergence / 6).toFixed(1);
    }

    getConfidenceLevel(score) {
        if (score < 30 || score > 80) return 'HIGH';
        if (score < 40 || score > 70) return 'MED';
        return 'LOW';
    }

    updateHeaderMetrics(score) {
        if (this.divergenceScore) {
            const divergence = this.calculateDivergence();
            const sign = divergence >= 0 ? '+' : '';
            this.divergenceScore.textContent = `${sign}${divergence}%`;
        }
        
        if (this.confidenceLevel) {
            this.confidenceLevel.textContent = this.getConfidenceLevel(score);
        }
    }

    updateProbabilityRing(score) {
        if (!this.probabilityRing) return;
        
        // SVG circle with r=52, circumference = 2 * PI * 52 = 327
        const circumference = 327;
        const offset = circumference - (score / 100) * circumference;
        this.probabilityRing.style.strokeDashoffset = offset;
    }

    updateOutcomeTags(outcome) {
        const tagsContainer = document.querySelector('.outcome-tags');
        if (!tagsContainer) return;
        
        const score = this.calculateScore();
        let riskTag = '';
        let signalTag = '';
        
        if (score < 30) {
            riskTag = '<span class="tag negative">High Risk</span>';
            signalTag = '<span class="tag warning">Concerning Trends</span>';
        } else if (score < 50) {
            riskTag = '<span class="tag warning">Elevated Risk</span>';
            signalTag = '<span class="tag neutral">Mixed Signals</span>';
        } else if (score < 70) {
            riskTag = '<span class="tag positive">Moderate Risk</span>';
            signalTag = '<span class="tag neutral">Stable Trajectory</span>';
        } else {
            riskTag = '<span class="tag positive">Low Risk</span>';
            signalTag = '<span class="tag positive">Positive Signals</span>';
        }
        
        tagsContainer.innerHTML = riskTag + signalTag;
    }

    updateNarrative() {
        if (this.narrativeContent) {
            this.narrativeContent.innerHTML = this.generateNarrative();
        }
    }

    toggleSection(headerEl) {
        const block = headerEl.closest('.narrative-section-block');
        if (block) {
            block.classList.toggle('expanded');
        }
    }

    highlightNarrativeSection(factorKey) {
        // Remove previous highlights
        document.querySelectorAll('.narrative-section-block.highlighted').forEach(el => {
            el.classList.remove('highlighted');
        });
        
        // Find and highlight the matching section
        const section = document.querySelector(`.narrative-section-block[data-factor="${factorKey}"]`);
        if (section) {
            section.classList.add('highlighted', 'expanded');
            section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Remove highlight after animation
            setTimeout(() => {
                section.classList.remove('highlighted');
            }, 1500);
        }
    }

    updateLastUpdate() {
        if (this.lastUpdate) {
            this.lastUpdate.textContent = 'just now';
        }
    }

    shareScenario() {
        const values = this.getValues();
        const params = new URLSearchParams();
        
        for (const key in values) {
            params.set(key, values[key]);
        }
        params.set('year', this.selectedYear);
        
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                alert('Scenario URL copied to clipboard!');
            }).catch(() => {
                prompt('Copy this URL to share your scenario:', url);
            });
        } else {
            prompt('Copy this URL to share your scenario:', url);
        }
    }

    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        let hasParams = false;
        
        for (const key in FACTORS) {
            if (params.has(key)) {
                hasParams = true;
                const value = parseInt(params.get(key));
                if (this.sliders[key] && value >= 0 && value <= 100) {
                    this.sliders[key].value = value;
                }
            }
        }
        
        if (params.has('year')) {
            const year = parseInt(params.get('year'));
            if (year >= 2025 && year <= 2030) {
                this.selectedYear = year;
            }
        }
        
        if (hasParams) {
            this.updateSliderFills();
            this.updateFactorValues();
            this.selectYear(this.selectedYear);
        }
    }

    showHelp() {
        alert(`Keyboard Shortcuts:
        
← → : Navigate years
? : Show this help

Tips:
- Adjust sliders to change factor values
- Click presets for quick scenarios
- Click year nodes to explore timeline
- Share button copies scenario URL`);
    }

    // Sources Modal Methods
    openSourcesModal() {
        const modal = document.getElementById('sourcesModal');
        if (modal) {
            this.populateSourcesModal();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeSourcesModal() {
        const modal = document.getElementById('sourcesModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    populateSourcesModal() {
        this.populateKeyClaims();
        this.populateAllSources();
    }

    populateKeyClaims() {
        const container = document.getElementById('keyClaimsList');
        if (!container || typeof KEY_CLAIMS === 'undefined') return;

        container.innerHTML = KEY_CLAIMS.map(claim => {
            const sourceNames = claim.sources.map(sourceId => {
                const source = SOURCES[sourceId];
                return source ? `<span class="claim-source-tag">${source.source}</span>` : '';
            }).join('');

            const factorName = FACTORS[claim.factor]?.name || claim.factor;

            return `
                <div class="claim-card">
                    <span class="claim-factor">${factorName}</span>
                    <div class="claim-text">${claim.claim}</div>
                    <div class="claim-sources">${sourceNames}</div>
                </div>
            `;
        }).join('');
    }

    populateAllSources() {
        const container = document.getElementById('allSourcesList');
        if (!container || typeof SOURCES === 'undefined') return;

        container.innerHTML = Object.entries(SOURCES).map(([id, source]) => {
            return `
                <div class="source-card" data-source-id="${id}">
                    <div class="source-header">
                        <div class="source-title">${source.title}</div>
                    </div>
                    <div class="source-meta">
                        <span class="source-org">${source.source}</span>
                        <span class="source-date">${source.date}</span>
                    </div>
                    <div class="source-quote">"${source.quote}"</div>
                    <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="source-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        View Source
                    </a>
                </div>
            `;
        }).join('');
    }

    update() {
        const score = this.calculateScore();
        const outcome = this.getOutcome(score);
        
        if (this.outcomeLabel) {
            this.outcomeLabel.textContent = outcome.label.toUpperCase();
        }
        
        if (this.probabilityValue) {
            this.probabilityValue.textContent = score;
        }
        
        this.updateProbabilityRing(score);
        this.updateHeaderMetrics(score);
        this.updateOutcomeTags(outcome);
        this.updateNarrative();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const engine = new NarrativeEngine();
    engine.loadFromURL();
    window.narrativeEngine = engine;
});
