import { LitElement } from 'lit';
import type { DsActionMenuItem, DsActionMenuItemSize } from './ds-action-menu-item.js';
import './ds-action-menu-item.js';
import '../ds-menu-category/ds-menu-category.js';
import '../ds-menu-category/ds-menu-separator.js';
export { DsActionMenuItem } from './ds-action-menu-item.js';
export type { DsActionMenuItemVariant, DsActionMenuItemSize } from './ds-action-menu-item.js';
/** Horizontal divider for grouping items inside an <ds-action-menu>. */
/** @tagname ds-action-menu-separator */
export declare class DsActionMenuSeparator extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
/**
 * Logical grouping of items inside a <ds-action-menu>.
 *
 * - Provides role="group" for assistive technology.
 * - title — renders a section label above the items (aria-label on the group).
 * - selection-type="checkbox" — items toggle independently.
 * - selection-type="radio" — selecting one item unchecks all others in the group.
 * - selection-type="none" (default) — purely action group; no check state.
 *
 * The separator and title visibility are managed automatically by the parent
 * <ds-action-menu> once it knows how many groups exist.
 */
/** @tagname ds-action-menu-group */
export declare class DsActionMenuGroup extends LitElement {
    static styles: import("lit").CSSResult[];
    selectionType: 'none' | 'checkbox' | 'radio';
    title: string;
    /** Automatically set by <ds-action-menu>. True for every group except the first. */
    hasSeparator: boolean;
    items: DsActionMenuItem[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onMenuAction;
    private _onSlotChange;
    render(): import("lit").TemplateResult<1>;
}
/** @tagname ds-action-menu */
export declare class DsActionMenu extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Item height: md = 40 px (cozy), sm = 32 px (compact). */
    size: DsActionMenuItemSize;
    private _hasHeader;
    private _hasFooter;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    /**
     * Returns all ds-action-menu-item elements that belong to this menu —
     * both direct children and those inside ds-action-menu-group elements —
     * while excluding items that belong to nested sub-menus.
     */
    private _getOwnItems;
    private _getOwnGroups;
    /**
     * Auto-assigns hasSeparator to groups: first group never gets one,
     * every subsequent group does.
     */
    private _configureGroups;
    private _onMenuAction;
    private _onDefaultSlotChange;
    /**
     * If any group in the menu has a selection-type (checkbox/radio), all items
     * across the entire menu get the indent column for visual alignment.
     * Within each group, only checked items show the checkmark.
     */
    private _updateIndentation;
    private _updateIconWrap;
    private _onHeaderSlotChange;
    private _onFooterSlotChange;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-action-menu': DsActionMenu;
        'ds-action-menu-item': DsActionMenuItem;
        'ds-action-menu-separator': DsActionMenuSeparator;
        'ds-action-menu-group': DsActionMenuGroup;
    }
}
//# sourceMappingURL=ds-action-menu.d.ts.map