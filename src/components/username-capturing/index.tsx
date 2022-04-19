import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { BackIcon, PhoneIcon } from '../../assets/icons';
import { colors, fonts } from '../../assets';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import { UserNameData, UserNameSchema } from './model';
import { Formik } from 'formik';
import { i18n } from '@/translations/translation-config';

import { UsernameCapturingScreenProps, UsernameCapturingComponentRef } from './types';

import { Button, InputPhoneNumber, ThemeContext } from 'react-native-theme-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegistrationContext } from '../../context/registration-context';

const UsernameCapturingScreen = forwardRef((props: UsernameCapturingScreenProps, ref) => {
  const { Root, InputForm } = props;
  const { register, isRegistering, errorRegister, clearRegisterError, validateToken } =
    useContext(RegistrationContext);

  const { deviceCountryCode } = useContext(ThemeContext);
  const [dialCode, setDialCode] = useState(deviceCountryCode);

  const formikRef: any = useRef(null);

  useEffect(() => {
    if (errorRegister) {
      formikRef?.current?.setFieldError(
        'username',
        errorRegister?.response?.data?.errors[0]?.message
      );
      setTimeout(() => {
        clearRegisterError();
      }, 50);
    }
  }, [errorRegister, clearRegisterError]);

  useImperativeHandle(
    ref,
    (): UsernameCapturingComponentRef => ({
      updateCountryCode,
    })
  );

  const updateCountryCode = (code: string) => {
    setDialCode(code);
  };

  const handleOnValidate = async (mobileNumber: string) => {
    Keyboard.dismiss();

    const validInvitation = await register(validateToken, mobileNumber, 'firstName', 'lastName');
    if (validInvitation) {
      Root?.props?.onPress();
    } else if (errorRegister) {
      formikRef?.current?.setFieldError('code', 'Invalid invite code');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Root.props.onPressBack();
          }}
          style={styles.backButtonContainerStyle}
        >
          {<BackIcon width={17} height={12} />}
        </TouchableOpacity>
        <Text style={styles.title}>{i18n?.t('user_registration.user_name_header')}</Text>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>{i18n?.t('user_registration.user_name_description')}</Text>
        </View>
      </SafeAreaView>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={UserNameData.empty()}
        validationSchema={UserNameSchema}
        onSubmit={(values) => {
          handleOnValidate(values.username);
        }}
      >
        {({ isValid, submitForm }) => {
          return (
            <SafeAreaView style={styles.container}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.mainContainer}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={50}
              >
                <Text style={styles.labelTextStyle}>{'Your mobile number'}</Text>
                <InputPhoneNumber
                  dialCode={dialCode}
                  onPressDialCode={InputForm?.props?.onPressDialCode}
                  prefixIcon={
                    <View>
                      {InputForm?.component?.usernameIcon ?? (
                        <PhoneIcon width={30} height={30} color="grey" />
                      )}
                    </View>
                  }
                  name="username"
                  returnKeyType="done"
                  placeholder={i18n?.t('login_component.lbl_mobile_number') ?? 'Mobile number'}
                  autoCapitalize="none"
                  formatError={Root?.props?.formatError}
                  style={InputForm?.style?.userNameInputFieldStyle}
                  withDialCode={InputForm?.props?.withDialCode}
                />
              </KeyboardAwareScrollView>
              <Button
                onPress={submitForm}
                label="Proceed"
                isLoading={isRegistering}
                disabled={!isValid}
                disableColor={colors.secondaryButton}
                style={{
                  primaryContainerStyle: {
                    marginHorizontal: 24,
                    marginBottom: Platform.OS === 'android' ? 24 : 0,
                  },
                }}
              />
            </SafeAreaView>
          );
        }}
      </Formik>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
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
  headerContainer: {
    // backgroundColor: 'white',
    // shadowColor: '#646876',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // elevation: 3,
    // zIndex: 10,
    // alignItems: 'center',
    // paddingVertical: 40,
    // marginBottom: 20,
  },
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
});

export default UsernameCapturingScreen;
