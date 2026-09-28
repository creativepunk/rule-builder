var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { resetStyles, typographyBaseStyles, typographyStyles, } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-field-input/ds-field-input.js';
/** @tagname ds-text-field */
let DsTextField = class DsTextField extends LitElement {
    constructor() {
        super(...arguments);
        /** Label text above / beside the control. */
        this.label = '';
        /** Appends a red asterisk to the label. */
        this.isRequired = false;
        /** `stacked` — label above; `inline` — 180px label to the left. */
        this.type = 'stacked';
        /** Current string value. */
        this.value = '';
        /** Placeholder text shown when no value is set. */
        this.placeholder = '';
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
        /** Disables the entire control. */
        this.disabled = false;
        /** Makes the input read-only. */
        this.readonly = false;
        /** HTML input type — text, email, password, url, search, tel, etc. */
        this.inputType = 'text';
        /** Maximum character length. */
        this.maxlength = null;
        /** Minimum character length. */
        this.minlength = null;
        /** Autocomplete hint for the browser. */
        this.autocomplete = '';
    }
    _onInput(e) {
        const input = e.target;
        this.value = input.value;
        dispatch(this, 'ds-input', { value: input.value, originalEvent: e });
    }
    _onChange(e) {
        const input = e.target;
        this.value = input.value;
        dispatch(this, 'ds-change', { value: input.value });
    }
    _onFocus(e) {
        dispatch(this, 'ds-focus', { originalEvent: e });
    }
    _onBlur(e) {
        dispatch(this, 'ds-blur', { originalEvent: e });
    }
    render() {
        return html `
      <ds-field-input
        label=${this.label || nothing}
        ?is-required=${this.isRequired}
        type=${this.type}
        helper-text=${!this.invalid && !this.valid ? (this.helperText || nothing) : nothing}
        error-message=${this.errorMessage}
        success-message=${this.valid ? this.successMessage : nothing}
        ?invalid=${this.invalid}
        ?valid=${this.valid && !this.invalid}
        ?disabled=${this.disabled}
      >
        <div class="trigger" part="trigger">
          <input
            class="input text-regular-body-md"
            .type=${this.inputType}
            .value=${live(this.value)}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            maxlength=${this.maxlength !== null ? this.maxlength : nothing}
            minlength=${this.minlength !== null ? this.minlength : nothing}
            autocomplete=${this.autocomplete || nothing}
            aria-label=${this.label || 'Text field'}
            aria-invalid=${this.invalid ? 'true' : nothing}
            @input=${this._onInput}
            @change=${this._onChange}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          />
        </div>
      </ds-field-input>
    `;
    }
};
DsTextField.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: block;
      }

      /* ── Trigger wrapper ──────────────────────────────────────────── */
      .trigger {
        display: flex;
        align-items: center;
        height: 32px;
        padding: var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-04); /* 4px 8px */
        background: var(--ds-background-input-default);
        border: none;
        border-bottom: 1px solid var(--ds-border-border-bold);
        width: 100%;
        box-sizing: border-box;
        transition: background 80ms ease;
      }

      .trigger:hover {
        background: var(--ds-background-input-hovered);
        border-bottom-color: var(--ds-border-border-bolder);
      }

      /* ── Input ────────────────────────────────────────────────────── */
      .input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        color: var(--ds-text-text-default);
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
      }

      .input::placeholder {
        color: var(--ds-text-text-subtlest);
      }

      /* ── Focus: applied to .trigger when input inside is focused ─── */
      .trigger:focus-within {
        border-bottom-color: var(--ds-focus-focus);
        background: var(--ds-background-input-default);
        outline: none;
      }

      /* ── Validation states ────────────────────────────────────────── */
      :host([invalid]) .trigger {
        border-bottom-color: var(--ds-border-border-danger);
      }

      :host([valid]) .trigger {
        border-bottom-color: var(--ds-border-border-success);
      }

      /* Focused overrides validation border only if not in error/success */
      :host(:not([invalid]):not([valid])) .trigger:focus-within {
        border-bottom-color: var(--ds-focus-focus);
      }

      /* ── Disabled ─────────────────────────────────────────────────── */
      :host([disabled]) .trigger {
        background: var(--ds-background-input-disabled);
        border-bottom-color: var(--ds-border-border-disabled);
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([disabled]) .input {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .input::placeholder {
        color: var(--ds-text-text-disabled);
      }

      /* ── Readonly ─────────────────────────────────────────────────── */
      :host([readonly]) .trigger {
        border-bottom-color: var(--ds-border-border-default);
      }

      :host([readonly]) .input {
        cursor: default;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsTextField.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsTextField.prototype, "isRequired", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextField.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextField.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextField.prototype, "placeholder", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsTextField.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-message' })
], DsTextField.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'success-message' })
], DsTextField.prototype, "successMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextField.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextField.prototype, "valid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextField.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextField.prototype, "readonly", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'input-type' })
], DsTextField.prototype, "inputType", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsTextField.prototype, "maxlength", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsTextField.prototype, "minlength", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextField.prototype, "autocomplete", void 0);
DsTextField = __decorate([
    customElement('ds-text-field')
], DsTextField);
export { DsTextField };
//# sourceMappingURL=ds-text-field.js.map