declare module "@remixicon/react" {
  import * as React from "react";

  export type RemixiconProps = React.SVGProps<SVGSVGElement> & {
    size?: string | number;
    color?: string;
    // allow arbitrary additional props
    [key: string]: any;
  };

  // Commonly-used named exports in this repo — typed as generic React components
  export const RiArrowUpSLine: React.ComponentType<RemixiconProps>;
  export const RiLoader2Fill: React.ComponentType<RemixiconProps>;
  export const RiArrowRightSLine: React.ComponentType<RemixiconProps>;
  export const RiCheckboxBlankCircleLine: React.ComponentType<RemixiconProps>;
  export const RiCheckLine: React.ComponentType<RemixiconProps>;
  export const RiRadioButtonFill: React.ComponentType<RemixiconProps>;

  // Fallback for any other named export
  const _default: { [key: string]: React.ComponentType<any> };
  export default _default;
}
