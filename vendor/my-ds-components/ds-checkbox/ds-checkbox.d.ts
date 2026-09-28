import { LitElement } from 'lit';
export type DsCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
/** @tagname ds-checkbox */
export declare class DsCheckbox extends LitElement {
    static formAssociated: boolean;
    private _internals;
    static styles: import("lit").CSSResult[];
    /** Controlled checked state. */
    isChecked: boolean;
    /** Shows a dash instead of a checkmark; used by parent group for partial selection. */
    isIndeterminate: boolean;
    /** Prevents interaction and dims the control. */
    isDisabled: boolean;
    /** Prevents interaction; retains opacity but shows a read-only appearance. */
    isReadOnly: boolean;
    /** Renders the border in danger color. */
    hasError: boolean;
    /** Appends a red asterisk after the label. */
    isRequired: boolean;
    /** Label text. Alternatively, use the default slot. */
    label: string;
    /** Optional helper/description text rendered beneath the label. */
    description: string;
    /** Form field name. */
    name: string;
    /** Form field value. */
    value: string;
    /** ID forwarded to the native input; useful for external <label for="..."> or aria-describedby. */
    inputId: string;
    /** Tooltip set on the <label> element. */
    title: string;
    private _hasDefaultSlot;
    private _hasChildrenSlot;
    constructor();
    private _onDefaultSlotChange;
    private _onChildrenSlotChange;
    private _handleChange;
    private _handleKeyDown;
    private _checkIcon;
    private _dashIcon;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-checkbox': DsCheckbox;
    }
}
//# sourceMappingURL=ds-checkbox.d.ts.map