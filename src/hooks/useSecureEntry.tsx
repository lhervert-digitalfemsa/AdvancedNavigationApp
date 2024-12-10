import { useState } from 'react';
import { TouchableWithoutFeedback } from "react-native";

import { Icon } from '@ui-kitten/components';

export const useSecureEntry = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry} testID='secure-touchable'>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  return {
    secureTextEntry,
    toggleSecureEntry,
    renderIcon,
  }
}