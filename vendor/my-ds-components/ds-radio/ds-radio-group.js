var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
import './ds-radio.js';
/** @tagname ds-radio-group */
let DsRadioGroup = class DsRadioGroup extends LitElement {
    constructor() {
        super(...arguments);
        /** Text label for the whole group. */
        this.label = '';
        /** Appends a red asterisk to the group label. */
        this.isRequired = false;
        /** Shows info tip icon on the group label. */
        this.hasInfoTip = false;
        /** Puts the entire group in an error state. */
        this.hasError = false;
        /** Disables all child radios. */
        this.isDisabled = false;
        /** Makes all child radios read-only. */
        this.isReadOnly = false;
        /** Lays items out horizontally or vertically. */
        this.optionOrientation = 'vertical';
        /** `default` = standard spacing; `inline` = label sits beside the group. */
        this.type = 'stacked';
        /** Helper text shown below the group when there is no error. */
        this.helperText = 'Optional helper text';
        /** Error text shown below the group when hasError is true. */
        this.errorText = 'Field is required';
        /** Automatically checks the first radio if none are already checked. */
        this.defaultFirstSelected = true;
        /** HTML form field name propagated to all child radios. */
        this.name = '';
        this._autoSelectedRadio = null;
        this._onSlotChange = () => {
            this._syncChildren();
        };
        // Native radio mutual-exclusion doesn't cross shadow DOM boundaries,
        // so we enforce single-selection manually here.
        this._onRadioChange = (e) => {
            const selected = e.target;
            this._getRadios().forEach((el) => {
                if (el !== selected)
                    el.isChecked = false;
            });
        };
    }
    _getRadios() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (!slot)
            return [];
        return slot
            .assignedElements({ flatten: true })
            .filter((el) => el.tagName.toLowerCase() === 'ds-radio');
    }
    _syncChildren() {
        const radios = this._getRadios();
        radios.forEach((el) => {
            el.toggleAttribute('has-error', this.hasError);
            el.toggleAttribute('is-disabled', this.isDisabled);
            el.toggleAttribute('is-read-only', this.isReadOnly);
            if (this.name)
                el.setAttribute('name', this.name);
        });
        if (this.defaultFirstSelected) {
            if (radios.length > 0 && !radios.some((el) => el.isChecked)) {
                radios[0].isChecked = true;
                this._autoSelectedRadio = radios[0];
            }
        }
        else {
            if (this._autoSelectedRadio) {
                this._autoSelectedRadio.isChecked = false;
                this._autoSelectedRadio = null;
            }
        }
    }
    updated() {
        this._syncChildren();
    }
    render() {
        const messageType = this.hasError ? 'error' : 'helper';
        const isInline = this.type === 'inline';
        const label = this.label
            ? html `
          <ds-form-label
            label=${this.label}
            ?is-required=${this.isRequired}
            ?has-info-tip=${this.hasInfoTip}
            type=${isInline ? 'inline' : 'stacked'}
            style=${isInline ? '--ds-form-label-padding-top: var(--ds-spacing-spacing-02); min-height: 24px;' : nothing}
          ></ds-form-label>
        `
            : nothing;
        const values = html `
      <div
        class="values"
        role="radiogroup"
        aria-label=${this.label || nothing}
        aria-disabled=${this.isDisabled ? 'true' : nothing}
        aria-readonly=${this.isReadOnly ? 'true' : nothing}
        @ds-radio-change=${this._onRadioChange}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
        const message = html `
      <ds-form-message
        type=${messageType}
        helper-text=${this.helperText}
        error-text=${this.errorText}
      ></ds-form-message>
    `;
        if (isInline) {
            return html `
        ${label}
        <div class="value-message">${values}${message}</div>
      `;
        }
        return html `${label}${values}${message}`;
    }
};
DsRadioGroup.styles = [
    resetStyles,
    typographyBaseStyles,
    css `
      :host {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      /* ── Inline layout: label sits to the left of the values group ───────── */
      :host([type='inline']) {
        flex-direction: row;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-04); /* 8px between label and values */
      }

      /* ── Values container ────────────────────────────────────────────────── */
      .values {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-04); /* 8px vertical gap between items */
      }

      :host([option-orientation='horizontal']) .values {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--ds-spacing-spacing-04);
      }

      :host([type='inline'][option-orientation='horizontal']) .values {
        gap: var(--ds-spacing-spacing-04);
      }

      :host([type='inline'][option-orientation='vertical']) .values {
        gap: var(--ds-spacing-spacing-04);
      }

      /* ── Inline value+message wrapper ───────────────────────────────────── */
      .value-message {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;
        min-width: 1px;
      }

      /* ── State pass-through via CSS ─────────────────────────────────────── */
      :host([is-disabled]) ::slotted(ds-radio) {
        pointer-events: none;
      }

      :host([is-read-only]) ::slotted(ds-radio) {
        pointer-events: none;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsRadioGroup.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsRadioGroup.prototype, "isRequired", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-info-tip' })
], DsRadioGroup.prototype, "hasInfoTip", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-error' })
], DsRadioGroup.prototype, "hasError", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsRadioGroup.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-read-only' })
], DsRadioGroup.prototype, "isReadOnly", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadioGroup.prototype, "optionOrientation", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadioGroup.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsRadioGroup.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-text' })
], DsRadioGroup.prototype, "errorText", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'default-first-selected' })
], DsRadioGroup.prototype, "defaultFirstSelected", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsRadioGroup.prototype, "name", void 0);
DsRadioGroup = __decorate([
    customElement('ds-radio-group')
], DsRadioGroup);
export { DsRadioGroup };
//# sourceMappingURL=ds-radio-group.js.map