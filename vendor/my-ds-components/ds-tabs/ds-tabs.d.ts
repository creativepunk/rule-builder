import { LitElement } from 'lit';
import type { DsTabChangeEvent } from '../shared/events.js';
export type { DsTabChangeEvent };
/** @tagname ds-tab */
export declare class DsTab extends LitElement {
    static styles: import("lit").CSSResult[];
    value: string;
    isSelected: boolean;
    isDisabled: boolean;
    /** When true, renders the count badge alongside the label. */
    count: number | undefined;
    groupDisabled: boolean;
    private get _effectivelyDisabled();
    private _handleClick;
    private _handleKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-tab': DsTab;
    }
}
/** @tagname ds-tabs */
export declare class DsTabs extends LitElement {
    static styles: import("lit").CSSResult[];
    /** The currently selected tab value. */
    value: string;
    /** Disables all tabs in the group. */
    isDisabled: boolean;
    private _getTabItems;
    private _syncChildren;
    private _handleTabChange;
    private _handleKeyDown;
    updated(changedProps: Map<string, unknown>): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-tabs': DsTabs;
    }
}
//# sourceMappingURL=ds-tabs.d.ts.map