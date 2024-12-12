import React from 'react';
import { MenuItem, Icon, Divider } from '@ui-kitten/components';

type SettingsItemProps = {
  title: string;
  showDivider?: boolean;
  onPress?: () => void;
};
export default function SettingsItem({
  title,
  showDivider = true,
  onPress,
}: Readonly<SettingsItemProps>) {
  return (
    <>
      <MenuItem
        title={title}
        onPress={onPress}
      />
      {showDivider && <Divider />}
    </>
  );
}
