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
        // Cache all slider elements
        for (const key in FACTORS) {
            this.sliders[key] = document.getElementById(key);
        }

        // Cache output elements
        this.outcomeLabel = document.getElementById('outcomeLabel');
        this.probabilityValue = document.getElementById('probabilityValue');
        this.probabilityRing = document.getElementById('probabilityRing');
        this.narrativeContent = document.getElementById('narrativeContent');
        this.currentYearText = document.getElementById('currentYearText');
        this.yearTabs = document.querySelectorAll('.year-tab');

        // Cache impact preview elements
        this.impactPreviews = {};
        for (const key in FACTORS) {
            this.impactPreviews[key] = document.getElementById(`impact-${key}`);
        }

        // Cache summary icons
        this.summaryIcons = {};
        for (const key in FACTORS) {
            this.summaryIcons[key] = document.getElementById(`icon-${key}`);
        }
    }

    bindEvents() {
        // Slider events
        for (const key in this.sliders) {
            if (this.sliders[key]) {
                this.sliders[key].addEventListener('input', () => this.update());
                
                // Highlight connection on hover
                this.sliders[key].addEventListener('mouseenter', () => this.highlightConnection(key));
                this.sliders[key].addEventListener('mouseleave', () => this.clearConnections());
            }
        }

        // Year tab events
        this.yearTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const year = parseInt(e.target.dataset.year);
                this.selectYear(year);
            });
        });

        // Highlight hover events
        document.querySelectorAll('.highlight').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const factor = e.target.dataset.factor;
                if (factor) this.highlightFactor(factor);
            });
            el.addEventListener('mouseleave', () => this.clearHighlights());
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
            // Invert certain factors where low = good
            let adjustedValue = values[key];
            if (key === 'autonomy' || key === 'speed') {
                adjustedValue = 100 - adjustedValue; // Lower autonomy/speed = better
            }
            if (key === 'privacy') {
                adjustedValue = 100 - adjustedValue; // Strict privacy = better
            }
            if (key === 'environment') {
                adjustedValue = 100 - adjustedValue; // Sustainable = better
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

    getImpactLevel(value) {
        if (value < 35) return 'low';
        if (value < 65) return 'mid';
        return 'high';
    }

    updateImpactPreviews() {
        const values = this.getValues();
        
        for (const key in FACTORS) {
            const level = this.getImpactLevel(values[key]);
            const preview = FACTORS[key].impactPreviews[level];
            
            if (this.impactPreviews[key]) {
                this.impactPreviews[key].textContent = preview;
            }
        }
    }

    updateSummaryIcons() {
        const values = this.getValues();
        
        for (const key in FACTORS) {
            const level = this.getImpactLevel(values[key]);
            const iconData = FACTORS[key].summaryIcons[level];
            
            if (this.summaryIcons[key]) {
                const labelEl = this.summaryIcons[key].querySelector('span');
                if (labelEl) {
                    labelEl.textContent = iconData.label;
                }
            }
        }
    }

    generateNarrative() {
        const values = this.getValues();
        const score = this.calculateScore();
        const outcome = this.getOutcome(score);
        
        // Build narrative from templates
        let narrativeHTML = '';
        
        // Introduction based on year
        const intro = YEAR_INTROS[this.selectedYear];
        const progressDescriptor = this.getProgressDescriptor(score);
        narrativeHTML += `<p>${intro} ${progressDescriptor}.</p>`;
        
        // Factor-specific paragraphs
        for (const key of ['autonomy', 'economy', 'privacy', 'cooperation', 'environment']) {
            const level = this.getImpactLevel(values[key]);
            const template = FACTORS[key].narrativeTemplates[level];
            const processedTemplate = template.replace(/<highlight>/g, `<span class="highlight" data-factor="${key}">`).replace(/<\/highlight>/g, '</span>');
            narrativeHTML += `<p>${processedTemplate}</p>`;
        }
        
        // Conclusion based on outcome
        narrativeHTML += `<p class="narrative-conclusion">${NARRATIVE_CONCLUSIONS[outcome.key]}</p>`;
        
        return narrativeHTML;
    }

    getProgressDescriptor(score) {
        if (score < 20) return "catastrophic decline and widespread suffering";
        if (score < 40) return "concerning decline with growing instability";
        if (score < 60) return "moderate but deliberate progress";
        if (score < 80) return "promising advancement toward human flourishing";
        return "remarkable progress toward an abundant future";
    }

    updateProbabilityRing(score) {
        if (!this.probabilityRing) return;
        
        // Calculate stroke-dashoffset (283 is full circumference, 0 is full fill)
        const circumference = 283;
        const offset = circumference - (score / 100) * circumference;
        this.probabilityRing.style.strokeDashoffset = offset;
    }

    selectYear(year) {
        this.selectedYear = year;
        
        // Update tab states
        this.yearTabs.forEach(tab => {
            tab.classList.toggle('active', parseInt(tab.dataset.year) === year);
        });
        
        // Update display
        if (this.currentYearText) {
            this.currentYearText.textContent = year;
        }
        
        // Regenerate narrative
        this.updateNarrative();
    }

    updateNarrative() {
        if (this.narrativeContent) {
            this.narrativeContent.innerHTML = this.generateNarrative();
            
            // Re-bind highlight events
            this.narrativeContent.querySelectorAll('.highlight').forEach(el => {
                el.addEventListener('mouseenter', (e) => {
                    const factor = e.target.dataset.factor;
                    if (factor) this.highlightFactor(factor);
                });
                el.addEventListener('mouseleave', () => this.clearHighlights());
            });
        }
    }

    highlightFactor(factorKey) {
        // Highlight the factor card
        const card = document.querySelector(`.factor-card[data-factor="${factorKey}"]`);
        if (card) {
            card.style.borderColor = 'var(--accent)';
            card.style.boxShadow = '0 0 20px rgba(94, 234, 212, 0.2)';
        }
        
        // Highlight the narrative text
        const highlight = document.querySelector(`.highlight[data-factor="${factorKey}"]`);
        if (highlight) {
            highlight.classList.add('active');
        }
    }

    clearHighlights() {
        // Clear card highlights
        document.querySelectorAll('.factor-card').forEach(card => {
            card.style.borderColor = '';
            card.style.boxShadow = '';
        });
        
        // Clear text highlights
        document.querySelectorAll('.highlight').forEach(el => {
            el.classList.remove('active');
        });
    }

    highlightConnection(factorKey) {
        this.highlightFactor(factorKey);
    }

    clearConnections() {
        this.clearHighlights();
    }

    update() {
        const score = this.calculateScore();
        const outcome = this.getOutcome(score);
        
        // Update outcome label
        if (this.outcomeLabel) {
            this.outcomeLabel.textContent = outcome.label;
            this.outcomeLabel.style.color = outcome.color;
        }
        
        // Update probability
        if (this.probabilityValue) {
            this.probabilityValue.textContent = `${score}%`;
        }
        this.updateProbabilityRing(score);
        
        // Update impact previews
        this.updateImpactPreviews();
        
        // Update summary icons
        this.updateSummaryIcons();
        
        // Update narrative
        this.updateNarrative();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new NarrativeEngine();
});
