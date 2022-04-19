import React, { useRef, useContext, useState, forwardRef } from 'react';
import { BackIcon, HelpIcon } from '../../assets/icons';
import { colors, fonts } from '../../assets';
import Loader from '../loader';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import { ResetPasswordData, ResetPasswordSchema } from './model';
import { Formik } from 'formik';

import { PasswordVerificationProps } from './types';

import { Button, InputField, CheckBox } from 'react-native-theme-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegistrationContext } from '../../context/registration-context';
import { i18n } from '@/translations/translation-config';
import Tooltip from 'react-native-walkthrough-tooltip';
/* eslint-disable no-useless-escape */
const PasswordVerification = forwardRef((props: PasswordVerificationProps) => {
  const { Root, InputForm } = props;
  const { addUserPassword, isPassword, userMobileNumber, passwordToken, isSetPassword } =
    useContext(RegistrationContext);

  const [isSelected1, setSelected1] = useState(false);
  const [isSelected2, setSelected2] = useState(false);
  const [isSelected3, setSelected3] = useState(false);
  const [isSelected4, setSelected4] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const formikRef: any = useRef(null);

  const handleOnValidate = async (password: string) => {
    Keyboard.dismiss();

    const validInvitation = await addUserPassword(passwordToken, password);
    if (validInvitation) {
      handleSign(password);
      // Root?.props?.onLoginSuccess?.(validInvitation);
      // Root.props.onPressBack()
    }
  };

  const onValidatePassword = (password: string) => {
    const purifiedPassword = password.replace(/\s/g, '');
    const hasNumber = /\d/;
    const isUpperCase = /^(?=.*?[A-Z])/;
    const isSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    // check password length is graterthan 7
    if (purifiedPassword.length > 7) {
      setSelected1(true);
    } else {
      setSelected1(false);
    }
    // check password contain at least 1 number
    if (purifiedPassword.length > 0 && hasNumber.test(purifiedPassword)) {
      setSelected2(true);
    } else {
      setSelected2(false);
    }
    // check password contain at least 1 upper case
    if (purifiedPassword.length > 0 && isUpperCase.test(purifiedPassword)) {
      setSelected3(true);
    } else {
      setSelected3(false);
    }
    // check password contain at least 1 special character
    if (purifiedPassword.length > 0 && isSpecialCharacter.test(purifiedPassword)) {
      setSelected4(true);
    } else {
      setSelected4(false);
    }
  };

  const handleSign = async (password: string) => {
    let country = {
      id: 495,
      type: 'CountryInfo',
      attributes: {
        code3: 'VNM',
        code2: 'VN',
        name: 'Vietnam',
        capitalCity: 'Hanoi',
        flagUrlRect: 'images/flags/vietnam_re',
        flagUrlRound: 'images/flags/vietnam_ci',
        idd: '84',
        active: true,
        region: 'Asia',
        currencyInfo: {
          listCurrency: [
            {
              name: 'Viet Nam Dong',
              code: 'VND',
              symbol: '₫',
              isPrimary: true,
              displaySymbol: '₫',
              displayFormat: '#,###',
              displaySymbolFirst: false,
              isoCode: '704',
              displaySpace: 1,
            },
          ],
        },
      },
    };
    let data = {
      phoneNumber: userMobileNumber,
      password: password,
      country,
      firstName: '',
      lastName: '',
    };
    Root.props.onPress(data);
    // try {
    //   const _profile = await login(userMobileNumber, password);
    //   if (_profile) {
    //
    //     navigation.navigate(Route.Route.CUSTOMER_INVOKE_SCREEN, {
    //       phoneNumber: userMobileNumber,
    //       password: password,
    //       country,
    //       firstName: '',
    //       lastName: '',
    //     });
    //   }
    // } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {!isSetPassword && (
        <>
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
            <Text style={styles.title}>{i18n?.t('password_verification.title')}</Text>
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>{i18n?.t('password_verification.description')}</Text>
            </View>
          </SafeAreaView>
          <Formik
            innerRef={formikRef}
            enableReinitialize={true}
            initialValues={ResetPasswordData.empty()}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => {
              handleOnValidate(values.password);
            }}
          >
            {({ handleChange, isValid, submitForm }) => {
              return (
                <SafeAreaView style={styles.container}>
                  <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    style={styles.mainContainer}
                    keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                    showsVerticalScrollIndicator={false}
                    extraScrollHeight={50}
                  >
                    <Text> {i18n?.t('password_verification.lbl_password') ?? 'password'} </Text>
                    <InputField
                      name="password"
                      returnKeyType="done"
                      secureTextEntry={InputForm?.props?.isVisiblePassword}
                      placeholder={i18n?.t('password_verification.lbl_password') ?? 'Password'}
                      autoCapitalize="none"
                      formatError={Root?.props?.formatError}
                      style={InputForm?.style?.passwordInputFieldStyle}
                      suffixIcon={InputForm?.component?.suffixIcon ?? <></>}
                      onChange={(e) => {
                        console.log('e.currentTarget.value ', e.nativeEvent.text);
                        onValidatePassword(e.nativeEvent.text);
                        handleChange('password');
                        // this.handleOffence( );
                      }}
                    />
                    <View style={styles.inputContainer}>
                      <Text>
                        {' '}
                        {i18n?.t('password_verification.lbl_confirm_password') ?? 'password'}{' '}
                      </Text>
                      <InputField
                        name="confirmPassword"
                        returnKeyType="done"
                        secureTextEntry={InputForm?.props?.isConfirmVisiblePassword}
                        placeholder={
                          i18n?.t('password_verification.lbl_confirm_password') ?? 'Password'
                        }
                        autoCapitalize="none"
                        formatError={Root?.props?.confirmFormatError}
                        style={InputForm?.style?.passwordInputFieldStyle}
                        suffixIcon={InputForm?.component?.confirmSuffixIcon ?? <></>}
                      />
                    </View>
                    <View style={styles.checkBoxWrapper}>
                      <CheckBox
                        title="Must be at least 8 characters"
                        isSelected={isSelected1}
                        onChanged={(value) => {
                          console.log('value ', value);
                        }}
                        style={InputForm?.style?.checkBoxInputFieldStyle}
                        // disabled
                      />
                    </View>
                    <View style={styles.checkBoxWrapper}>
                      <CheckBox
                        title="Must contain at least 1 number"
                        isSelected={isSelected2}
                        onChanged={(value) => {
                          console.log('value ', value);
                        }}
                        style={InputForm?.style?.checkBoxInputFieldStyle}
                      />
                    </View>
                    <View style={styles.checkBoxWrapper}>
                      <CheckBox
                        title="Must contain at least 1 upper case"
                        isSelected={isSelected3}
                        onChanged={(value) => {
                          console.log('value ', value);
                        }}
                        style={InputForm?.style?.checkBoxInputFieldStyle}
                      />
                    </View>
                    <View style={styles.checkBoxWrapperWithTooltip}>
                      <CheckBox
                        title="Must contain at least 1 special character "
                        isSelected={isSelected4}
                        onChanged={(value) => {
                          console.log('value ', value);
                        }}
                        style={InputForm?.style?.checkBoxInputFieldStyle}
                      />
                      {
                        <Tooltip
                          isVisible={toolTipVisible}
                          content={<Text>(ex. @!.,$/%^)</Text>}
                          placement="top"
                          onClose={() => setToolTipVisible(false)}
                          backgroundColor={'rgba(0,0,0,0.0)'}
                          placement={'bottom'}
                          tooltipStyle={styles.tooltip}
                          contentStyle={styles.tooltipContent}
                          arrowStyle={styles.tooltipArrow}
                        >
                          <TouchableHighlight onPress={() => setToolTipVisible(true)}>
                            <HelpIcon width={18} height={18} />
                          </TouchableHighlight>
                        </Tooltip>
                      }
                    </View>
                  </KeyboardAwareScrollView>
                  <Button
                    onPress={submitForm}
                    label={i18n?.t('common.btn_next')}
                    isLoading={isPassword}
                    disabled={
                      !isSelected1 || !isSelected2 || !isSelected3 || !isSelected4 || !isValid
                    }
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
        </>
      )}
      {isSetPassword && <Loader />}
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
  inputContainer: {
    paddingVertical: 20,
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
  checkBoxWrapper: { marginBottom: 19 },
  checkBoxWrapperWithTooltip: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  tooltip: { marginLeft: -5 },
  tooltipContent: { marginLeft: -1, borderRadius: 2 },
  tooltipArrow: { marginLeft: 4 },
});

export default PasswordVerification;
