import { LitElement } from 'lit';
export type DsSegmentedButtonSize = 'sm' | 'md' | 'lg';
/** @tagname ds-segmented-button-item */
export declare class DsSegmentedButtonItem extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Position within the group — set automatically by ds-segmented-button. */
    position: 'left' | 'middle' | 'right';
    /** Size — inherited from parent ds-segmented-button. */
    size: DsSegmentedButtonSize;
    /** Whether this item is currently the active selection. */
    isSelected: boolean;
    /** Disables this specific item. */
    isDisabled: boolean;
    /**
     * Set by the parent group when it has is-disabled. Kept separate from
     * isDisabled so per-item disabled state is preserved when the group
     * re-enables.
     */
    groupDisabled: boolean;
    /** Value emitted in ds-segmented-change when selected. */
    value: string;
    /** Set by parent group when width-fill is on. Makes the button flex-grow to fill its share. */
    fillParent: boolean;
    /** Renders icon-only layout (square, 2px padding). Requires `label` for accessibility. */
    iconOnly: boolean;
    /** Accessible label — used as aria-label when icon-only. */
    label: string;
    private get _disabled();
    private _handleClick;
    private _handleKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-segmented-button-item': DsSegmentedButtonItem;
    }
}
/** @tagname ds-segmented-button */
export declare class DsSegmentedButton extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Visual size propagated to all items. */
    size: DsSegmentedButtonSize;
    /** Disables all items in the group. */
    isDisabled: boolean;
    /** Makes all buttons fill the group width equally instead of hugging content. */
    widthFill: boolean;
    private _getItems;
    private _syncChildren;
    updated(): void;
    private _onSlotChange;
    private _onSegmentedChange;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-segmented-button': DsSegmentedButton;
    }
}
//# sourceMappingURL=ds-segmented-button.d.ts.map