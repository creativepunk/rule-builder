import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-form-message.js';
import type { DsFormMessageType } from './ds-form-message.js';
interface FormMessageArgs {
    type: DsFormMessageType;
    errorText: string;
    successText: string;
    helperText: string;
}
declare const meta: Meta<FormMessageArgs>;
export default meta;
type Story = StoryObj<FormMessageArgs>;
export declare const Default: Story;
export declare const Error: Story;
export declare const Success: Story;
export declare const Helper: Story;
export declare const ShowcaseTypes: Story;
//# sourceMappingURL=ds-form-message.stories.d.ts.map