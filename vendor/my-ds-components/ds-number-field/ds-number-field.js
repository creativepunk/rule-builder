var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { resetStyles, typographyBaseStyles, typographyStyles, } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-field-input/ds-field-input.js';
const MINUS_SVG = html `<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M3 8H13"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
</svg>`;
const PLUS_SVG = html `<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M8 3V13M3 8H13"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
</svg>`;
/** @tagname ds-number-field */
let DsNumberField = class DsNumberField extends LitElement {
    constructor() {
        super(...arguments);
        /** Label text above / beside the control. */
        this.label = '';
        /** Appends a red asterisk to the label. */
        this.isRequired = false;
        /** `default` — stacked label above; `inline` — 180px label to the left. */
        this.type = 'default';
        /** Current numeric value. */
        this.value = null;
        /** Minimum allowed value. */
        this.min = null;
        /** Maximum allowed value. */
        this.max = null;
        /** Amount to increment/decrement per step. */
        this.step = 1;
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
        /** When true, the decrement button and keyboard entry can go below zero. */
        this.allowNegative = false;
        this._inputValue = '';
        this._rangeError = '';
    }
    willUpdate(changed) {
        if (changed.has('value')) {
            this._inputValue = this.value !== null ? String(this.value) : '';
            // Clear stale range error when value is set externally and is now in range
            if (this._rangeError && (this.value === null || !this._buildRangeError(this.value))) {
                this._rangeError = '';
            }
        }
    }
    // When allowNegative=false the implicit floor is 0; an explicit min overrides only upward.
    get _effectiveMin() {
        if (!this.allowNegative) {
            return this.min !== null ? Math.max(0, this.min) : 0;
        }
        return this.min;
    }
    _clamp(n) {
        let v = n;
        const effMin = this._effectiveMin;
        if (effMin !== null)
            v = Math.max(effMin, v);
        if (this.max !== null)
            v = Math.min(this.max, v);
        return v;
    }
    _buildRangeError(n) {
        const effMin = this._effectiveMin;
        const tooLow = effMin !== null && n < effMin;
        const tooHigh = this.max !== null && n > this.max;
        if (!tooLow && !tooHigh)
            return '';
        if (effMin !== null && this.max !== null)
            return `Number should be between ${effMin} and ${this.max}`;
        if (tooLow)
            return `Number should be at least ${effMin}`;
        return `Number should be at most ${this.max}`;
    }
    _decrement() {
        if (this.disabled || this.readonly)
            return;
        const current = this.value ?? 0;
        const next = this._clamp(current - this.step);
        this._commit(next);
    }
    _increment() {
        if (this.disabled || this.readonly)
            return;
        const current = this.value ?? 0;
        const next = this._clamp(current + this.step);
        this._commit(next);
    }
    _commit(next) {
        const prev = this.value;
        this.value = next;
        this._inputValue = String(next);
        this._rangeError = '';
        if (prev !== next) {
            dispatch(this, 'ds-change', { value: next });
        }
    }
    // Strip any character that isn't a digit (or a leading minus when allowNegative).
    _filterRaw(raw) {
        if (this.allowNegative) {
            const sign = raw.startsWith('-') ? '-' : '';
            return sign + raw.replace(/[^\d]/g, '');
        }
        return raw.replace(/[^\d]/g, '');
    }
    _onInput(e) {
        const input = e.target;
        const raw = input.value;
        const filtered = this._filterRaw(raw);
        if (filtered !== raw) {
            // Restore cursor, accounting for removed characters
            const removed = raw.length - filtered.length;
            const cursor = Math.max(0, (input.selectionStart ?? 0) - removed);
            this._inputValue = filtered;
            this.requestUpdate();
            this.updateComplete.then(() => {
                const el = this.shadowRoot?.querySelector('.input');
                el?.setSelectionRange(cursor, cursor);
            });
        }
        else {
            this._inputValue = filtered;
        }
        // Clear any existing range error while the user is actively editing
        this._rangeError = '';
        if (filtered === '') {
            this.value = null;
        }
        else if (filtered !== '-') {
            // '-' alone is not yet a valid number — wait for the digit
            const n = Number(filtered);
            if (!Number.isNaN(n)) {
                this.value = n;
                dispatch(this, 'ds-input', { value: filtered, originalEvent: e });
            }
        }
    }
    _onBlur(e) {
        if (this.value !== null) {
            const err = this._buildRangeError(this.value);
            this._rangeError = err;
            if (!err)
                this._inputValue = String(this.value);
        }
        else {
            this._rangeError = '';
            this._inputValue = '';
        }
        dispatch(this, 'ds-blur', { originalEvent: e });
    }
    _onFocus(e) {
        dispatch(this, 'ds-focus', { originalEvent: e });
    }
    _onKeydown(e) {
        if (this.disabled || this.readonly)
            return;
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this._increment();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this._decrement();
            return;
        }
        // Always allow control sequences and navigation keys
        if (e.ctrlKey || e.metaKey)
            return;
        const nav = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Escape', 'Home', 'End', 'Enter'];
        if (nav.includes(e.key))
            return;
        // Allow digits
        if (/^\d$/.test(e.key))
            return;
        // Allow a leading minus only when allowNegative, cursor is at 0, no minus already present
        if (e.key === '-' && this.allowNegative) {
            const input = this.shadowRoot?.querySelector('.input');
            if (input && input.selectionStart === 0 && !this._inputValue.startsWith('-'))
                return;
        }
        // Block everything else (letters, symbols, etc.)
        e.preventDefault();
    }
    _onPaste(e) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text') ?? '';
        const input = e.target;
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const spliced = this._inputValue.slice(0, start) + text + this._inputValue.slice(end);
        const filtered = this._filterRaw(spliced);
        const n = Number(filtered);
        if (filtered !== '' && !Number.isNaN(n)) {
            this._inputValue = filtered;
            this.value = n;
            this._rangeError = '';
        }
        else if (filtered === '') {
            this._inputValue = '';
            this.value = null;
        }
        this.requestUpdate();
    }
    get _decrementDisabled() {
        const effMin = this._effectiveMin;
        return this.disabled || (effMin !== null && (this.value ?? 0) <= effMin);
    }
    get _incrementDisabled() {
        return this.disabled || (this.max !== null && (this.value ?? 0) >= this.max);
    }
    render() {
        const isInvalid = this.invalid || !!this._rangeError;
        const effectiveError = this._rangeError || this.errorMessage;
        return html `
      <ds-field-input
        label=${this.label || nothing}
        ?is-required=${this.isRequired}
        type=${this.type}
        helper-text=${!isInvalid && !this.valid ? (this.helperText || nothing) : nothing}
        error-message=${effectiveError}
        success-message=${this.valid ? this.successMessage : nothing}
        ?invalid=${isInvalid}
        ?valid=${this.valid && !isInvalid}
        ?disabled=${this.disabled}
      >
        <div class="trigger" part="trigger">
          <input
            class="input text-regular-mono-body-md"
            type="text"
            inputmode="numeric"
            .value=${live(this._inputValue)}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            aria-label=${this.label || 'Number field'}
            aria-invalid=${isInvalid ? 'true' : nothing}
            @input=${this._onInput}
            @blur=${this._onBlur}
            @focus=${this._onFocus}
            @keydown=${this._onKeydown}
            @paste=${this._onPaste}
          />
          <button
            class="stepper-btn"
            type="button"
            part="decrement"
            aria-label="Decrement"
            ?disabled=${this._decrementDisabled}
            @click=${this._decrement}
          >
            ${MINUS_SVG}
          </button>
          <div class="stepper-divider" aria-hidden="true"></div>
          <button
            class="stepper-btn"
            type="button"
            part="increment"
            aria-label="Increment"
            ?disabled=${this._incrementDisabled}
            @click=${this._increment}
          >
            ${PLUS_SVG}
          </button>
        </div>
      </ds-field-input>
    `;
    }
};
DsNumberField.styles = [
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
        gap: var(--ds-spacing-spacing-03); /* 6px */
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
        font-family: var(--ds-typography-cozy-regular-mono-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-mono-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-mono-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-mono-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-mono-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'ss03' 1, 'zero' 1;
        /* hide native spin buttons */
        -moz-appearance: textfield;
        appearance: textfield;
      }

      .input::-webkit-inner-spin-button,
      .input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
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

      :host([disabled]) .stepper-btn {
        color: var(--ds-icon-icon-disabled);
      }

      /* ── Divider between steppers ─────────────────────────────────── */
      .stepper-divider {
        width: 1px;
        height: 12px;
        background: var(--ds-border-border-bold);
        flex-shrink: 0;
      }

      :host([disabled]) .stepper-divider {
        background: var(--ds-border-border-disabled);
      }

      /* ── Stepper buttons ──────────────────────────────────────────── */
      .stepper-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        padding: 2px;
        border: none;
        background: transparent;
        border-radius: var(--ds-radius-semantic-radius-full, 9999px);
        color: var(--ds-icon-icon-default);
        cursor: pointer;
        flex-shrink: 0;
        outline: none;
        transition: background 80ms ease;
      }

      .stepper-btn:hover {
        background: var(--ds-background-neutral-subtle-hovered, rgba(255, 255, 255, 0.08));
      }

      .stepper-btn:active {
        background: var(--ds-background-neutral-subtle-pressed, rgba(255, 255, 255, 0.05));
      }

      .stepper-btn:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 1px;
      }

      .stepper-btn:focus:not(:focus-visible) {
        outline: none;
      }

      .stepper-btn[disabled] {
        color: var(--ds-icon-icon-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsNumberField.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsNumberField.prototype, "isRequired", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsNumberField.prototype, "type", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsNumberField.prototype, "value", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsNumberField.prototype, "min", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsNumberField.prototype, "max", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsNumberField.prototype, "step", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsNumberField.prototype, "placeholder", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsNumberField.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-message' })
], DsNumberField.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'success-message' })
], DsNumberField.prototype, "successMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsNumberField.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsNumberField.prototype, "valid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsNumberField.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsNumberField.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'allow-negative' })
], DsNumberField.prototype, "allowNegative", void 0);
__decorate([
    state()
], DsNumberField.prototype, "_inputValue", void 0);
__decorate([
    state()
], DsNumberField.prototype, "_rangeError", void 0);
DsNumberField = __decorate([
    customElement('ds-number-field')
], DsNumberField);
export { DsNumberField };
//# sourceMappingURL=ds-number-field.js.map