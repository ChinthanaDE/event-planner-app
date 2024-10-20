import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface CustomHeaderProps {
  leftComponent: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftComponent,
  centerComponent = null,
  rightComponent = null,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>{leftComponent}</View>
      <View style={styles.centerContainer}>{centerComponent}</View>
      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
};

interface Styles {
  header: ViewStyle;
  leftContainer: ViewStyle;
  centerContainer: ViewStyle;
  rightContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
    height: 56,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftContainer: {
    width: 40,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default CustomHeader;
