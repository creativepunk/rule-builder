import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-search.js';
import type { DsSearchVariant } from './ds-search.js';
interface SearchArgs {
    variant: DsSearchVariant;
    placeholder: string;
    ariaLabel?: string;
    disabled: boolean;
    value?: string;
    name?: string;
    closeButtonAssistiveText: string;
}
declare const meta: Meta<SearchArgs>;
export default meta;
type Story = StoryObj<SearchArgs>;
export declare const Default: Story;
export declare const ExpandableGhost: Story;
export declare const ExpandableTertiary: Story;
export declare const Expanded: Story;
export declare const Disabled: Story;
export declare const ShowcaseVariants: Story;
export declare const ShowcaseStates: Story;
//# sourceMappingURL=ds-search.stories.d.ts.map