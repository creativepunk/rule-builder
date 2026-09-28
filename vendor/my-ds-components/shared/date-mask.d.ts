export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY';
export declare function isoToFriendly(iso: string): string;
export interface MaskState {
    month: string;
    day: string;
    year: string;
    segment: 'month' | 'day' | 'year';
}
export declare const EMPTY_MASK: MaskState;
export declare function buildMaskDisplay(state: MaskState): string;
export declare function getMaskCursorPos(state: MaskState): number;
export declare function isMaskComplete(state: MaskState): boolean;
export declare function maskToIso(state: MaskState): string;
export declare function isoToMask(iso: string): MaskState;
export declare function applyMaskDigit(state: MaskState, digit: string): MaskState;
export declare function applyMaskBackspace(state: MaskState): MaskState;
export declare function getMaskSegmentFromCursorPos(pos: number): 'month' | 'day' | 'year';
//# sourceMappingURL=date-mask.d.ts.map