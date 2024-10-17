import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import TextInputWrapper from "./TextInputWrapper";

interface PlaceResult {
  label: string;
  lat: number;
  lon: number;
}

interface AddressSearchComponentProps {
  onAddressSelect: (address: string, lat: number, lon: number) => void;
}

const AddressSearchComponent: React.FC<AddressSearchComponentProps> = ({
  onAddressSelect,
}) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSelecting = useRef(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (searchText.length > 2 && !isSelecting.current) {
        setLoading(true);
        try {
          const apiKey =
            "5b3ce3597851110001cf62480d5edcd000074935966b0d86d130c538"; // Replace with your actual API key
          const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
            searchText
          )}&size=10&boundary.country=PH`;

          const response = await fetch(url);
          const data = await response.json();

          setResults(
            data.features.map((feature: any) => ({
              label: feature.properties.label,
              lat: feature.geometry.coordinates[1],
              lon: feature.geometry.coordinates[0],
            }))
          );
          setErrorMessage(null);
        } catch (error) {
          console.error("Error fetching places:", error);
          setResults([]);
          setErrorMessage("An error occurred while fetching places.");
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setErrorMessage(null);
      }
    };

    // Debounce the API call to prevent too many requests
    const timeoutId = setTimeout(fetchPlaces, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handlePlaceSelect = (value: string) => {
    const selectedPlace = results.find((place) => place.label === value);
    if (selectedPlace) {
      isSelecting.current = true;
      setSearchText(selectedPlace.label);
      setResults([]);
      console.log(
        `Selected place: ${selectedPlace.label}, Lat: ${selectedPlace.lat}, Lon: ${selectedPlace.lon}`
      );
      onAddressSelect(
        selectedPlace.label,
        selectedPlace.lat,
        selectedPlace.lon
      ); // Call the callback function with three arguments
      setTimeout(() => {
        isSelecting.current = false;
      }, 100);
    }
  };

  const renderItem = ({ item }: { item: PlaceResult }) => (
    <TouchableOpacity onPress={() => handlePlaceSelect(item.label)}>
      <Text style={styles.resultItem}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInputWrapper label="Address">
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an address..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </TextInputWrapper>

      {loading && <ActivityIndicator size="small" color="#0000ff" />}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        results.length > 0 && (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.label}-${item.lat}-${item.lon}`}
            style={styles.resultsList}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    flex: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  resultsList: {
    maxHeight: 200, // Adjust the height as needed
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default AddressSearchComponent;
