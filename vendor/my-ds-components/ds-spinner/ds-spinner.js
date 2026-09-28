var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
/** @tagname ds-spinner */
let DsSpinner = class DsSpinner extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'md';
        this.appearance = 'inherit';
        /** Accessible label announced to screen readers. */
        this.label = 'Loading';
    }
    // Stroke values in Figma px converted to viewBox user units (stroke_px × 24 / element_px).
    // All sizes yield ~2.24 user units, keeping the stroke visually proportional.
    get _strokeWidth() {
        const map = {
            xs: 1.49 * 24 / 16, // 2.235 — same as sm
            sm: 1.49 * 24 / 16, // 2.235
            md: 2.24 * 24 / 24, // 2.24
            lg: 4.48 * 24 / 48, // 2.24
            xl: 8.96 * 24 / 96, // 2.24
        };
        return map[this.size] ?? map.md;
    }
    render() {
        const sw = this._strokeWidth;
        return html `
      <svg
        class="spinner"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="status"
        aria-label=${this.label}
        aria-live="polite"
      >
        ${svg `<circle class="track" cx="12" cy="12" r="9" stroke-width=${sw} />`}
        ${svg `<circle class="arc" cx="12" cy="12" r="9" stroke-width=${sw} />`}
      </svg>
    `;
    }
};
DsSpinner.styles = [
    resetStyles,
    typographyBaseStyles,
    css `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      /* ── Size variants ─────────────────────────────────────────────────── */
      :host([size='xs']) { --_spinner-size: 12px; }
      :host([size='sm']) { --_spinner-size: 16px; }
      :host([size='md']),
      :host(:not([size])) { --_spinner-size: 24px; }
      :host([size='lg']) { --_spinner-size: 48px; }
      :host([size='xl']) { --_spinner-size: 96px; }

      /* ── Appearance variants ───────────────────────────────────────────── */
      :host([appearance='inherit']),
      :host(:not([appearance])) {
        --_spinner-track-color: var(--ds-background-neutral-default);
        --_spinner-arc-color: currentColor;
      }
      :host([appearance='inverted']) {
        --_spinner-track-color: var(--ds-color-default-neutral-white-12);
        --_spinner-arc-color: var(--ds-color-default-neutral-white);
      }

      /* ── SVG wrapper ───────────────────────────────────────────────────── */
      .spinner {
        display: block;
        width: var(--_spinner-size);
        height: var(--_spinner-size);
        animation: ds-spin 0.8s linear infinite;
        will-change: transform;
      }

      /* ── Track ring ────────────────────────────────────────────────────── */
      .track {
        fill: none;
        stroke: var(--_spinner-track-color);
        stroke-linecap: round;
      }

      /* ── Animated arc ──────────────────────────────────────────────────── */
      .arc {
        fill: none;
        stroke: var(--_spinner-arc-color);
        stroke-linecap: round;
        /*
         * C = 2πr = 56.549 (r=9). Arc grows from 4.2% (2.375) to 25% (14.137).
         * dasharray fixes the max arc length; dashoffset hides the tail to show
         * only 2.375 at rest (offset = 14.137 - 2.375 = 11.762).
         * Animating offset 11.762→0→11.762 makes the arc grow and shrink each
         * rotation, creating the Atlassian-style stretchy sweep.
         */
        stroke-dasharray: 14.137 56.549;
        stroke-dashoffset: 11.762;
        animation: ds-arc-grow 0.8s ease-in-out infinite;
      }

      @keyframes ds-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      @keyframes ds-arc-grow {
        0%, 100% { stroke-dashoffset: 11.762; }
        50%      { stroke-dashoffset: 0; }
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsSpinner.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsSpinner.prototype, "appearance", void 0);
__decorate([
    property({ type: String })
], DsSpinner.prototype, "label", void 0);
DsSpinner = __decorate([
    customElement('ds-spinner')
], DsSpinner);
export { DsSpinner };
//# sourceMappingURL=ds-spinner.js.map