import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-single-select-menu.js';
import type { DsSingleSelectMenuItemSize } from './ds-single-select-menu-item.js';
interface Args {
    size: DsSingleSelectMenuItemSize;
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
//# sourceMappingURL=ds-single-select-menu.stories.d.ts.map