var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import '../ds-icon/ds-icon.js';
/** @tagname ds-form-label */
let DsFormLabel = class DsFormLabel extends LitElement {
    constructor() {
        super(...arguments);
        /** Label text. Alternatively use the default slot. */
        this.label = '';
        /** Appends a red asterisk to mark the field as required. */
        this.isRequired = false;
        /** Shows a small info icon after the label text. */
        this.hasInfoTip = false;
        /**
         * stacked — grows to fill the parent container (default).
         * inline  — fixed 180px width, for side-by-side form layouts.
         */
        this.type = 'stacked';
        /** Associates this label with a form control via its id. */
        this.for = '';
    }
    render() {
        const labelContent = this.label ? this.label : html `<slot></slot>`;
        return html `
      <label for=${this.for || nothing}>
        <span class="label-text text-regular-body-sm">${labelContent}</span>${this.isRequired
            ? html `<span class="required-mark text-medium-body-sm" aria-hidden="true">*</span>`
            : nothing}${this.hasInfoTip
            ? html `<span class="info-icon" aria-label="More information"><ds-icon name="info" size="sm"></ds-icon></span>`
            : nothing}
      </label>
    `;
    }
};
DsFormLabel.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      /* ── Stacked (default) ───────────────────────────────────────────────
         Top-left aligned, 8px bottom padding so the field sits below it. */
      :host {
        display: block;
        padding-bottom: var(--ds-spacing-spacing-04); /* 8px */
      }

      /* ── Inline ──────────────────────────────────────────────────────────
         Fixed 180px, center-left aligned. Padding lives on the inner label
         so the host hugs the content height with no extra space.
         --ds-form-label-padding-top lets parent form components override
         the top padding to optically center against their field height:
           checkbox group  → 4px  (default, 24px field, 16px text)
           text field/select → 8px (32px field, 16px text: (32-16)/2 = 8px)
      */
      :host([type='inline']) {
        width: 180px;
        flex-shrink: 0;
        padding-top: var(--ds-form-label-padding-top, var(--ds-spacing-spacing-02)); /* default 4px */
        padding-bottom: 0;
        align-self: flex-start;
      }

      label {
        display: block;
        width: 100%;
        cursor: default;
      }

      /*
       * .label-text and .required-mark are plain inline spans so the * sits
       * exactly 2px after the last character — not the text box edge.
       * The block label container provides the width for text to wrap into.
       */
      .label-text {
        vertical-align: top;
        color: var(--ds-text-text-subtle);
      }

      .required-mark {
        vertical-align: top;
        margin-left: var(--ds-spacing-spacing-01); /* 2px — hugs text end */
        color: var(--ds-text-text-danger);
      }

      .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: top;
        margin-left: var(--ds-spacing-spacing-02); /* 4px gap after text+* */
        color: var(--ds-icon-icon-subtle);
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsFormLabel.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsFormLabel.prototype, "isRequired", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-info-tip' })
], DsFormLabel.prototype, "hasInfoTip", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsFormLabel.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsFormLabel.prototype, "for", void 0);
DsFormLabel = __decorate([
    customElement('ds-form-label')
], DsFormLabel);
export { DsFormLabel };
//# sourceMappingURL=ds-form-label.js.map