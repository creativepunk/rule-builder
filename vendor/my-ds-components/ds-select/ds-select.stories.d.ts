import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-select.js';
import '../ds-single-select-menu/ds-single-select-menu.js';
import '../ds-multi-select-menu/ds-multi-select-menu.js';
import type { DsSelectSelection, DsSelectType, DsSelectionFeedback } from './ds-select.js';
interface SelectArgs {
    selection: DsSelectSelection;
    type: DsSelectType;
    selectionFeedback: DsSelectionFeedback;
    label: string;
    placeholder: string;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    isRequired: boolean;
    isClearable: boolean;
    disabled: boolean;
    readonly: boolean;
    invalid: boolean;
    valid: boolean;
}
declare const meta: Meta<SelectArgs>;
export default meta;
type Story = StoryObj<SelectArgs>;
export declare const Default: Story;
export declare const SingleVariant: Story;
export declare const MultiVariant: Story;
export declare const InlineType: Story;
export declare const Required: Story;
export declare const Disabled: Story;
export declare const ReadOnly: Story;
export declare const Error: Story;
export declare const Valid: Story;
export declare const ShowcaseVariants: Story;
export declare const ShowcaseTypes: Story;
export declare const ShowcaseStates: Story;
//# sourceMappingURL=ds-select.stories.d.ts.map