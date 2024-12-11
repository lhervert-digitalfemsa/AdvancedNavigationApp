import React from 'react';
import {MenuItem, Icon, Divider} from '@ui-kitten/components';

type SettingsItemProps = {
  title: string;
  showDivider?: boolean;
};
export default function SettingsItem({
  title,
  showDivider = true,
}: Readonly<SettingsItemProps>) {
  return (
    <>
      <MenuItem
        title={title}
        accessoryRight={<Icon name="arrow-ios-forward" />}
        onPress={() => console.log(`Navigation to ${title}`)}
      />
      {showDivider && <Divider />}
    </>
  );
}
