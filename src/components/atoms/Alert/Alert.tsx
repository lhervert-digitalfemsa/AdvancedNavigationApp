import React, { useState, useEffect } from 'react';
import { Card, Text } from '@ui-kitten/components';

import { styles } from './Alert.styles';

type PropsT = {
  text: string;
};

const Alert = ({ text }: PropsT) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Card style={styles.card} status="danger">
      <Text category="label">{text}</Text>
    </Card>
  );
};

export default Alert;
