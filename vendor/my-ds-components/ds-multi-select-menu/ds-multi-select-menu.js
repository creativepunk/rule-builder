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
import './ds-multi-select-menu-item.js';
import './ds-multi-select-menu-group.js';
export { DsMultiSelectMenuItem } from './ds-multi-select-menu-item.js';
export { DsMultiSelectMenuGroup } from './ds-multi-select-menu-group.js';
import '../ds-menu-category/ds-menu-category.js';
/** @tagname ds-multi-select-menu */
let DsMultiSelectMenu = class DsMultiSelectMenu extends LitElement {
    constructor() {
        super(...arguments);
        /** Item height: md = 40 px, sm = 32 px. */
        this.size = 'md';
        /** Show a loading spinner while options are fetching. */
        this.loading = false;
        /** Text shown when there are no items. */
        this.emptyText = 'No options';
        /**
         * Controls how selected items are surfaced in the list.
         * - `top`: selected items move to the top immediately on each toggle.
         * - `fixed`: items never reorder.
         * - `top-after-reopen`: items reorder when the menu is next opened (call `handleMenuOpen()`).
         */
        this.selectionFeedback = 'top-after-reopen';
        this._hasItems = false;
        this._hasHeader = false;
        this._hasFooter = false;
    }
    // ─── Lifecycle ─────────────────────────────────────────────
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('ds-menu-select', this._onItemSelect);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('ds-menu-select', this._onItemSelect);
    }
    updated(changed) {
        if (changed.has('size')) {
            this._items().forEach((item) => { item.size = this.size; });
        }
        if (changed.has('selectionFeedback')) {
            this._syncGroupsFeedback();
        }
    }
    // ─── Selection management ───────────────────────────────────
    _onItemSelect(e) {
        const { value, selected, originalEvent } = e.detail;
        const items = this._items();
        // Multi-select: toggle the clicked item independently.
        const target = items.find((item) => item.value === value);
        if (target)
            target.selected = selected;
        // For 'top' mode, reorder immediately on each selection change.
        if (this.selectionFeedback === 'top') {
            this._applyOrder(items);
        }
        const values = items.filter((i) => i.selected).map((i) => i.value);
        dispatch(this, 'ds-select-menu-change', { values, originalEvent });
    }
    /**
     * Call this when the menu panel becomes visible.
     * Required for `selectionFeedback="top-after-reopen"` to take effect.
     * Safe to call with React-owned children — sets inline `style.order`,
     * never moves DOM nodes.
     */
    handleMenuOpen() {
        const items = this._items();
        items.forEach((i) => { i.style.order = ''; });
        if (this.selectionFeedback === 'top-after-reopen') {
            this._applyOrder(items);
        }
    }
    _applyOrder(items) {
        items.forEach((i) => {
            i.style.order = i.selected ? '-1' : '';
        });
    }
    _syncGroupsFeedback() {
        this._groups().forEach((group) => {
            group.setAttribute('selection-feedback', this.selectionFeedback);
        });
    }
    _items() {
        return Array.from(this.querySelectorAll('ds-multi-select-menu-item'));
    }
    _groups() {
        return Array.from(this.querySelectorAll('ds-multi-select-menu-group'));
    }
    _configureGroups() {
        const groups = this._groups();
        const isSingle = groups.length === 1;
        groups.forEach((g, i) => {
            g.hasSeparator = !isSingle && i > 0;
        });
    }
    // ─── Slot change handlers ────────────────────────────────────
    _onDefaultSlotChange() {
        const items = this._items();
        this._hasItems = items.length > 0;
        items.forEach((item) => { item.size = this.size; });
        this._configureGroups();
        this._syncGroupsFeedback();
    }
    _onHeaderSlotChange(e) {
        const slot = e.target;
        this._hasHeader = slot.assignedNodes({ flatten: true }).length > 0;
    }
    _onFooterSlotChange(e) {
        const slot = e.target;
        this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
    }
    // ─── Render ──────────────────────────────────────────────────
    render() {
        return html `
      <div class="container" role="listbox" aria-multiselectable="true">
        <div class="header" ?hidden=${!this._hasHeader}>
          <slot name="header" @slotchange=${this._onHeaderSlotChange}></slot>
        </div>
        <div class="body">
          ${this.loading
            ? html `<div class="state-panel" role="status" aria-label="Loading options">
                <span class="spinner" aria-hidden="true"></span>
              </div>`
            : !this._hasItems
                ? html `<div class="state-panel">
                  <span class="empty-text text-helper-helper-regular">${this.emptyText}</span>
                </div>`
                : nothing}
          <slot
            @slotchange=${this._onDefaultSlotChange}
            ?hidden=${this.loading}
          ></slot>
        </div>
        <div class="footer" ?hidden=${!this._hasFooter}>
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `;
    }
};
DsMultiSelectMenu.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: block;
        min-width: 144px;
      }

      .container {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--ds-elevation-surface-overlay-default);
        border-radius: var(--ds-radius-semantic-radius-sm);
        /* ⚠ no shadow token — raw fallback */
        box-shadow:
          0px 0px 1px 0px rgba(1, 4, 4, 0.5),
          0px 8px 12px 0px rgba(1, 4, 4, 0.36),
          inset 0px 0px 0px 1px rgba(189, 189, 189, 0.12);
      }

      [hidden] {
        display: none !important;
      }

      .header {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-05);
        padding: var(--ds-spacing-spacing-05) var(--ds-spacing-spacing-06);
        flex-shrink: 0;
        overflow: hidden;
      }

      .body {
        display: flex;
        flex-direction: column;
        padding: var(--ds-spacing-spacing-04) 0;
        overflow-y: auto;
        max-height: var(--ds-menu-body-max-height, 320px);
      }

      :host([selection-feedback="top"]) ::slotted(ds-multi-select-menu-item[selected]) {
        order: -1;
      }

      .state-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 120px;
        padding: var(--ds-spacing-spacing-03) var(--ds-spacing-spacing-05);
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 1.5px solid rgba(255, 255, 255, 0.2);
        border-top-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        animation: ds-multi-spin 0.75s linear infinite;
        flex-shrink: 0;
      }

      @keyframes ds-multi-spin {
        to { transform: rotate(360deg); }
      }

      .empty-text {
        color: var(--ds-text-text-subtlest);
        font-feature-settings: 'cv08' 1;
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--ds-spacing-spacing-04);
        padding: var(--ds-spacing-spacing-05) var(--ds-spacing-spacing-06);
        border-top: 1px solid var(--ds-border-border-default);
        flex-shrink: 0;
        overflow: hidden;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsMultiSelectMenu.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsMultiSelectMenu.prototype, "loading", void 0);
__decorate([
    property({ type: String, attribute: 'empty-text' })
], DsMultiSelectMenu.prototype, "emptyText", void 0);
__decorate([
    property({ type: String, attribute: 'selection-feedback', reflect: true })
], DsMultiSelectMenu.prototype, "selectionFeedback", void 0);
__decorate([
    state()
], DsMultiSelectMenu.prototype, "_hasItems", void 0);
__decorate([
    state()
], DsMultiSelectMenu.prototype, "_hasHeader", void 0);
__decorate([
    state()
], DsMultiSelectMenu.prototype, "_hasFooter", void 0);
DsMultiSelectMenu = __decorate([
    customElement('ds-multi-select-menu')
], DsMultiSelectMenu);
export { DsMultiSelectMenu };
//# sourceMappingURL=ds-multi-select-menu.js.map