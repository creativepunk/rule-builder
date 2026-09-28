import { LitElement } from 'lit';
import '../ds-icon/ds-icon.js';
export type DsSplitButtonSize = 'sm' | 'md' | 'lg';
export type DsSplitButtonVariant = 'primary' | 'tertiary';
export type DsSplitButtonType = 'text' | 'icon';
/**
 * A split button composing a text/icon action and a menu-trigger icon button
 * side-by-side. The left half fires `ds-button-click`; the right chevron
 * fires `ds-menu-click`.
 *
 * Variants:
 *   primary  — solid brand fill (default)
 *   tertiary — transparent with 1px border
 *
 * Types:
 *   text — left half shows a text label (default slot)
 *   icon — left half shows an icon (icon slot, square, no label)
 */
/** @tagname ds-split-button */
export declare class DsSplitButton extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: DsSplitButtonVariant;
    type: DsSplitButtonType;
    size: DsSplitButtonSize;
    isDisabled: boolean;
    /** Accessible label for the menu (chevron) button. */
    menuAriaLabel: string;
    /**
     * When true, sets aria-expanded="true" on the menu button.
     * The consuming component controls this based on whether the menu is open.
     */
    isMenuOpen: boolean;
    private _handleActionClick;
    private _handleMenuClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-split-button': DsSplitButton;
    }
}
//# sourceMappingURL=ds-split-button.d.ts.map