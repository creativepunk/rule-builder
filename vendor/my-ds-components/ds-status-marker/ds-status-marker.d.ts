import { LitElement } from 'lit';
import '../ds-icon/ds-icon.js';
export type DsStatusMarkerStatus = 'failed' | 'in-progress' | 'success' | 'undefined' | 'warning' | 'in-active' | 'live';
export type DsStatusMarkerType = 'subtle' | 'bold' | 'bolder' | 'boldest';
/** @tagname ds-status-marker */
export declare class DsStatusMarker extends LitElement {
    static styles: import("lit").CSSResult[];
    status: DsStatusMarkerStatus;
    type: DsStatusMarkerType;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-status-marker': DsStatusMarker;
    }
}
//# sourceMappingURL=ds-status-marker.d.ts.map