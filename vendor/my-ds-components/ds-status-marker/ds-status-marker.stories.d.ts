import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-status-marker.js';
import type { DsStatusMarkerStatus, DsStatusMarkerType } from './ds-status-marker.js';
interface StatusMarkerArgs {
    status: DsStatusMarkerStatus;
    type: DsStatusMarkerType;
    label: string;
}
declare const meta: Meta<StatusMarkerArgs>;
export default meta;
type Story = StoryObj<StatusMarkerArgs>;
export declare const Default: Story;
export declare const Subtle: Story;
export declare const Bold: Story;
export declare const Bolder: Story;
export declare const Boldest: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const InProgress: Story;
export declare const Live: Story;
export declare const Undefined: Story;
export declare const Inactive: Story;
export declare const ShowcaseStatuses: Story;
export declare const ShowcaseTypes: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-status-marker.stories.d.ts.map