import { LitElement } from 'lit';
import '../ds-icon/ds-icon.js';
export type DsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type DsButtonSize = 'sm' | 'md' | 'lg';
export type DsButtonType = 'button' | 'submit' | 'reset';
/** @tagname ds-button */
export declare class DsButton extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: DsButtonVariant;
    size: DsButtonSize;
    isDisabled: boolean;
    isLoading: boolean;
    isSelected: boolean;
    type: DsButtonType;
    ariaLabel: string | null;
    static formAssociated: boolean;
    private _internals;
    constructor();
    private _hasIconBefore;
    private _hasIconAfter;
    private _onIconBeforeSlotChange;
    private _onIconAfterSlotChange;
    private _handleClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-button': DsButton;
    }
}
//# sourceMappingURL=ds-button.d.ts.map