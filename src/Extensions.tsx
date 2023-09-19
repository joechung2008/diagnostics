import { INavLinkGroup, INavStyles, Nav } from '@fluentui/react';
import { useCallback } from 'react';
import { byKey, isExtensionInfo, toNavLink } from './utils';

const styles: Pick<INavStyles, 'root'> = {
  root: {
    maxHeight: 'calc(100vh - 88px)',
  },
};

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const groups: INavLinkGroup[] = [
    {
      links: Object.values(extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey),
    },
  ];

  const handleRenderGroupHeader = useCallback(() => null, []);

  return (
    <Nav
      groups={groups}
      styles={styles}
      onLinkClick={onLinkClick}
      onRenderGroupHeader={handleRenderGroupHeader}
    />
  );
};

export default Extensions;
