var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
/** @tagname ds-segmented-button-item */
let DsSegmentedButtonItem = class DsSegmentedButtonItem extends LitElement {
    constructor() {
        super(...arguments);
        /** Position within the group — set automatically by ds-segmented-button. */
        this.position = 'middle';
        /** Size — inherited from parent ds-segmented-button. */
        this.size = 'md';
        /** Whether this item is currently the active selection. */
        this.isSelected = false;
        /** Disables this specific item. */
        this.isDisabled = false;
        /**
         * Set by the parent group when it has is-disabled. Kept separate from
         * isDisabled so per-item disabled state is preserved when the group
         * re-enables.
         */
        this.groupDisabled = false;
        /** Value emitted in ds-segmented-change when selected. */
        this.value = '';
        /** Set by parent group when width-fill is on. Makes the button flex-grow to fill its share. */
        this.fillParent = false;
        /** Renders icon-only layout (square, 2px padding). Requires `label` for accessibility. */
        this.iconOnly = false;
        /** Accessible label — used as aria-label when icon-only. */
        this.label = '';
    }
    get _disabled() {
        return this.isDisabled || this.groupDisabled;
    }
    _handleClick(e) {
        if (this._disabled || this.isSelected)
            return;
        dispatch(this, 'ds-segmented-change', {
            value: this.value,
            selected: true,
            originalEvent: e,
        });
    }
    _handleKeyDown(e) {
        if (this._disabled || this.isSelected)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dispatch(this, 'ds-segmented-change', {
                value: this.value,
                selected: true,
                originalEvent: e,
            });
        }
    }
    render() {
        return html `
      <button
        type="button"
        ?disabled=${this._disabled}
        aria-pressed=${this.isSelected ? 'true' : 'false'}
        aria-label=${this.label || nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </button>
    `;
    }
};
DsSegmentedButtonItem.styles = [
    resetStyles,
    typographyBaseStyles,
    css `
      :host {
        display: contents;
      }

      button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ds-spacing-spacing-03, 6px);
        flex-shrink: 0;
        background: var(--ds-background-neutral-subtle-default, rgba(255, 255, 255, 0));
        border: none;
        border-radius: 0;
        cursor: pointer;
        color: var(--ds-text-text-default, #f0f0f0);
        font-family: var(--ds-font-family-normal, 'Inter', sans-serif);
        font-size: var(--ds-typography-cozy-medium-body-sm-font-size, 14px);
        font-weight: var(--ds-typography-cozy-medium-body-sm-font-weight, 500);
        line-height: var(--ds-typography-cozy-medium-body-sm-line-height, 16px);
        letter-spacing: var(--ds-typography-cozy-medium-body-sm-letter-spacing, 0.5px);
        font-feature-settings: 'cv08' 1, 'cv05' 1, 'zero' 1;
        white-space: nowrap;
        box-shadow: none;
        transition: background 100ms ease;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* Default (md) */
        height: 32px;
        padding: var(--ds-spacing-spacing-04, 8px) var(--ds-spacing-spacing-05, 12px);
      }

      /* ── Sizes (text variant) ─────────────────────────────────────────────── */
      :host([size='sm']) button {
        height: 24px;
        padding: var(--ds-spacing-spacing-02, 4px) var(--ds-spacing-spacing-04, 8px);
      }

      :host([size='lg']) button {
        height: 40px;
        padding: var(--ds-spacing-spacing-04, 8px) var(--ds-spacing-spacing-06, 16px);
      }

      /* ── Fill-parent: button expands to fill equal share of group width ─────── */
      :host([fill-parent]) button {
        flex: 1 1 0;
        width: 100%;
      }

      /* ── Icon-only: 2px padding + square dimensions ───────────────────────── */
      :host([icon-only]) button {
        padding: var(--ds-spacing-spacing-01, 2px);
        width: 32px;
        height: 32px;
      }

      :host([icon-only][size='sm']) button {
        width: 24px;
        height: 24px;
      }

      :host([icon-only][size='lg']) button {
        width: 40px;
        height: 40px;
      }

      /* ── Position — corner radius ─────────────────────────────────────────── */
      :host([position='left']) button {
        border-radius: var(--ds-radius-sm, 4px) 0 0 var(--ds-radius-sm, 4px);
      }

      :host([position='right']) button {
        border-radius: 0 var(--ds-radius-sm, 4px) var(--ds-radius-sm, 4px) 0;
      }

      /* ── Hover ────────────────────────────────────────────────────────────── */
      button:hover:not(:disabled) {
        background: var(--ds-background-neutral-subtle-hovered, rgba(255, 255, 255, 0.2));
      }

      /* ── Pressed ──────────────────────────────────────────────────────────── */
      button:active:not(:disabled) {
        background: var(--ds-background-neutral-subtle-pressed, rgba(255, 255, 255, 0.08));
      }

      /* ── Selected ─────────────────────────────────────────────────────────── */
      :host([is-selected]) button {
        background: var(--ds-background-selected-default, rgba(255, 255, 255, 0.08));
        box-shadow: inset 0 0 0 1px var(--ds-border-border-selected, #0055bd);
      }

      :host([is-selected]) button:hover:not(:disabled) {
        background: var(--ds-background-selected-hovered, rgba(255, 255, 255, 0.12));
      }

      :host([is-selected]) button:active:not(:disabled) {
        background: var(--ds-background-selected-pressed, rgba(255, 255, 255, 0.05));
      }

      /* ── Disabled ─────────────────────────────────────────────────────────── */
      button:disabled {
        cursor: not-allowed;
        background: var(--ds-background-neutral-subtle-default, rgba(255, 255, 255, 0));
        box-shadow: none;
        color: var(--ds-text-text-disabled, rgba(255, 255, 255, 0.25));
      }

      /* ── Focus ring ───────────────────────────────────────────────────────── */
      button:focus-visible {
        outline: 2px solid var(--ds-focus-focus, #ffffff);
        outline-offset: -3px;
        border-radius: var(--ds-radius-focus-sm, 6px);
        z-index: 1;
      }

      button:focus:not(:focus-visible) {
        outline: none;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsSegmentedButtonItem.prototype, "position", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsSegmentedButtonItem.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-selected' })
], DsSegmentedButtonItem.prototype, "isSelected", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsSegmentedButtonItem.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean })
], DsSegmentedButtonItem.prototype, "groupDisabled", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsSegmentedButtonItem.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'fill-parent' })
], DsSegmentedButtonItem.prototype, "fillParent", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'icon-only' })
], DsSegmentedButtonItem.prototype, "iconOnly", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsSegmentedButtonItem.prototype, "label", void 0);
DsSegmentedButtonItem = __decorate([
    customElement('ds-segmented-button-item')
], DsSegmentedButtonItem);
export { DsSegmentedButtonItem };
// ─── Group ────────────────────────────────────────────────────────────────────
/** @tagname ds-segmented-button */
let DsSegmentedButton = class DsSegmentedButton extends LitElement {
    constructor() {
        super(...arguments);
        /** Visual size propagated to all items. */
        this.size = 'md';
        /** Disables all items in the group. */
        this.isDisabled = false;
        /** Makes all buttons fill the group width equally instead of hugging content. */
        this.widthFill = false;
        this._onSlotChange = () => {
            this._syncChildren();
        };
        this._onSegmentedChange = (e) => {
            const item = e.target;
            if (item.tagName.toLowerCase() !== 'ds-segmented-button-item')
                return;
            // Exactly one item must always be selected — deselect all then select the target.
            this._getItems().forEach((el) => {
                el.isSelected = el === item;
            });
        };
    }
    _getItems() {
        const slot = this.shadowRoot?.querySelector('slot');
        if (!slot)
            return [];
        return slot
            .assignedElements({ flatten: true })
            .filter((el) => el.tagName.toLowerCase() === 'ds-segmented-button-item');
    }
    _syncChildren() {
        const items = this._getItems();
        items.forEach((item, i) => {
            item.size = this.size;
            // Always set both ways so toggling group disabled correctly re-enables items
            // without disturbing per-item isDisabled.
            item.groupDisabled = this.isDisabled;
            item.fillParent = this.widthFill;
            if (items.length === 1) {
                item.position = 'left';
            }
            else if (i === 0) {
                item.position = 'left';
            }
            else if (i === items.length - 1) {
                item.position = 'right';
            }
            else {
                item.position = 'middle';
            }
        });
    }
    updated() {
        this._syncChildren();
    }
    render() {
        return html `
      <div
        class="group"
        role="group"
        aria-disabled=${this.isDisabled ? 'true' : 'false'}
        @ds-segmented-change=${this._onSegmentedChange}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
    }
};
DsSegmentedButton.styles = [
    resetStyles,
    typographyBaseStyles,
    css `
      :host {
        display: inline-flex;
      }

      :host([width-fill]) {
        display: flex;
        width: 100%;
      }

      .group {
        display: inline-flex;
        align-items: stretch;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-default, rgba(255, 255, 255, 0.08));
        border-radius: var(--ds-radius-sm, 4px);
        overflow: hidden;
      }

      :host([width-fill]) .group {
        display: flex;
        width: 100%;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsSegmentedButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsSegmentedButton.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'width-fill' })
], DsSegmentedButton.prototype, "widthFill", void 0);
DsSegmentedButton = __decorate([
    customElement('ds-segmented-button')
], DsSegmentedButton);
export { DsSegmentedButton };
//# sourceMappingURL=ds-segmented-button.js.map