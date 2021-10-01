import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTime } from "../slices/navSlice";

const data = [
  {
    id: "uber-x-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pm",
  },

  {
    id: "uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5wE",
  },

  {
    id: "uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pl",
  },
];

// if we have surge pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, Setselected] = useState(null);
  const travelTimeInfo = useSelector(selectTravelTime);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NaviageCard")}
          style={tw`aboslute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontaesome' size={18} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
          {travelTimeInfo?.distance?.text}
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { title, multiplier, image, id } }) => (
          <TouchableOpacity
            onPress={() => Setselected(item)}
            style={tw`flex-row justfy-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibolds`}>{title}</Text>
              <Text>{travelTimeInfo?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInfo?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`ml-auto border-1 border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
