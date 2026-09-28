import { LitElement } from 'lit';
import '../ds-icon/ds-icon.js';
export type DsFormMessageType = 'helper' | 'error' | 'success';
/** @tagname ds-form-message */
export declare class DsFormMessage extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Visual and semantic type — controls which text prop is displayed. */
    type: DsFormMessageType;
    /** Text shown when type="helper". */
    helperText: string;
    /** Text shown when type="error". */
    errorText: string;
    /** Text shown when type="success". */
    successText: string;
    private get _resolvedText();
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-form-message': DsFormMessage;
    }
}
//# sourceMappingURL=ds-form-message.d.ts.map