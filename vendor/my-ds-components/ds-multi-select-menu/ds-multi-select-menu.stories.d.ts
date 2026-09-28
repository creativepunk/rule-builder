import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-multi-select-menu.js';
import type { DsMultiSelectMenuItemSize } from './ds-multi-select-menu-item.js';
interface Args {
    size: DsMultiSelectMenuItemSize;
    loading: boolean;
}
declare const meta: Meta<Args>;
export default meta;
type Story = StoryObj<Args>;
export declare const Default: Story;
export declare const WithGroups: Story;
export declare const Preselected: Story;
export declare const WithDescription: Story;
export declare const Loading: Story;
export declare const Empty: Story;
export declare const ShowcaseStates: Story;
//# sourceMappingURL=ds-multi-select-menu.stories.d.ts.map