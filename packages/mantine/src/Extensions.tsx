import { Button, Text } from "@mantine/core";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  return (
    <nav className="extension-root" aria-label="Extensions">
      {links.map((link) => (
        <Button
          key={link.key}
          className="extension-nav-button"
          variant="subtle"
          onClick={(e) => onLinkClick?.(e, link)}
        >
          <Text size="sm">{link.name}</Text>
        </Button>
      ))}
    </nav>
  );
};

export default Extensions;
