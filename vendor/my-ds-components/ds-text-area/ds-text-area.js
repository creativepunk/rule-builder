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
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
/** @tagname ds-text-area */
let DsTextArea = class DsTextArea extends LitElement {
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
        /** Helper text shown below the control in the default state. */
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
        /** Makes the textarea read-only. */
        this.readonly = false;
        /** Maximum character length; also drives the `n/max` count display. */
        this.maxlength = null;
        /** Shows a character count in the footer row alongside the message. */
        this.hasCount = false;
        /** Controls the resize handle. `none` disables it (default). */
        this.resize = 'none';
        this._charCount = 0;
    }
    _onInput(e) {
        const ta = e.target;
        this.value = ta.value;
        this._charCount = ta.value.length;
        dispatch(this, 'ds-input', { value: ta.value, originalEvent: e });
    }
    _onChange(e) {
        const ta = e.target;
        this.value = ta.value;
        dispatch(this, 'ds-change', { value: ta.value });
    }
    _onFocus(e) {
        dispatch(this, 'ds-focus', { originalEvent: e });
    }
    _onBlur(e) {
        dispatch(this, 'ds-blur', { originalEvent: e });
    }
    _countLabel() {
        return this.maxlength !== null
            ? `${this._charCount}/${this.maxlength}`
            : `${this._charCount}`;
    }
    render() {
        const isInline = this.type === 'inline';
        // Resolve message state
        let msgType = 'helper';
        let msgText = '';
        let hasMessage = false;
        if (this.invalid) {
            msgType = 'error';
            msgText = this.errorMessage;
            hasMessage = true;
        }
        else if (this.valid && !this.invalid) {
            msgType = 'success';
            msgText = this.successMessage;
            hasMessage = true;
        }
        else if (this.helperText) {
            msgType = 'helper';
            msgText = this.helperText;
            hasMessage = true;
        }
        const labelEl = this.label
            ? html `
          <ds-form-label
            class="label-el"
            label=${this.label}
            ?is-required=${this.isRequired}
            type=${isInline ? 'inline' : 'stacked'}
            style=${isInline
                ? '--ds-form-label-padding-top: var(--ds-spacing-spacing-02);'
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
        const countEl = this.hasCount
            ? html `<span class="char-count text-helper-helper-regular">${this._countLabel()}</span>`
            : nothing;
        const footerEl = hasMessage || this.hasCount
            ? html `<div class="footer">${messageEl}${countEl}</div>`
            : nothing;
        const fieldEl = html `
      <div class="field">
        <div class="trigger" part="trigger">
          <textarea
            class="textarea text-regular-body-md"
            .value=${live(this.value)}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            maxlength=${this.maxlength !== null ? this.maxlength : nothing}
            aria-label=${this.label || 'Text area'}
            aria-invalid=${this.invalid ? 'true' : nothing}
            aria-multiline="true"
            @input=${this._onInput}
            @change=${this._onChange}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          ></textarea>
        </div>
        ${footerEl}
      </div>
    `;
        return html `${labelEl}${fieldEl}`;
    }
};
DsTextArea.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: block;
      }

      /* ── Inline layout ────────────────────────────────────────────── */
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

      /* ── Field wrapper ─────────────────────────────────────────────── */
      .field {
        display: flex;
        flex-direction: column;
      }

      /* ── Trigger wrapper ──────────────────────────────────────────── */
      .trigger {
        display: flex;
        align-items: flex-start;
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

      /* ── Textarea ─────────────────────────────────────────────────── */
      .textarea {
        flex: 1;
        min-width: 0;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        /* Default: no resize — grows via field-sizing */
        resize: none;
        overflow: auto;
        /* Grows with content between min and max */
        min-height: 56px;
        max-height: 192px;
        field-sizing: content;
        color: var(--ds-text-text-default);
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
      }

      .textarea::placeholder {
        color: var(--ds-text-text-subtlest);
      }

      /* ── Resize variants ──────────────────────────────────────────────
         Vertical: straightforward — the host stays block/width:100%,
         only the height axis moves.

         Horizontal / both: width:100% on the textarea (and flex:1) stops
         the browser from applying the horizontal drag delta. The fix is to
         make the host inline-block so it shrink-wraps, the field
         inline-flex so the footer tracks the trigger width, and the
         trigger width:auto so it follows the textarea. overflow:hidden
         (never visible) clips any accidental overflow instead of spilling
         content out of the component.
      ──────────────────────────────────────────────────────────────────── */

      /* Vertical ─────────────────────────────────────────────────────── */
      :host([resize='vertical']) .textarea {
        resize: vertical;
        max-height: none;
      }

      /* Horizontal ───────────────────────────────────────────────────── */
      :host([resize='horizontal']) {
        display: inline-block;
      }

      :host([resize='horizontal']) .field {
        display: inline-flex;
      }

      :host([resize='horizontal']) .trigger {
        width: auto;
        overflow: hidden;
      }

      :host([resize='horizontal']) .textarea {
        resize: horizontal;
        flex: none;
        width: 200px;
        min-width: 100px;
        min-height: 56px;
        max-height: 56px;
        field-sizing: fixed;
      }

      /* Both axes ────────────────────────────────────────────────────── */
      :host([resize='both']) {
        display: inline-block;
      }

      :host([resize='both']) .field {
        display: inline-flex;
      }

      :host([resize='both']) .trigger {
        width: auto;
        overflow: hidden;
      }

      :host([resize='both']) .textarea {
        resize: both;
        flex: none;
        width: 200px;
        min-width: 100px;
        max-height: none;
        field-sizing: fixed;
      }

      /* ── Focus: applied to .trigger when textarea inside is focused ─ */
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

      /* Focused overrides validation border only when not in error/success */
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

      :host([disabled]) .textarea {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .textarea::placeholder {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .label-el {
        color: var(--ds-text-text-disabled);
      }

      /* ── Readonly ─────────────────────────────────────────────────── */
      :host([readonly]) .trigger {
        border-bottom-color: var(--ds-border-border-default);
      }

      :host([readonly]) .textarea {
        cursor: default;
        resize: none;
      }

      /* ── Footer: message + optional char count in same row ─────────── */
      .footer {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        width: 100%;
      }

      .footer ds-form-message {
        flex: 1 0 0;
        min-width: 1px;
      }

      .char-count {
        flex-shrink: 0;
        padding-top: var(--ds-spacing-spacing-04);
        padding-left: var(--ds-spacing-spacing-04);
        color: var(--ds-text-text-subtle);
        white-space: nowrap;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsTextArea.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsTextArea.prototype, "isRequired", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextArea.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextArea.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextArea.prototype, "placeholder", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsTextArea.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-message' })
], DsTextArea.prototype, "errorMessage", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'success-message' })
], DsTextArea.prototype, "successMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextArea.prototype, "invalid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextArea.prototype, "valid", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextArea.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsTextArea.prototype, "readonly", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsTextArea.prototype, "maxlength", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-count' })
], DsTextArea.prototype, "hasCount", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsTextArea.prototype, "resize", void 0);
__decorate([
    state()
], DsTextArea.prototype, "_charCount", void 0);
DsTextArea = __decorate([
    customElement('ds-text-area')
], DsTextArea);
export { DsTextArea };
//# sourceMappingURL=ds-text-area.js.map