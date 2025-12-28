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
        });
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
        
        for (const key in values) {
            let adjustedValue = values[key];
            if (key === 'autonomy' || key === 'speed') {
                adjustedValue = 100 - adjustedValue;
            }
            if (key === 'privacy') {
                adjustedValue = 100 - adjustedValue;
            }
            if (key === 'environment') {
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
            autonomy: '🤖',
            privacy: '🔐',
            speed: '⚡',
            economy: '💰',
            environment: '🌱',
            cooperation: '🤝'
        };
        
        const factorsToShow = ['autonomy', 'privacy', 'speed', 'economy', 'environment', 'cooperation'];
        factorsToShow.forEach(factorKey => {
            const value = values[factorKey];
            const level = this.getImpactLevel(value);
            const sectionContent = yearData.sections[factorKey][level];
            
            narrativeHTML += `
                <div class="narrative-section-block">
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
});
