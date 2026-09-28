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
import './ds-single-select-menu-item.js';
import './ds-single-select-menu-group.js';
export { DsSingleSelectMenuItem } from './ds-single-select-menu-item.js';
export { DsSingleSelectMenuGroup } from './ds-single-select-menu-group.js';
import '../ds-menu-category/ds-menu-category.js';
/** @tagname ds-single-select-menu */
let DsSingleSelectMenu = class DsSingleSelectMenu extends LitElement {
    constructor() {
        super(...arguments);
        /** Item height: md = 40 px, sm = 32 px. */
        this.size = 'md';
        /** Show a loading spinner while options are fetching. */
        this.loading = false;
        /** Text shown when there are no items. */
        this.emptyText = 'No options';
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
    }
    // ─── Selection management ───────────────────────────────────
    _onItemSelect(e) {
        const { value, originalEvent } = e.detail;
        const items = this._items();
        // Single-select: deselect all, then select the clicked item.
        items.forEach((item) => { item.selected = item.value === value; });
        const values = items.filter((i) => i.selected).map((i) => i.value);
        dispatch(this, 'ds-select-menu-change', { values, originalEvent });
    }
    _items() {
        return Array.from(this.querySelectorAll('ds-single-select-menu-item'));
    }
    _groups() {
        return Array.from(this.querySelectorAll('ds-single-select-menu-group'));
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
      <div class="container" role="listbox">
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
DsSingleSelectMenu.styles = [
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
        padding: var(--ds-spacing-spacing-04) 0;
        overflow-y: auto;
        max-height: var(--ds-menu-body-max-height, 320px);
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
        animation: ds-single-spin 0.75s linear infinite;
        flex-shrink: 0;
      }

      @keyframes ds-single-spin {
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
], DsSingleSelectMenu.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsSingleSelectMenu.prototype, "loading", void 0);
__decorate([
    property({ type: String, attribute: 'empty-text' })
], DsSingleSelectMenu.prototype, "emptyText", void 0);
__decorate([
    state()
], DsSingleSelectMenu.prototype, "_hasItems", void 0);
__decorate([
    state()
], DsSingleSelectMenu.prototype, "_hasHeader", void 0);
__decorate([
    state()
], DsSingleSelectMenu.prototype, "_hasFooter", void 0);
DsSingleSelectMenu = __decorate([
    customElement('ds-single-select-menu')
], DsSingleSelectMenu);
export { DsSingleSelectMenu };
//# sourceMappingURL=ds-single-select-menu.js.map