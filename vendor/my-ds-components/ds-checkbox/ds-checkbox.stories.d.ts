import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-checkbox.js';
import './ds-checkbox-group.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
interface CheckboxArgs {
    label: string;
    description: string;
    isChecked: boolean;
    isIndeterminate: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    hasError: boolean;
    isRequired: boolean;
    name: string;
    value: string;
    inputId: string;
    title: string;
}
declare const checkboxMeta: Meta<CheckboxArgs>;
export default checkboxMeta;
type CheckboxStory = StoryObj<CheckboxArgs>;
export declare const Default: CheckboxStory;
export declare const Checked: CheckboxStory;
export declare const Indeterminate: CheckboxStory;
export declare const WithDescription: CheckboxStory;
export declare const Disabled: CheckboxStory;
export declare const ReadOnly: CheckboxStory;
export declare const Error: CheckboxStory;
export declare const Required: CheckboxStory;
export declare const ShowcaseStates: CheckboxStory;
export declare const ShowcaseWithDescription: CheckboxStory;
//# sourceMappingURL=ds-checkbox.stories.d.ts.map