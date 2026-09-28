import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
/**
 * Global component reset applied to every :host.
 * Ensures box-model consistency across shadow roots.
 */
export declare const resetStyles: import("lit").CSSResult;
/**
 * Focus ring styles using the design system focus tokens.
 * Apply to interactive elements via the .ds-focus-ring mixin pattern.
 */
export declare const focusRingStyles: import("lit").CSSResult;
/**
 * Standard focus ring for inner elements (buttons, inputs).
 * outline automatically follows the element's own border-radius at the
 * 2px offset — no border-radius override needed here.
 */
export declare const innerFocusRingStyles: import("lit").CSSResult;
/**
 * Inset focus ring for elements that sit inside a bordered container (e.g.
 * text inputs) where an outset ring would be clipped by the parent.
 * Mirrors ADS Focusable isInset: uses --ds-focus-focus-inset (gray-100) and
 * a negative offset so the ring renders inside the element boundary.
 */
export declare const insetFocusRingStyles: import("lit").CSSResult;
/**
 * Visually hidden — accessible but invisible.
 * For screen-reader-only text.
 */
export declare const srOnlyStyles: import("lit").CSSResult;
/**
 * Typography base applied to all components.
 * Sets font family from the design token.
 */
export declare const typographyBaseStyles: import("lit").CSSResult;
/**
 * Composite typography utility classes — one class per Figma text style.
 * Adopt into a shadow root via static styles to use class="text-*" on
 * inner elements, mirroring Figma's single-name text-style assignment.
 */
export declare const typographyStyles: import("lit").CSSResult;
//# sourceMappingURL=styles.d.ts.map