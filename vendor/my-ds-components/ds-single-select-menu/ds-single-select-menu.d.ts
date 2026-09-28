import { LitElement } from 'lit';
import type { DsSingleSelectMenuItem, DsSingleSelectMenuItemSize } from './ds-single-select-menu-item.js';
import './ds-single-select-menu-item.js';
import './ds-single-select-menu-group.js';
export { DsSingleSelectMenuItem } from './ds-single-select-menu-item.js';
export type { DsSingleSelectMenuItemSize } from './ds-single-select-menu-item.js';
export { DsSingleSelectMenuGroup } from './ds-single-select-menu-group.js';
import '../ds-menu-category/ds-menu-category.js';
/** @tagname ds-single-select-menu */
export declare class DsSingleSelectMenu extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Item height: md = 40 px, sm = 32 px. */
    size: DsSingleSelectMenuItemSize;
    /** Show a loading spinner while options are fetching. */
    loading: boolean;
    /** Text shown when there are no items. */
    emptyText: string;
    private _hasItems;
    private _hasHeader;
    private _hasFooter;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    private _onItemSelect;
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
        'ds-single-select-menu': DsSingleSelectMenu;
        'ds-single-select-menu-item': DsSingleSelectMenuItem;
    }
}
//# sourceMappingURL=ds-single-select-menu.d.ts.map