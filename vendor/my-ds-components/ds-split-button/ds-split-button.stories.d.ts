import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-split-button.js';
import '../ds-icon/ds-icon.js';
import type { DsSplitButtonSize, DsSplitButtonVariant, DsSplitButtonType } from './ds-split-button.js';
interface SplitButtonArgs {
    variant: DsSplitButtonVariant;
    type: DsSplitButtonType;
    size: DsSplitButtonSize;
    isDisabled: boolean;
    isMenuOpen: boolean;
    menuAriaLabel: string;
    label: string;
}
declare const meta: Meta<SplitButtonArgs>;
export default meta;
type Story = StoryObj<SplitButtonArgs>;
export declare const Default: Story;
export declare const Tertiary: Story;
export declare const IconType: Story;
export declare const TertiaryIcon: Story;
export declare const Disabled: Story;
export declare const DisabledTertiary: Story;
export declare const MenuOpen: Story;
export declare const ShowcaseVariants: Story;
export declare const ShowcaseTypes: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-split-button.stories.d.ts.map