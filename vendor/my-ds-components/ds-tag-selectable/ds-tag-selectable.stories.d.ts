import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-tag-selectable.js';
import '../ds-icon/ds-icon.js';
import type { DsTagSelectableSize } from './ds-tag-selectable.js';
interface TagSelectableArgs {
    size: DsTagSelectableSize;
    selected: boolean;
    disabled: boolean;
    hasIcon: boolean;
    label: string;
}
declare const meta: Meta<TagSelectableArgs>;
export default meta;
type Story = StoryObj<TagSelectableArgs>;
export declare const Default: Story;
export declare const Selected: Story;
export declare const WithIcon: Story;
export declare const WithIconSelected: Story;
export declare const Disabled: Story;
export declare const DisabledWithIcon: Story;
export declare const Small: Story;
export declare const Large: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-tag-selectable.stories.d.ts.map