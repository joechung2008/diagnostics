import { Menu, type MenuProps } from "antd";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  const items = links.map((link) => ({
    key: link.key,
    label: link.name,
  }));

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const link = links.find(({ key }) => key === info.key);
    if (link) {
      onLinkClick?.(info.domEvent, link);
    }
  };

  return (
    <div className="extension-root">
      <Menu
        aria-label="Extensions"
        items={items}
        mode="vertical"
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default Extensions;
