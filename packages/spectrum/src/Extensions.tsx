import { ActionButton } from "@adobe/react-spectrum";
import { useMemo } from "react";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

import styles from "./Extensions.module.css";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = useMemo(
    () =>
      Object.values(extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey),
    [extensions]
  );

  return (
    <nav className={styles["extensions-root"]} aria-label="Extensions">
      {links.map((link) => (
        <ActionButton
          key={link.key}
          UNSAFE_className={styles.navButton}
          onPress={() => onLinkClick?.(undefined, link)}
        >
          {link.name}
        </ActionButton>
      ))}
    </nav>
  );
};

export default Extensions;
