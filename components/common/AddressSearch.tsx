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
          const apiKey = "Dj4loZJ9qrAv9eTFGDKu"; // Replace with your actual API key
          const query = encodeURIComponent(searchText);
          const bbox = "120.979,14.408,121.135,14.706"; // Bounding box for Metro Manila
          const language = "en";
          const country = "ph";
          const limit = 5;

          // Add types to the URL to prioritize points of interest
          const types = "poi"; // Focus on points of interest
          const url = `https://api.maptiler.com/geocoding/${query}.json?key=${apiKey}&bbox=${bbox}&language=${language}&country=${country}&limit=${limit}&types=${types}`;

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          setResults(
            data.features.map((feature: any) => ({
              label: feature.place_name,
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
