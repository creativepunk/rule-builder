import { LitElement } from 'lit';
export type DsActionMenuItemVariant = 'default' | 'danger';
export type DsActionMenuItemSize = 'sm' | 'md';
/** @tagname ds-action-menu-item */
export declare class DsActionMenuItem extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: DsActionMenuItemVariant;
    value: string;
    disabled: boolean;
    size: DsActionMenuItemSize;
    /**
     * Show a chevron without slotting an actual sub-menu (visual-only hint).
     * If a <ds-action-menu slot="sub-menu"> is slotted, the chevron appears
     * automatically regardless of this prop.
     */
    hasSubMenu: boolean;
    /**
     * Keyboard shortcut hint shown in the trailing area (e.g. "⌘K").
     * Ignored when a sub-menu caret is visible.
     */
    shortcut: string;
    /**
     * Reserves a 24 px indent column on the left for alignment in
     * selection-group menus (radio / checkbox style). When combined
     * with `isChecked`, a checkmark is shown in that column.
     * Auto-set by `<ds-action-menu>` when any sibling item is checked.
     */
    isIndented: boolean;
    /** Renders a checkmark in the indent column. Requires `isIndented`. */
    isChecked: boolean;
    /**
     * Controls whether the 24 px leading-icon column is rendered.
     * Auto-set by `<ds-action-menu>`: true if any sibling has a leading icon,
     * false when the whole menu is icon-less (avoids phantom left indent).
     */
    showIconWrap: boolean;
    /**
     * How selection behaves — set automatically by the parent
     * `<ds-action-menu-group>` based on its own selection-type.
     * Drives the ARIA role: menuitemcheckbox vs menuitemradio vs menuitem.
     */
    selectionType: 'none' | 'checkbox' | 'radio';
    private _hasSubMenuSlot;
    private _subMenuOpen;
    private _closeTimer;
    private get _showCaret();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onHostEnter;
    private _onHostLeave;
    private _cancelClose;
    private _scheduleClose;
    private _openSubMenu;
    private _closeSubMenu;
    private _onSubMenuSlotChange;
    private _handleKeydown;
    render(): import("lit").TemplateResult<1>;
    private _handleClick;
}
//# sourceMappingURL=ds-action-menu-item.d.ts.map