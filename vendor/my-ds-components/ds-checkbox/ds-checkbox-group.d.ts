import { LitElement } from 'lit';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
import './ds-checkbox.js';
export type DsCheckboxGroupOrientation = 'vertical' | 'horizontal';
export type DsCheckboxGroupType = 'stacked' | 'inline';
/** @tagname ds-checkbox-group */
export declare class DsCheckboxGroup extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Text label for the whole group. */
    label: string;
    /** Appends a red asterisk to the group label. */
    isRequired: boolean;
    /** Shows info tip icon on the group label. */
    hasInfoTip: boolean;
    /** Puts the entire group in an error state. */
    hasError: boolean;
    /** Disables all child checkboxes. */
    isDisabled: boolean;
    /** Makes all child checkboxes read-only. */
    isReadOnly: boolean;
    /** Lays items out horizontally or vertically. */
    optionOrientation: DsCheckboxGroupOrientation;
    /** `default` = standard spacing; `inline` = compact, same layout rules. */
    type: DsCheckboxGroupType;
    /** Helper text shown below the group when there is no error. */
    helperText: string;
    /** Error text shown below the group when hasError is true. */
    errorText: string;
    /** HTML form field name propagated to all child checkboxes. */
    name: string;
    private _getCheckboxes;
    private _syncChildren;
    updated(): void;
    private _onSlotChange;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-checkbox-group': DsCheckboxGroup;
    }
}
//# sourceMappingURL=ds-checkbox-group.d.ts.map