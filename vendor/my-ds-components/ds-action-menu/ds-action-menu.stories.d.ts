import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-action-menu.js';
import '../ds-icon/ds-icon.js';
import type { DsActionMenuItemSize, DsActionMenuItemVariant } from './ds-action-menu-item.js';
interface Args {
    size: DsActionMenuItemSize;
    variant: DsActionMenuItemVariant;
    disabled: boolean;
    shortcut: string;
    hasSubMenu: boolean;
    isChecked: boolean;
}
declare const meta: Meta<Args>;
export default meta;
type Story = StoryObj<Args>;
export declare const Default: Story;
export declare const WithGroups: Story;
export declare const WithTitles: Story;
export declare const Danger: Story;
export declare const Disabled: Story;
export declare const SizeSmall: Story;
export declare const WithSubMenu: Story;
export declare const WithShortcuts: Story;
export declare const WithCheckedItems: Story;
export declare const WithoutIcons: Story;
export declare const ShowcaseSizes: Story;
//# sourceMappingURL=ds-action-menu.stories.d.ts.map