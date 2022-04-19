import React, { useEffect, useRef, useContext } from 'react';
import { BackIcon } from '../../assets/icons';
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
import { InviteCodeData, InviteCodeSchema } from './model';
import { Formik } from 'formik';

import { Button, InputField } from 'react-native-theme-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RegistrationContext } from '../../context/registration-context';

export type InviteCodeValidationScreenProps = {
  onPress: (withCode: string) => void;
  onPressBack: () => void;
};

const InviteCodeValidationScreen = (props: InviteCodeValidationScreenProps) => {
  const { validate, isValidating, errorValidate, clearValidateError } =
    useContext(RegistrationContext);

  const formikRef: any = useRef(null);

  useEffect(() => {
    if (errorValidate) {
      formikRef?.current?.setFieldError('code', errorValidate?.response?.data?.errors[0]?.message);
      setTimeout(() => {
        clearValidateError();
      }, 50);
    }
  }, [errorValidate, clearValidateError]);

  const handleOnValidate = async (code: string) => {
    Keyboard.dismiss();
    const validInvitation = await validate(code);
    if (validInvitation) {
      props.onPress(code);
    } else if (errorValidate) {
      setTimeout(() => {
        clearValidateError();
      }, 50);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.onPressBack();
          }}
          style={styles.backButtonContainerStyle}
        >
          {<BackIcon width={17} height={12} />}
        </TouchableOpacity>
        <Text style={styles.title}>We're excited to have you onboard!</Text>
      </SafeAreaView>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={InviteCodeData.empty()}
        validationSchema={InviteCodeSchema}
        onSubmit={(values) => {
          handleOnValidate(values.code);
        }}
      >
        {({ isValid, submitForm }) => (
          <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.mainContainer}
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
              showsVerticalScrollIndicator={false}
              extraScrollHeight={50}
            >
              <Text style={styles.labelTextStyle}>{'Please enter your Invite Code'}</Text>
              <InputField
                name={'code'}
                placeholder="Enter invite code"
                maxLength={6}
                style={{
                  contentContainerStyle: {
                    backgroundColor: '#fff',
                  },
                }}
              />
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                  {
                    'NOTE: The UnionDigital Bank app is available by invitation only at this time. An Invite Code was sent via SMS to selected customers.\n\nIf you did not receive an access code yet, please visit our website to join our mailing list. Thank you!'
                  }
                </Text>
              </View>
            </KeyboardAwareScrollView>
            <Button
              onPress={submitForm}
              label="Proceed"
              isLoading={isValidating}
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
        )}
      </Formik>
    </View>
  );
};

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
    backgroundColor: '#E7DBF5',
    padding: 15,
    marginTop: 40,
  },
  noteText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.primary,
  },
});

export default InviteCodeValidationScreen;
