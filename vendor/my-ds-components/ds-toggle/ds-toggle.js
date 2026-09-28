var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
/** @tagname ds-toggle */
let DsToggle = class DsToggle extends LitElement {
    constructor() {
        super();
        /** Controlled checked / on state. */
        this.isChecked = false;
        /** Prevents interaction. */
        this.isDisabled = false;
        /** Shows a loading spinner inside the track. */
        this.isLoading = false;
        /** sm = 32×16px track, md = 40×20px track. */
        this.size = 'md';
        /** Optional label text rendered to the right of the track. */
        this.label = '';
        /** Optional description text rendered below the label. */
        this.description = '';
        /** Form field name. */
        this.name = '';
        /** Form field value submitted when checked. */
        this.value = 'on';
        /** aria-label for the hidden checkbox input (use when there is no visible label). */
        this.ariaLabel = '';
        this._handleChange = (e) => {
            if (this.isDisabled)
                return;
            this.isChecked = !this.isChecked;
            this._internals.setFormValue(this.isChecked ? this.value : null);
            dispatch(this, 'ds-toggle-change', { checked: this.isChecked, originalEvent: e });
        };
        this._handleKeyDown = (e) => {
            if (this.isDisabled)
                return;
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.isChecked = !this.isChecked;
                this._internals.setFormValue(this.isChecked ? this.value : null);
                dispatch(this, 'ds-toggle-change', { checked: this.isChecked, originalEvent: e });
            }
        };
        this._internals = this.attachInternals();
    }
    render() {
        const hasLabelArea = this.label || this.description;
        const track = html `
      <span class="track" aria-hidden="true">
        ${this.isLoading
            ? html `
              <span class="spinner-slot">
                <ds-spinner size="xs" appearance="inherit"></ds-spinner>
              </span>
            `
            : nothing}
        <span class="thumb"></span>
        <span class="focus-ring"></span>
      </span>
    `;
        const labelArea = hasLabelArea
            ? html `
          <span class="label-area">
            ${this.label
                ? html `<span class="label-text ${this.size === 'md' ? 'text-medium-body-md' : 'text-medium-body-sm'}"
                  >${this.label}</span
                >`
                : nothing}
            ${this.description
                ? html `<span class="description-text text-helper-helper-regular">${this.description}</span>`
                : nothing}
          </span>
        `
            : nothing;
        return html `
      <label>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.isChecked}
          ?disabled=${this.isDisabled}
          name=${this.name || nothing}
          value=${this.value}
          aria-checked=${this.isChecked ? 'true' : 'false'}
          aria-label=${this.ariaLabel || this.label || nothing}
          aria-disabled=${this.isDisabled ? 'true' : nothing}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
        />
        ${track} ${labelArea}
      </label>
    `;
    }
};
DsToggle.formAssociated = true;
DsToggle.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-04); /* 8px */
        position: relative;
      }

      :host([is-disabled]) {
        pointer-events: none;
        cursor: not-allowed;
      }

      /* ── Clickable label wrapper ─────────────────────────────────────────── */
      label {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-04); /* 8px */
        cursor: pointer;
      }

      :host([is-disabled]) label {
        cursor: not-allowed;
      }

      /* ── Native input (visually hidden) ─────────────────────────────────── */
      input[type='checkbox'] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        pointer-events: none;
        margin: 0;
      }

      /* ── Track (pill shape) ──────────────────────────────────────────────── */
      .track {
        position: relative;
        flex-shrink: 0;
        border-radius: var(--ds-radius-semantic-radius-pill);
        background: var(--ds-background-neutral-default);
        transition: background 120ms ease;
        /* md default */
        width: 40px;
        height: 20px;
      }

      :host([size='sm']) .track {
        width: 32px;
        height: 16px;
      }

      /* Checked track */
      :host([is-checked]) .track {
        background: var(--ds-background-selected-bolder-default);
      }

      /* Hover — unchecked */
      label:hover .track {
        background: var(--ds-background-neutral-hovered);
      }

      /* Hover — checked */
      :host([is-checked]) label:hover .track {
        background: var(--ds-background-selected-bolder-hovered);
      }

      /* Disabled — unchecked */
      :host([is-disabled]) .track {
        background: var(--ds-background-disabled);
      }

      /* Disabled — checked */
      :host([is-disabled][is-checked]) .track {
        background: var(--ds-background-selected-bolder-disabled);
      }

      /* ── Thumb (switch knob) ─────────────────────────────────────────────── */
      .thumb {
        position: absolute;
        border-radius: var(--ds-radius-semantic-radius-pill);
        background: var(--ds-icon-icon-default);
        transition: left 120ms ease, right 120ms ease, width 120ms ease, transform 120ms ease;
        /* md unchecked */
        top: 4px;
        left: 4px;
        width: 16px;
        height: 12px;
      }

      :host([size='sm']) .thumb {
        top: 4px;
        left: 4px;
        width: 10px;
        height: 8px;
      }

      /* md checked thumb */
      :host([is-checked]) .thumb {
        left: 18px;
        top: 2px;
        width: 20px;
        height: 16px;
      }

      /* sm checked thumb */
      :host([is-checked][size='sm']) .thumb {
        left: 14px;
        top: 2px;
        width: 16px;
        height: 12px;
      }

      /* Disabled thumb */
      :host([is-disabled]) .thumb {
        background: var(--ds-icon-icon-disabled);
      }

      /* ── Loading spinner region ──────────────────────────────────────────── */
      .spinner-slot {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 12px;
        height: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      /* unchecked: spinner on the right side */
      :host(:not([is-checked])) .spinner-slot {
        right: 4px;
      }

      /* checked: spinner on the left side */
      :host([is-checked]) .spinner-slot {
        left: 4px;
      }

      :host([size='sm']:not([is-checked])) .spinner-slot {
        right: 2px;
      }

      :host([size='sm'][is-checked]) .spinner-slot {
        left: 2px;
      }

      /* ── Focus ring ──────────────────────────────────────────────────────── */
      .focus-ring {
        display: none;
        position: absolute;
        inset: -2px;
        border-radius: var(--ds-radius-semantic-radius-pill);
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 0;
        pointer-events: none;
      }

      input:focus-visible ~ .focus-ring {
        display: block;
      }

      /* ── Label text area ─────────────────────────────────────────────────── */
      .label-area {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-01); /* 4px */
        padding-top: 2px;
      }

      /* md size: align thumb center vertically with first line of label */
      :host([size='md']) .label-area {
        padding-top: 0px;
        justify-content: center;
        min-height: 20px;
      }

      :host([size='sm']) .label-area {
        min-height: 16px;
        justify-content: center;
        padding-top: 0px;
      }

      .label-text {
        color: var(--ds-text-text-default);
        white-space: nowrap;
        word-break: break-word;
      }

      :host([is-disabled]) .label-text {
        color: var(--ds-text-text-disabled);
      }

      .description-text {
        color: var(--ds-text-text-subtlest);
        white-space: nowrap;
        word-break: break-word;
      }

      :host([is-disabled]) .description-text {
        color: var(--ds-text-text-disabled);
      }
    `,
];
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-checked' })
], DsToggle.prototype, "isChecked", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsToggle.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-loading' })
], DsToggle.prototype, "isLoading", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsToggle.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsToggle.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsToggle.prototype, "description", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsToggle.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsToggle.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'aria-label' })
], DsToggle.prototype, "ariaLabel", void 0);
DsToggle = __decorate([
    customElement('ds-toggle')
], DsToggle);
export { DsToggle };
//# sourceMappingURL=ds-toggle.js.map