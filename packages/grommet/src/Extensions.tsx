import { byKey, isExtensionInfo, toNavLink } from "./utils";
import { Nav, Button } from "grommet";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  return (
    <Nav
      aria-label="Extensions"
      className="extension-root overflow-x-hidden"
      direction="column"
      gap="small"
      pad="small"
    >
      {links.map((link) => (
        <Button
          key={link.key}
          label={link.name}
          plain
          onClick={(e) => onLinkClick?.(e, link)}
        />
      ))}
    </Nav>
  );
};

export default Extensions;
