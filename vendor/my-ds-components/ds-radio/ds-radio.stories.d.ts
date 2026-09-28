import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-radio.js';
import './ds-radio-group.js';
interface RadioArgs {
    label: string;
    description: string;
    isChecked: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    hasError: boolean;
    isRequired: boolean;
    name: string;
    value: string;
    inputId: string;
    title: string;
}
declare const radioMeta: Meta<RadioArgs>;
export default radioMeta;
type RadioStory = StoryObj<RadioArgs>;
export declare const Default: RadioStory;
export declare const Selected: RadioStory;
export declare const WithDescription: RadioStory;
export declare const Disabled: RadioStory;
export declare const ReadOnly: RadioStory;
export declare const Error: RadioStory;
export declare const Required: RadioStory;
export declare const ShowcaseStates: RadioStory;
export declare const ShowcaseWithDescription: RadioStory;
//# sourceMappingURL=ds-radio.stories.d.ts.map