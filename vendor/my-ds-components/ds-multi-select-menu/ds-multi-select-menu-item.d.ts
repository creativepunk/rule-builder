import { LitElement } from 'lit';
import '../ds-checkbox/ds-checkbox.js';
export type DsMultiSelectMenuItemSize = 'sm' | 'md';
/** @tagname ds-multi-select-menu-item */
export declare class DsMultiSelectMenuItem extends LitElement {
    static styles: import("lit").CSSResult[];
    value: string;
    selected: boolean;
    disabled: boolean;
    size: DsMultiSelectMenuItemSize;
    private _hasDescription;
    render(): import("lit").TemplateResult<1>;
    private _onDescSlotChange;
    private _handleClick;
    private _handleKeydown;
}
//# sourceMappingURL=ds-multi-select-menu-item.d.ts.map