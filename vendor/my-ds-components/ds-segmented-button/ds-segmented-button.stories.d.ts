import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-segmented-button.js';
import '../ds-icon/ds-icon.js';
import type { DsSegmentedButtonSize } from './ds-segmented-button.js';
interface SegmentedButtonArgs {
    size: DsSegmentedButtonSize;
    isDisabled: boolean;
}
declare const meta: Meta<SegmentedButtonArgs>;
export default meta;
type Story = StoryObj<SegmentedButtonArgs>;
export declare const Default: Story;
export declare const SmallSize: Story;
export declare const LargeSize: Story;
export declare const Disabled: Story;
export declare const ItemDisabled: Story;
export declare const TwoItems: Story;
export declare const WidthFill: Story;
export declare const IconOnly: Story;
export declare const IconOnlySizes: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-segmented-button.stories.d.ts.map