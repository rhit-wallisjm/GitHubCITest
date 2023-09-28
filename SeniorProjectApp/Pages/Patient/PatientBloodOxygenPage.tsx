import React, {useEffect, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import {
  getBloodOxygen,
  addBloodOxygen,
} from '../../BackEndFunctionCall/bloodOxygenFunction';
import getDefaultStartTime from '../../BackEndFunctionCall/getDefaultStartTime';
import AddSuccessfullyDialog from '../../Components/AddSuccessfullyDialog';
import DateSellectionBar from '../../Components/DateSelectionBar';
import {addBloodPressure} from '../../BackEndFunctionCall/bloodPressureFunction';

export default function PatientBloodOxygen(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const numberRegex = /^-?(\d+|\.\d+|\d*\.\d+)$/;
  const [invalidVisible, setInvalidVisible] = useState(false);
  const [addSuccessVisible, setAddSuccessVisible] = useState(false);
  const [bloodOxygenData, setBloodOxygenData] = useState(null);
  const [startDateTime, setStartDateTime] = useState(getDefaultStartTime());
  const [stopDateTime, setStopDateTime] = useState(new Date().toISOString());

  //TODO: Change to dynamic later!!!!
  const patientID = 3;

  useEffect(() => {
    getBloodOxygen(patientID, startDateTime, stopDateTime).then(
      setBloodOxygenData,
    );
  }, [stopDateTime]);

  return (
    <ScrollView style={styles.container}>
      <DateSellectionBar
        setStartDateTime={setStartDateTime}
        setStopDateTime={setStopDateTime}
      />

      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
          <Row data={['Date', 'Time', 'Blood Oxygen']} />
          <Rows data={bloodOxygenData} />
        </Table>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button title={'Add Manually'} onPress={() => setModalVisible(true)} />
        <Button title={'Add automatically'} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Blood Oxygen Data</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => checkInput(text, setInput)}
              />
              <Text style={{fontSize: 25}}>%</Text>
            </View>

            {invalidVisible && (
              <Text style={{color: 'red'}}>Invalid Input!</Text>
            )}
            <View style={styles.modalButtonContainer}>
              <Button
                title={'Cancel'}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button title={'Add'} onPress={addBloodOxygenOnClick} />
            </View>
          </View>
        </View>
      </Modal>
      {addSuccessVisible && (
        <AddSuccessfullyDialog setter={setAddSuccessVisible} />
      )}
    </ScrollView>
  );
  function checkInput(
    text: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ): void {
    if (numberRegex.test(text) || text === '') {
      setInvalidVisible(false);
      setInput(text);
    } else {
      setInvalidVisible(true);
    }
  }

  function addBloodOxygenOnClick(): void {
    if (input === '' || !numberRegex.test(input)) {
      //todo: raise error message dialog
    } else {
      addBloodOxygen(
          3,
          Number(input),
          true,
      ).then(successful => {
        setModalVisible(!modalVisible);
        if (successful === 'add successful') {
          setAddSuccessVisible(true);
        } else {
          // Failed view here
        }
        setStopDateTime(new Date().toISOString());
      });
      setInput('');
    }
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: 200,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});
