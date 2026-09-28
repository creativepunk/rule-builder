import { LitElement } from 'lit';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
export type DsTagColor = 'gray' | 'blue' | 'cyan' | 'teal' | 'green' | 'purple' | 'magenta' | 'red' | 'orange' | 'yellow' | 'high-contrast';
export type DsTagSize = 'xs' | 'sm' | 'md';
/** @tagname ds-tag */
export declare class DsTag extends LitElement {
    static styles: import("lit").CSSResult[];
    color: DsTagColor;
    size: DsTagSize;
    disabled: boolean;
    isDismissable: boolean;
    hasIcon: boolean;
    truncate: boolean;
    label: string;
    private _handleDismiss;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-tag': DsTag;
    }
}
//# sourceMappingURL=ds-tag.d.ts.map