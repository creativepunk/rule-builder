var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
/** @tagname ds-radio */
let DsRadio = class DsRadio extends LitElement {
    constructor() {
        super();
        /** Controlled selected state. */
        this.isChecked = false;
        /** Prevents interaction and dims the control. */
        this.isDisabled = false;
        /** Prevents interaction; retains opacity but shows a read-only appearance. */
        this.isReadOnly = false;
        /** Renders the border in danger color. */
        this.hasError = false;
        /** Appends a red asterisk after the label. */
        this.isRequired = false;
        /** Label text. Alternatively, use the default slot. */
        this.label = '';
        /** Optional helper/description text rendered beneath the label. */
        this.description = '';
        /** Form field name — should match across all radios in a group. */
        this.name = '';
        /** Form field value submitted when selected. */
        this.value = '';
        /** ID forwarded to the native input; useful for external <label for="..."> or aria-describedby. */
        this.inputId = '';
        /** Tooltip set on the <label> element. */
        this.title = '';
        this._hasDefaultSlot = false;
        this._onDefaultSlotChange = (e) => {
            const slot = e.target;
            this._hasDefaultSlot = slot.assignedNodes({ flatten: true }).length > 0;
            this.requestUpdate();
        };
        this._handleChange = (e) => {
            if (this.isDisabled || this.isReadOnly)
                return;
            const input = e.target;
            this.isChecked = input.checked;
            this._internals.setFormValue(this.isChecked ? this.value : null);
            dispatch(this, 'ds-radio-change', { value: this.value, originalEvent: e });
        };
        this._handleKeyDown = (e) => {
            if (this.isDisabled || this.isReadOnly)
                return;
            if (e.key === ' ' && !this.isChecked) {
                e.preventDefault();
                this.isChecked = true;
                this._internals.setFormValue(this.value);
                dispatch(this, 'ds-radio-change', { value: this.value, originalEvent: e });
            }
        };
        this._internals = this.attachInternals();
    }
    render() {
        const showLabelArea = this.label || this._hasDefaultSlot || this.description;
        return html `
      <label title=${this.title || nothing}>
        <span class="radio-wrap">
          <input
            type="radio"
            id=${this.inputId || nothing}
            .checked=${this.isChecked}
            ?disabled=${this.isDisabled}
            ?readonly=${this.isReadOnly}
            name=${this.name || nothing}
            value=${this.value || nothing}
            aria-checked=${this.isChecked ? 'true' : 'false'}
            aria-disabled=${this.isDisabled ? 'true' : nothing}
            aria-readonly=${this.isReadOnly ? 'true' : nothing}
            @change=${this._handleChange}
            @keydown=${this._handleKeyDown}
          />
          <span class="circle">
            <span class="dot"></span>
          </span>
          <span class="focus-ring"></span>
        </span>

        ${showLabelArea
            ? html `
              <span class="label-area">
                <span class="value-row">
                  <span class="label-text text-regular-body-md">
                    ${this.label
                ? this.label
                : html `<slot @slotchange=${this._onDefaultSlotChange}></slot>`}
                  </span>
                  ${this.isRequired
                ? html `<span class="required-mark text-medium-body-md" aria-hidden="true">*</span>`
                : nothing}
                </span>
                ${this.description
                ? html `<span class="description text-helper-helper-regular">${this.description}</span>`
                : nothing}
              </span>
            `
            : nothing}
      </label>
    `;
    }
};
DsRadio.formAssociated = true;
DsRadio.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        position: relative;
      }

      :host([is-disabled]) {
        pointer-events: none;
      }

      :host([is-read-only]) {
        pointer-events: none;
      }

      /* ── Clickable row (circle + label) ─────────────────────────────────────── */
      label {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-02); /* 4px between circle and label text */
        cursor: pointer;
      }

      :host([is-disabled]) label {
        cursor: not-allowed;
      }

      :host([is-read-only]) label {
        cursor: default;
      }

      /* ── Touch target wrapper ────────────────────────────────────────────────── */
      .radio-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        padding: 1px;
      }

      /* ── Native input (visually hidden, used for form association) ────────── */
      input[type='radio'] {
        position: absolute;
        inset: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        cursor: pointer;
        z-index: 1;
      }

      :host([is-disabled]) input[type='radio'] {
        cursor: not-allowed;
      }

      /* ── Visual circle ──────────────────────────────────────────────────────── */
      .circle {
        position: relative;
        width: 14px;
        height: 14px;
        border-radius: var(--ds-radius-semantic-radius-pill); /* pill = full circle */
        flex-shrink: 0;
        transition:
          background-color 100ms ease,
          box-shadow 100ms ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* Default / unselected */
      .circle {
        background: var(--ds-background-input-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Hover */
      :host(:not([is-disabled]):not([is-read-only])) input:hover ~ .circle,
      :host(:not([is-disabled]):not([is-read-only])):hover .circle {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Active / pressed */
      :host(:not([is-disabled]):not([is-read-only])) input:active ~ .circle {
        background: var(--ds-background-input-pressed);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bolder);
      }

      /* Selected */
      :host([is-checked]) .circle {
        background: var(--ds-color-default-neutral-white);
        box-shadow: none;
      }

      :host([is-checked]:not([is-disabled]):not([is-read-only])) input:hover ~ .circle,
      :host([is-checked]:not([is-disabled]):not([is-read-only])):hover .circle {
        background: var(--ds-color-default-gray-10);
        box-shadow: none;
      }

      :host([is-checked]:not([is-disabled]):not([is-read-only])) input:active ~ .circle {
        background: var(--ds-color-default-gray-20);
        box-shadow: none;
      }

      /* Error */
      :host([has-error]) .circle {
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error]:not([is-disabled])) input:hover ~ .circle,
      :host([has-error]:not([is-disabled])):hover .circle {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error][is-checked]) .circle {
        background: var(--ds-color-default-neutral-white);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      :host([has-error][is-checked]:not([is-disabled])) input:hover ~ .circle,
      :host([has-error][is-checked]:not([is-disabled])):hover .circle {
        background: var(--ds-color-default-gray-10);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-danger);
      }

      /* Disabled — unselected */
      :host([is-disabled]) .circle {
        background: var(--ds-background-disabled);
        box-shadow: none;
      }

      /* Disabled — selected */
      :host([is-disabled][is-checked]) .circle {
        background: var(--ds-background-disabled);
        box-shadow: none;
      }

      /* Read-only */
      :host([is-read-only]) .circle {
        background: var(--ds-background-input-default);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default);
      }

      :host([is-read-only][is-checked]) .circle {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default);
      }

      /* ── Inner dot (selected indicator) ─────────────────────────────────────── */
      .dot {
        display: none;
        width: 6px;
        height: 6px;
        border-radius: var(--ds-radius-semantic-radius-pill);
        background: var(--ds-icon-icon-inverse);
        pointer-events: none;
        flex-shrink: 0;
      }

      :host([is-checked]) .dot {
        display: block;
      }

      :host([is-disabled][is-checked]) .dot {
        background: var(--ds-icon-icon-disabled);
      }

      :host([is-read-only][is-checked]) .dot {
        background: var(--ds-icon-icon-subtlest);
      }

      /* ── Focus ring ──────────────────────────────────────────────────────── */
      input:focus-visible ~ .focus-ring {
        display: block;
      }

      .focus-ring {
        display: none;
        position: absolute;
        inset: -1px;
        border-radius: var(--ds-radius-semantic-radius-pill);
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 0;
        pointer-events: none;
      }

      /* ── Label text area ─────────────────────────────────────────────────── */
      .label-area {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-02); /* 4px */
        padding-top: 2px;
        min-height: 24px;
      }

      .value-row {
        display: inline-flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-01); /* 2px */
      }

      .label-text {
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
        color: var(--ds-text-text-default);
        white-space: nowrap;
        max-width: 180px;
        word-break: break-word;
      }

      :host([is-disabled]) .label-text {
        color: var(--ds-text-text-disabled);
      }

      :host([is-read-only]) .label-text {
        color: var(--ds-text-text-subtle);
      }

      .required-mark {
        color: var(--ds-text-text-danger);
      }

      .description {
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
        color: var(--ds-text-text-subtlest);
        max-width: 320px;
        white-space: nowrap;
        word-break: break-word;
      }

      :host([is-disabled]) .description {
        color: var(--ds-text-text-disabled);
      }
    `,
];
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-checked' })
], DsRadio.prototype, "isChecked", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsRadio.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-read-only' })
], DsRadio.prototype, "isReadOnly", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-error' })
], DsRadio.prototype, "hasError", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsRadio.prototype, "isRequired", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadio.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadio.prototype, "description", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadio.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadio.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadio.prototype, "inputId", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadio.prototype, "title", void 0);
__decorate([
    state()
], DsRadio.prototype, "_hasDefaultSlot", void 0);
DsRadio = __decorate([
    customElement('ds-radio')
], DsRadio);
export { DsRadio };
//# sourceMappingURL=ds-radio.js.map