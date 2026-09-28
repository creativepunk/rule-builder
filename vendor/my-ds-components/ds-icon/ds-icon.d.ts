import { LitElement } from 'lit';
export type DsIconSize = 'sm' | 'md' | 'lg';
export type DsIconStyle = 'outlined' | 'rounded' | 'sharp';
export type DsIconResolver = (name: string, iconStyle: DsIconStyle) => Promise<string>;
/** @deprecated No longer needed — ds-icon uses the variable font directly. */
export declare function setIconResolver(_resolver: DsIconResolver): void;
/** @deprecated No longer needed — ds-icon uses the variable font directly. */
export declare function createMaterialSymbolsResolver(_iconStyle?: DsIconStyle): DsIconResolver;
/** @tagname ds-icon */
export declare class DsIcon extends LitElement {
    static styles: import("lit").CSSResult[];
    name: string;
    size: DsIconSize;
    iconStyle: DsIconStyle;
    fill: boolean;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-icon': DsIcon;
    }
}
//# sourceMappingURL=ds-icon.d.ts.map