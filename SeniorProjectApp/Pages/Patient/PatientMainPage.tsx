import React from 'react';
import { Pressable, View, TouchableOpacity } from "react-native";
import PatientWeightNavCard from '../../Components/PatientWeightNavCard';
import PatientBloodPressureNavCard from "../../Components/PatientBloodPressureNavCard";

export default function PatientMainPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  // Function to navigate to the PatientWeightPage
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('patientWeightPage')}>
        <PatientWeightNavCard />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('patientBloodPressurePage')}>
        <PatientBloodPressureNavCard />
      </TouchableOpacity>
    </View>
  );

  // function cardOnClick(path: String): void {
  //   navigation.navigate({path});
  // }
  //
  // function clickTest(): void {
  //   console.log('blood pressure');
  //   navigation.navigate('PatientBloodPressurePage');
  // }
}
