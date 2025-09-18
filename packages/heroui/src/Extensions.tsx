import { Button } from "@heroui/react";
import { useMemo } from "react";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

const Extensions: React.FC<ExtensionsProps> = ({
  extensions,
  onLinkClick,
}: ExtensionsProps) => {
  const links = useMemo(
    () =>
      Object.values(extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey),
    [extensions]
  );

  return (
    <nav
      className="flex flex-col gap-1 max-h-max overflow-y-auto p-0.5"
      aria-label="Extensions"
    >
      {links.map((link) => (
        <Button
          key={link.key}
          className="box-border justify-start min-h-8 text-left w-full"
          variant="light"
          onPress={(e) => {
            onLinkClick?.(e, link);
          }}
        >
          {link.name}
        </Button>
      ))}
    </nav>
  );
};

export default Extensions;
