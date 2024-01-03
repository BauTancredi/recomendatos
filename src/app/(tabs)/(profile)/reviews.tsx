import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

const ReviewsScreen = () => {
  return (
    <ScrollView style={[defaultStyles.container]}>
      <View style={styles.firstSection}>
        <View style={styles.averageContainer}>
          <Text style={styles.averageNumber}>4.4</Text>
          <View style={styles.averageStars}>
            <FontAwesome name="star" size={24} color="gold" />
            <FontAwesome name="star" size={24} color="gold" />
            <FontAwesome name="star" size={24} color="gold" />
            <FontAwesome name="star-half-o" size={24} color="gold" />
            <FontAwesome name="star-o" size={24} color="gold" />
          </View>
          <Text style={styles.amountReviews}>(49 valoraciones)</Text>
        </View>
        <View style={styles.starsContainer}>
          <StarsPorcentage stars={5} porcentage={65} />
          <StarsPorcentage stars={4} porcentage={25} />
          <StarsPorcentage stars={3} porcentage={5} />
          <StarsPorcentage stars={2} porcentage={10} />
          <StarsPorcentage stars={1} porcentage={0} />
        </View>
      </View>
      <View style={styles.secondSection}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 24,
          }}
        >
          RecomenDato
        </Text>
        <Text
          style={{
            fontFamily: "mon",
            fontSize: 18,
          }}
        >
          Han recomendado a este proveedor:
        </Text>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 66,
          }}
        >
          67&nbsp;
          <Text
            style={{
              fontSize: 18,
            }}
          >
            veces
          </Text>
        </Text>
      </View>
      <View style={[styles.thirdSection, { gap: 10 }]}>
        <Text style={{ fontFamily: "mon-sb", fontSize: 24 }}>Reseñas</Text>
        <ReviewCard
          name="Jorge"
          reviewDate="Hace 3 meses"
          stars={4}
          reviewDescription="Muy buen servicio, lo recomiendo."
        />
        <ReviewCard
          name="Jorge"
          reviewDate="Hace 3 meses"
          stars={4}
          reviewDescription="Muy buen servicio, lo recomiendo."
        />
        <ReviewCard
          name="Jorge"
          reviewDate="Hace 3 meses"
          stars={4}
          reviewDescription="Muy buen servicio, lo recomiendo."
        />
        <ReviewCard
          name="Jorge"
          reviewDate="Hace 3 meses"
          stars={4}
          reviewDescription="Muy buen servicio, lo recomiendo."
        />
        <ReviewCard
          name="Jorge"
          reviewDate="Hace 3 meses"
          stars={4}
          reviewDescription="Muy buen servicio, lo recomiendo."
        />
      </View>
    </ScrollView>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  firstSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondSection: {
    gap: 5,
    marginVertical: 30,
  },
  thirdSection: {
    gap: 5,
  },
  averageContainer: {
    gap: 5,
    justifyContent: "flex-end",

    height: 170,
  },
  averageNumber: {
    fontSize: 66,
    fontFamily: "mon-b",
  },
  averageStars: {
    flexDirection: "row",
    gap: 5,
  },
  amountReviews: {
    fontSize: 18,
    fontFamily: "mon",
    color: "#666",
  },
  starsContainer: {
    gap: 10,
    height: 170,
    justifyContent: "flex-end",
  },
});

const StarsPorcentage = ({ stars, porcentage }: { stars: number; porcentage: number }) => {
  const parentWidth = 100; // replace with the actual parent width
  const width = (porcentage / 100) * parentWidth;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
      }}
    >
      <FontAwesome name="star" size={18} color="gold" />
      <View style={{ width: 15 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "mon-sb",
          }}
        >
          {stars}
        </Text>
      </View>
      <View
        style={{
          width: parentWidth,
          height: 10,
          backgroundColor: "#ccc",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width,
            height: 10,
            backgroundColor: "gold",
            borderRadius: 10,
          }}
        />
      </View>
      <Text>{porcentage}%</Text>
    </View>
  );
};

type ReviewCardProps = {
  name?: string;
  imageUrl?: string;
  reviewDate?: string;
  stars?: number;
  reviewDescription?: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  imageUrl,
  reviewDate,
  stars,
  reviewDescription,
}) => {
  return (
    <View
      style={[
        defaultStyles.card,
        {
          gap: 10,
          borderRadius: 10,
          margin: 0,
        },
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontFamily: "mon",
              fontSize: 14,
            }}
          >
            {reviewDate}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <FontAwesome name="star" size={18} color="black" />
          <Text
            style={{
              fontFamily: "mon-sb",
              fontSize: 18,
            }}
          >
            {stars}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "mon",
          fontSize: 14,
        }}
      >
        {reviewDescription}
      </Text>
    </View>
  );
};
