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
import './ds-checkbox.js';
/** @tagname ds-checkbox-group */
let DsCheckboxGroup = class DsCheckboxGroup extends LitElement {
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
        /** Disables all child checkboxes. */
        this.isDisabled = false;
        /** Makes all child checkboxes read-only. */
        this.isReadOnly = false;
        /** Lays items out horizontally or vertically. */
        this.optionOrientation = 'vertical';
        /** `default` = standard spacing; `inline` = compact, same layout rules. */
        this.type = 'stacked';
        /** Helper text shown below the group when there is no error. */
        this.helperText = 'Optional helper text';
        /** Error text shown below the group when hasError is true. */
        this.errorText = 'Field is required';
        /** HTML form field name propagated to all child checkboxes. */
        this.name = '';
        this._onSlotChange = () => {
            this._syncChildren();
        };
    }
    _getCheckboxes() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (!slot)
            return [];
        return slot
            .assignedElements({ flatten: true })
            .filter((el) => el.tagName.toLowerCase() === 'ds-checkbox');
    }
    _syncChildren() {
        this._getCheckboxes().forEach((el) => {
            el.toggleAttribute('has-error', this.hasError);
            el.toggleAttribute('is-disabled', this.isDisabled);
            el.toggleAttribute('is-read-only', this.isReadOnly);
            if (this.name)
                el.setAttribute('name', this.name);
        });
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
        role="group"
        aria-label=${this.label || nothing}
        aria-disabled=${this.isDisabled ? 'true' : nothing}
        aria-readonly=${this.isReadOnly ? 'true' : nothing}
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
DsCheckboxGroup.styles = [
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

      /* inline type: items have no extra gap beyond the natural inline gap */
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

      /* ── State pass-through via CSS — reacts to property changes instantly ── */
      :host([is-disabled]) ::slotted(ds-checkbox) {
        pointer-events: none;
      }

      :host([is-read-only]) ::slotted(ds-checkbox) {
        pointer-events: none;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsCheckboxGroup.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-required' })
], DsCheckboxGroup.prototype, "isRequired", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-info-tip' })
], DsCheckboxGroup.prototype, "hasInfoTip", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-error' })
], DsCheckboxGroup.prototype, "hasError", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsCheckboxGroup.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-read-only' })
], DsCheckboxGroup.prototype, "isReadOnly", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsCheckboxGroup.prototype, "optionOrientation", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsCheckboxGroup.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsCheckboxGroup.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-text' })
], DsCheckboxGroup.prototype, "errorText", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsCheckboxGroup.prototype, "name", void 0);
DsCheckboxGroup = __decorate([
    customElement('ds-checkbox-group')
], DsCheckboxGroup);
export { DsCheckboxGroup };
//# sourceMappingURL=ds-checkbox-group.js.map