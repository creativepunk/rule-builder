import { LitElement } from 'lit';
export type DsTagSelectableSize = 'sm' | 'md' | 'lg';
/** @tagname ds-tag-selectable */
export declare class DsTagSelectable extends LitElement {
    static styles: import("lit").CSSResult[];
    size: DsTagSelectableSize;
    selected: boolean;
    disabled: boolean;
    hasIcon: boolean;
    label: string;
    connectedCallback(): void;
    private _handleClick;
    private _handleKeydown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-tag-selectable': DsTagSelectable;
    }
}
//# sourceMappingURL=ds-tag-selectable.d.ts.map