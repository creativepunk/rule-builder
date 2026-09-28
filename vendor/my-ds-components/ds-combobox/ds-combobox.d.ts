import { LitElement } from 'lit';
import '../ds-field-input/ds-field-input.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
import '../ds-single-select-menu/ds-single-select-menu.js';
import '../ds-multi-select-menu/ds-multi-select-menu.js';
export type DsComboboxType = 'default' | 'inline';
export interface DsComboboxOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
/** @tagname ds-combobox */
export declare class DsCombobox extends LitElement {
    static styles: import("lit").CSSResult[];
    selection: 'single' | 'multi';
    type: DsComboboxType;
    label: string;
    placeholder: string;
    options: DsComboboxOption[];
    values: string[];
    helperText: string;
    errorMessage: string;
    successMessage: string;
    isRequired: boolean;
    loading: boolean;
    isClearable: boolean;
    disabled: boolean;
    readonly: boolean;
    invalid: boolean;
    valid: boolean;
    private _open;
    private _query;
    private _focusedIndex;
    private _input;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private get _filtered();
    private _openDropdown;
    private _closeDropdown;
    private _onTriggerClick;
    private _onInputInput;
    private _onInputKeydown;
    private _onItemSelect;
    private _activateFocusedItem;
    private _focusedItemEl;
    private _onClearClick;
    private _onDocClick;
    private _onDocKeydown;
    private _onDropdownMouseover;
    private _scrollFocusedIntoView;
    private _syncFocusedAttr;
    render(): import("lit").TemplateResult<1>;
    protected updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-combobox': DsCombobox;
    }
}
//# sourceMappingURL=ds-combobox.d.ts.map