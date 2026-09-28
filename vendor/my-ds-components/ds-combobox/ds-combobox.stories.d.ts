import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-combobox.js';
import type { DsComboboxType } from './ds-combobox.js';
interface ComboboxArgs {
    selection: 'single' | 'multi';
    type: DsComboboxType;
    label: string;
    placeholder: string;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    isRequired: boolean;
    isClearable: boolean;
    loading: boolean;
    disabled: boolean;
    readonly: boolean;
    invalid: boolean;
    valid: boolean;
}
declare const meta: Meta<ComboboxArgs>;
export default meta;
type Story = StoryObj<ComboboxArgs>;
export declare const Default: Story;
export declare const SingleSelect: Story;
export declare const MultiSelect: Story;
export declare const WithDescriptions: Story;
export declare const Loading: Story;
export declare const Disabled: Story;
export declare const ReadOnly: Story;
export declare const Error: Story;
export declare const Valid: Story;
export declare const Inline: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseVariants: Story;
//# sourceMappingURL=ds-combobox.stories.d.ts.map