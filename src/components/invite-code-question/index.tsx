import { colors, fonts } from '../../assets';
import { ArrowRightBoldIcon, BackIcon } from '../../assets/icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export type InviteCodeQuestionScreenProps = {
  onPress: (withCode: boolean) => void;
  onPressBack: () => void;
};

const InviteCodeQuestionScreen = (props: InviteCodeQuestionScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          props.onPressBack();
        }}
        style={styles.backButtonContainerStyle}
      >
        {<BackIcon width={17} height={12} />}
      </TouchableOpacity>
      <Text style={styles.title}>Did you receive an Invite Code?</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.actionButton}
        onPress={() => {
          props.onPress({ withCode: true });
        }}
      >
        <Text style={styles.actionText}>YES, I received an Invite Code.</Text>
        <ArrowRightBoldIcon size={12} color="#FF9800" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.actionButton}
        onPress={() => {
          props.onPress({ withCode: false });
        }}
      >
        <Text style={styles.actionText}>NO, I didn't receive an Invite Code.</Text>
        <ArrowRightBoldIcon size={12} color="#FF9800" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 36,
    color: colors.primary,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  backButtonContainerStyle: {
    padding: 15,
    marginLeft: 12,
    marginBottom: 8,
    width: 100,
  },
  actionButton: {
    height: 60,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowColor: '#000000',
    marginHorizontal: 24,
    marginVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  actionText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#000000',
  },
});

export default InviteCodeQuestionScreen;
