import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-toggle.js';
import type { DsToggleSize } from './ds-toggle.js';
interface ToggleArgs {
    isChecked: boolean;
    isDisabled: boolean;
    isLoading: boolean;
    size: DsToggleSize;
    label: string;
    description: string;
    name: string;
    value: string;
    ariaLabel: string;
}
declare const meta: Meta<ToggleArgs>;
export default meta;
type Story = StoryObj<ToggleArgs>;
export declare const Default: Story;
export declare const Checked: Story;
export declare const Disabled: Story;
export declare const DisabledChecked: Story;
export declare const Loading: Story;
export declare const LoadingChecked: Story;
export declare const SizeSm: Story;
export declare const NoLabel: Story;
export declare const ShowcaseVariants: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-toggle.stories.d.ts.map