import React, { useEffect, useRef, useContext, useState, forwardRef } from 'react';
import { BackIcon } from '../../assets/icons';
import { colors } from '../../assets';
import { Platform, SafeAreaView, Text, TouchableOpacity, View, Keyboard } from 'react-native';

import { Button, OTPField, CountdownTimer } from 'react-native-theme-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegistrationContext } from '../../context/registration-context';
import { i18n } from '@/translations/translation-config';
import { OTPFieldStyles } from 'react-native-theme-component/src/otp-field';
import { CountDownTimerRef } from 'react-native-theme-component/src/countdown-timer';
import useMergeStyles from './styles';

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/reducers';
// import { verifyInviteCodeActions } from '@/redux/actions';
// import { uiActions } from '@/redux/actions/ui';

export type OtpVerificationProps = {
  onPress: () => void;
  onPressBack: () => void;
  style?: OtpVerificationComponentStyles;
};

export type OtpVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  countdownContainerStyle?: StyleProp<ViewStyle>;
  notReceivedCodeTextStyle?: StyleProp<TextStyle>;
  sendAnotherTextStyle?: StyleProp<TextStyle>;
  durationTextStyle?: StyleProp<TextStyle>;
  otpFieldStyle?: OTPFieldStyles;
  errorCodeTextStyle?: StyleProp<TextStyle>;
};

const OtpVerification = forwardRef((props: OtpVerificationProps) => {
  const { onPress, onPressBack, style } = props;
  const countdownRef = useRef<CountDownTimerRef>();
  const styles: OtpVerificationComponentStyles = useMergeStyles(style);
  const {
    userMobileNumber,
    isVerify,
    otpVerification,
    activationToken,
    errorUserVerify,
    register,
    validateToken,
    clearUserVerificationError,
  } = useContext(RegistrationContext);

  const [value, setValue] = useState('');
  const [isSentOtp, setIsSentOtp] = useState(false);

  const formikRef: any = useRef(null);

  const handleOnValidate = async () => {
    Keyboard.dismiss();
    const onSubmit = await otpVerification(activationToken, value);
    if (onSubmit) {
      onPress();
    } else if (errorUserVerify) {
      formikRef?.current?.setFieldError('code', 'Invalid invite code');
    }
  };

  const resendOtp = async () => {
    setIsSentOtp(true);
    clearUserVerificationError();
    const validInvitation = await register(
      validateToken,
      userMobileNumber,
      'firstName',
      'lastName'
    );
    if (validInvitation) {
      setIsSentOtp(false);
    } else if (errorUserVerify) {
      setIsSentOtp(false);
      formikRef?.current?.setFieldError('code', 'Invalid invite code');
    }
  };

  useEffect(() => {
    if (isSentOtp) {
      countdownRef.current?.restart();
    }
  }, [isSentOtp]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onPressBack();
          }}
          style={styles.backButtonContainerStyle}
        >
          {<BackIcon width={17} height={12} />}
        </TouchableOpacity>
        <Text style={styles.title}>{i18n?.t('otp_verification.title')}</Text>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            {i18n?.t('otp_verification.description') + `${userMobileNumber.slice(-4)}`}
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.mainContainer}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
          extraScrollHeight={50}
        >
          <OTPField
            style={!errorUserVerify ? styles.otpFieldStyle : styles.otpErrorFieldStyle}
            cellCount={6}
            onChanged={setValue}
          />
          {errorUserVerify && (
            <View style={styles.mainErrorContainer}>
              <Text style={styles.errorCodeTextStyle}>
                {errorUserVerify?.response?.data?.errors[0]?.message}
              </Text>
            </View>
          )}
          <View style={styles.countdownContainerStyle}>
            <Text style={styles.notReceivedCodeTextStyle}>
              {i18n?.t('authorize_transfer_component.lbl_didnt_receive_otp') ??
                "Didn't receive a code? "}
            </Text>
            <CountdownTimer
              ref={countdownRef}
              duration={60}
              formatTime={(sec) =>
                i18n
                  ?.t('authorize_transfer_component.lbl_duration_format')
                  ?.replace('%s', sec.toString()) ?? `Send another (in ${sec} sec)`
              }
              endText={i18n?.t('authorize_transfer_component.btn_send_another') ?? 'Send another'}
              style={{
                endTextStyle: styles.sendAnotherTextStyle,
                runningTextStyle: styles.durationTextStyle,
              }}
              onResend={() => resendOtp()}
            />
          </View>
        </KeyboardAwareScrollView>
        <Button
          onPress={() => {
            handleOnValidate();
          }}
          label="Proceed"
          isLoading={isVerify}
          disabled={value.length < 6}
          disableColor={colors.secondaryButton}
          style={{
            primaryContainerStyle: {
              marginHorizontal: 24,
              marginBottom: Platform.OS === 'android' ? 24 : 0,
            },
          }}
        />
      </SafeAreaView>
    </View>
  );
});

export default OtpVerification;
