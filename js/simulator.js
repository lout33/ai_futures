class NarrativeEngine {
    constructor() {
        this.sliders = {};
        this.selectedYear = 2025;
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.update();
    }

    cacheElements() {
        for (const key in FACTORS) {
            this.sliders[key] = document.getElementById(key);
        }

        this.outcomeLabel = document.getElementById('outcomeLabel');
        this.probabilityValue = document.getElementById('probabilityValue');
        this.probabilityRing = document.getElementById('probabilityRing');
        this.narrativeContent = document.getElementById('narrativeContent');
        this.yearTabs = document.querySelectorAll('.year-tab-top');
    }

    bindEvents() {
        for (const key in this.sliders) {
            if (this.sliders[key]) {
                this.sliders[key].addEventListener('input', () => {
                    this.updateSliderFill();
                    this.update();
                });
                
                this.sliders[key].addEventListener('mouseenter', () => this.highlightFactor(key));
                this.sliders[key].addEventListener('mouseleave', () => this.clearHighlights());
            }
        }

        this.yearTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const year = parseInt(e.target.dataset.year);
                this.selectYear(year);
            });
        });

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const presetName = e.currentTarget.dataset.preset;
                this.loadPreset(presetName);
            });
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
        
        this.updateSliderFill();
        this.update();
    }

    updateSliderFill() {
        for (const key in this.sliders) {
            const slider = this.sliders[key];
            const value = parseInt(slider.value);
            const percentage = `${value}%`;
            slider.style.setProperty('--slider-pos', percentage);
        }
    }

    selectYear(year) {
        this.selectedYear = year;
        
        this.yearTabs.forEach(tab => {
            tab.classList.toggle('active', parseInt(tab.dataset.year) === year);
        });
        
        this.updateNarrative();
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
        
        let narrativeHTML = `<p class="narrative-intro">${yearData.intro} ${this.getOutcomeDescription(values)}</p>`;
        
        const factorsToShow = ['autonomy', 'privacy', 'speed', 'economy', 'environment', 'cooperation'];
        factorsToShow.forEach(factorKey => {
            const value = values[factorKey];
            const level = this.getImpactLevel(value);
            const sectionContent = yearData.sections[factorKey][level];
            
            narrativeHTML += `
                <div class="narrative-section-block">
                    <h3 class="section-header">${FACTORS[factorKey].name}</h3>
                    <p class="section-content">${sectionContent}</p>
                </div>
            `;
        });
        
        narrativeHTML += `
            <div class="narrative-block world-events">
                <h4 class="block-header">🌍 World Events</h4>
                <p>${yearData.worldEvents}</p>
            </div>
            <div class="narrative-block personal-impact">
                <h4 class="block-header">👤 Your Life</h4>
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

    getOutcomeDescription(values) {
        const score = this.calculateScore();
        const outcome = this.getOutcome(score);
        return outcome.label;
    }

    updateProbabilityRing(score) {
        if (!this.probabilityRing) return;
        
        const circumference = 283;
        const offset = circumference - (score / 100) * circumference;
        this.probabilityRing.style.strokeDashoffset = offset;
    }

    updateNarrative() {
        if (this.narrativeContent) {
            this.narrativeContent.innerHTML = this.generateNarrative();
        }
    }

    update() {
        const score = this.calculateScore();
        const outcome = this.getOutcome(score);
        
        if (this.outcomeLabel) {
            this.outcomeLabel.textContent = outcome.label;
            this.outcomeLabel.style.color = outcome.color;
        }
        
        if (this.probabilityValue) {
            this.probabilityValue.textContent = `${score}%`;
            this.probabilityValue.style.color = outcome.color;
        }
        
        this.updateProbabilityRing(score);
        this.updateNarrative();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NarrativeEngine();
});
