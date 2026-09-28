var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
/** @tagname ds-field-input */
let DsFieldInput = class DsFieldInput extends LitElement {
    constructor() {
        super(...arguments);
        /** Label text above / beside the control. */
        this.label = '';
        /** Appends a red asterisk to the label. */
        this.isRequired = false;
        /** `default` — stacked label above; `inline` — 180px label to the left. */
        this.type = 'default';
        /** Helper text shown below the control. */
        this.helperText = '';
        /** Error message shown when invalid=true. */
        this.errorMessage = 'Error message';
        /** Success message shown when valid=true. */
        this.successMessage = 'Success message';
        /** Triggers error styling + shows error message. */
        this.invalid = false;
        /** Triggers success styling + shows success message. */
        this.valid = false;
        /** Passed through to aria-disabled on the wrapper (no visual effect here). */
        this.disabled = false;
        /** Passed through for aria-readonly on the wrapper. */
        this.readonly = false;
    }
    _messageType() {
        if (this.invalid)
            return 'error';
        if (this.valid)
            return 'success';
        return 'helper';
    }
    _messageText() {
        if (this.invalid)
            return this.errorMessage;
        if (this.valid)
            return this.successMessage;
        return this.helperText;
    }
    render() {
        const isInline = this.type === 'inline';
        const hasMessage = this.helperText || this.invalid || this.valid;
        const msgType = this._messageType();
        const msgText = this._messageText();
        const labelEl = this.label
            ? html `
          <ds-form-label
            label=${this.label}
            ?is-required=${this.isRequired}
            type=${isInline ? 'inline' : 'stacked'}
            style=${isInline
                ? '--ds-form-label-padding-top: var(--ds-spacing-spacing-04);'
                : nothing}
          ></ds-form-label>
        `
            : nothing;
        const messageEl = hasMessage
            ? html `
          <ds-form-message
            type=${msgType}
            helper-text=${msgType === 'helper' ? msgText : ''}
            error-text=${msgType === 'error' ? msgText : ''}
            success-text=${msgType === 'success' ? msgText : ''}
          ></ds-form-message>
        `
            : nothing;
        return html `
      ${labelEl}
      <div class="field">
        <slot></slot>
        ${messageEl}
      </div>
    `;
    }
};
DsFieldInput.styles = [
    resetStyles,
    css `
      :host {
        display: block;
      }

      /* ── Inline layout ─────────────────────────────────────────── */
      :host([type='inline']) {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        min-width: 420px;
      }

      :host([type='inline']) .field {
        flex: 1;
        min-width: 0;
      }

      /* ── Field wrapper ─────────────────────────────────────────── */
      .field {
        display: flex;
        flex-direction: column;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsFieldInput.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsFieldInput.prototype, "isRequired", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsFieldInput.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsFieldInput.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-message' })
], DsFieldInput.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'success-message' })
], DsFieldInput.prototype, "successMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsFieldInput.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsFieldInput.prototype, "valid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsFieldInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsFieldInput.prototype, "readonly", void 0);
DsFieldInput = __decorate([
    customElement('ds-field-input')
], DsFieldInput);
export { DsFieldInput };
//# sourceMappingURL=ds-field-input.js.map