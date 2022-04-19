import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { OtpVerificationComponentStyles } from '.';
import { colors, fonts } from '../../assets';

const useMergeStyles = (style?: OtpVerificationComponentStyles): OtpVerificationComponentStyles => {
  const defaultStyles: OtpVerificationComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    countdownContainerStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 40,
    },
    sendAnotherTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      textDecorationLine: 'none',
      color: '#FF9800',
    },
    durationTextStyle: {
      fontFamily: fonts.medium,
      fontStyle: 'italic',
      fontSize: 12,
      lineHeight: 21,
      color: 'grey',
    },
    notReceivedCodeTextStyle: {
      fontFamily: fonts.medium,
      fontStyle: 'italic',
      fontSize: 12,
      lineHeight: 21,
      color: '#000000',
    },
    errorCodeTextStyle: {
      fontFamily: fonts.medium,
      fontStyle: 'italic',
      fontSize: 12,
      lineHeight: 21,
      alignSelf: 'center',
      marginTop: 10,
      // backgroundColor: 'red',
      color: '#D32F2F',
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    mainErrorContainer: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
      alignSelf: 'center',
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
    },
    headerContainer: {},
    labelTextStyle: {
      fontSize: 12,
      lineHeight: 21,
      fontFamily: fonts.medium,
      color: colors.primaryText,
      marginBottom: 3,
      marginTop: 20,
    },
    noteContainer: {
      borderRadius: 8,
      // backgroundColor: '#E7DBF5',
      // width: 327,
      padding: 15,
      paddingTop: 0,
      paddingHorizontal: 24,
    },
    noteText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#4E4B50',
      lineHeight: 24,
    },
    otpErrorFieldStyle: {
      focusCellContainerStyle: {
        borderBottomColor: '#D32F2F',
      },
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
