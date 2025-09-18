import { Tab, Tabs } from "@blueprintjs/core";
import { useState } from "react";
import { byKey, isExtensionInfo, toNavLink } from "./utils";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  const [selectedTabId, setSelectedTabId] = useState<string>();

  return (
    <div className="extension-root">
      <Tabs
        vertical
        selectedTabId={selectedTabId}
        onChange={(tabId: string) => {
          setSelectedTabId(tabId);
          const link = links.find((l) => l.key === tabId);
          if (link) {
            onLinkClick(link);
          }
        }}
      >
        {links.map((link) => (
          <Tab
            key={link.key}
            aria-controls="extension"
            id={link.key}
            title={link.name}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default Extensions;
