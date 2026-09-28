import { LitElement } from 'lit';
import type { DsMultiSelectMenuItem, DsMultiSelectMenuItemSize } from './ds-multi-select-menu-item.js';
import './ds-multi-select-menu-item.js';
import './ds-multi-select-menu-group.js';
export { DsMultiSelectMenuItem } from './ds-multi-select-menu-item.js';
export type { DsMultiSelectMenuItemSize } from './ds-multi-select-menu-item.js';
export { DsMultiSelectMenuGroup } from './ds-multi-select-menu-group.js';
export type DsSelectionFeedback = 'top' | 'fixed' | 'top-after-reopen';
import '../ds-menu-category/ds-menu-category.js';
/** @tagname ds-multi-select-menu */
export declare class DsMultiSelectMenu extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Item height: md = 40 px, sm = 32 px. */
    size: DsMultiSelectMenuItemSize;
    /** Show a loading spinner while options are fetching. */
    loading: boolean;
    /** Text shown when there are no items. */
    emptyText: string;
    /**
     * Controls how selected items are surfaced in the list.
     * - `top`: selected items move to the top immediately on each toggle.
     * - `fixed`: items never reorder.
     * - `top-after-reopen`: items reorder when the menu is next opened (call `handleMenuOpen()`).
     */
    selectionFeedback: DsSelectionFeedback;
    private _hasItems;
    private _hasHeader;
    private _hasFooter;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    private _onItemSelect;
    /**
     * Call this when the menu panel becomes visible.
     * Required for `selectionFeedback="top-after-reopen"` to take effect.
     * Safe to call with React-owned children — sets inline `style.order`,
     * never moves DOM nodes.
     */
    handleMenuOpen(): void;
    private _applyOrder;
    private _syncGroupsFeedback;
    private _items;
    private _groups;
    private _configureGroups;
    private _onDefaultSlotChange;
    private _onHeaderSlotChange;
    private _onFooterSlotChange;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-multi-select-menu': DsMultiSelectMenu;
        'ds-multi-select-menu-item': DsMultiSelectMenuItem;
    }
}
//# sourceMappingURL=ds-multi-select-menu.d.ts.map