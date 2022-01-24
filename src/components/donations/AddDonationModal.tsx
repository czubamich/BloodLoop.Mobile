import React from "react";
import { Text, Modal, Select, Input, Button, Icon } from "native-base"
import { DictionariesClient, DonationDto, DonationTypeDto, DonorsClient, IDonationDto } from "../../utils/api/ApiClient";
import { config } from "../../config";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DonorService from "../../services/DonorService";
import { useAuth } from "../AuthProvider";

interface IAddDonationModalProps
{
    onClose: Function
    isOpen: boolean,
}

export const AddDonationModal = (props: IAddDonationModalProps) =>
{
    const [formData, setFormData] = React.useState<IDonationDto>({date: new Date(), donationTypeLabel: "whole", volume: 450})
    const [donationTypes, setDonationTypes] = React.useState<DonationTypeDto[]>(undefined)
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const authContext = useAuth()

    async function fetchDonationTypes() {
        var apiClient = new DictionariesClient(config.apiUrl)
        var donationTypes = await apiClient.getDonationTypes()
        donationTypes = donationTypes.filter(x => x.label!="disqualified")
        setDonationTypes(donationTypes)
        console.log("loadedDonationTypes");
      }
    
      async function addDonation() {
        var donorService = new DonorService(authContext.authData)
        await donorService.addDonation(new DonationDto(formData));

        setFormData(undefined)
        props.onClose();
      }
    
      React.useEffect(() => {
        async function _setup()
        {
          await fetchDonationTypes();
        }
        
        _setup()
      }, []) 

    return (    
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>Manually add a Donation</Modal.Header>
      <Modal.Body>
        <Select variant='filled' placeholder="Donation Type" defaultValue={"whole"} onValueChange={(value) => {setFormData({...formData, donationTypeLabel: value, volume: parseInt(donationTypes.find(x => x.label==value).defaultVolume)}) }}>
          {donationTypes ? donationTypes.map((donationType) => <Select.Item label={donationType.name} value={donationType.label}/>) : <Select.Item isDisabled label="loading..." value=""/>}
        </Select>
        <Input mt={4}
            value={formData?.date?.toISOString().substring(0, 10)}
            onFocus={()=>setShowDatePicker(true)}
            variant='filled'
            placeholder="Date"
            InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="calendar" color="muted.400"/>}/>
        <Input mt={4}
            value={formData?.location}
            onChangeText={(value) => setFormData({...formData, location: value})}
            variant='filled'
            placeholder="Location"
            InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="map-marker" color="muted.400"/>}/>
        <Input mt={4}
            type="number"
            value={formData?.volume?.toString()}
            onChangeText={(value) => {let number = parseInt(value); setFormData({...formData, volume: isNaN(number) ? formData.volume ?? 0 : number})}}
            variant='filled'
            placeholder="Volume"
            InputRightElement={<Text mr={3} color="red.600">ml</Text>}
            InputLeftElement={<Icon as={MaterialCommunityIcons} ml="2" name="blood-bag" color="muted.400"/>}/>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="red"
            onPress={() => props.onClose()}
          >
            Cancel
          </Button>
          <Button
            onPress={() => addDonation()}
          >
            Add
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
    {showDatePicker && 
    (<DateTimePicker
      testID="dateTimePicker"
      value={formData?.date ?? new Date()}
      mode={"date"}
      display="default"
      onChange={(event, value) => {setShowDatePicker(false); setFormData({...formData, date: value})}}/>
    )}
  </Modal>)
}