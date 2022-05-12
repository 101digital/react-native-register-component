import { colors, fonts } from "../../assets";
import { LoaderIcon } from "../../assets/icons";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";

const Loader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hang on for a moment</Text>
      <Text style={styles.subTitle}>We’re logging you in.</Text>
      <ActivityIndicator
        size={"large"}
        style={styles.loadingIndicatorStyle}
        color={colors.primary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 36,
    color: colors.primary,
    paddingHorizontal: 24,
    marginBottom: 32,
    textAlign: "center"
  },
  subTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: "#7F7B82",
    paddingHorizontal: 24,
    marginBottom: 32,
    textAlign: "center",
    paddingBottom: 100
  },
  loadingIndicatorStyle: {
    marginTop: 80
  }
});

export default Loader;
