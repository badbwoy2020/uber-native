import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAP_APIKEYS } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Niasky</Text>
      <View style={tw`border-1 border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            fetchDetails={true}
            styles={toInputBoxStyles}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            query={{
              key: GOOGLE_MAP_APIKEYS,
              language: "en",
            }}
            debounce={400}
          />
        </View>
      </View>

      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RiderOptionsCard")}
          style={tw`flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon name='car' type='font-awesome' color='white' size={18} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          />
          <Text style={tw` text-center`}>Rides</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDODF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
