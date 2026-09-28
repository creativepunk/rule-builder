import { LitElement } from 'lit';
export type DsSingleSelectMenuItemSize = 'sm' | 'md';
/** @tagname ds-single-select-menu-item */
export declare class DsSingleSelectMenuItem extends LitElement {
    static styles: import("lit").CSSResult[];
    value: string;
    selected: boolean;
    disabled: boolean;
    size: DsSingleSelectMenuItemSize;
    private _hasDescription;
    render(): import("lit").TemplateResult<1>;
    private _onDescSlotChange;
    private _handleClick;
    private _handleKeydown;
}
//# sourceMappingURL=ds-single-select-menu-item.d.ts.map