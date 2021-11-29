<template>
  <div>
    <!-- <hotel-header /> -->
    <v-row>
      <v-col sm="12" :md="hotel.name.length > 8 ? '12' : '4' ">
        <general-info />
      </v-col>
      <v-col :md="hotel.name.length > 8 ? '12' : '8'">
        <location />
      </v-col>
      <v-col sm="12">
        <distance />
      </v-col>
      <v-col md="4">
        <classification />
      </v-col>
      <v-col md="8">
        <description-text />
      </v-col>
      <v-col md="12">
        <hotel-images />
      </v-col>
      <v-col md="12">
        <hotels-airport />
      </v-col>
      <v-col md="12">
        <rooms />
      </v-col>
      <v-col md="12">
        <boarding-types />
      </v-col>
      <v-col md="12">
        <child-age-limit></child-age-limit>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DescriptionText from "@/components/hotels/description/index"
import GeneralInfo from "@/components/hotels/general-info/index"
// import HotelHeader from "@/components/hotels/hotel/hotel-header"
import HotelsAirport from "@/components/hotels/airports/index"
import Location from "@/components/hotels/location/index"
import Distance from "@/components/hotels/distance/index"
import HotelImages from "@/components/hotels/images/index"
import Classification from "@/components/hotels/classification/index"
// import Rooms from "@/components/hotels/rooms/index"
import Rooms from "@/components/hotels/room/room-table"
import ChildAgeLimit from "@/components/hotels/child-age-limit/index"
import BoardingTypes from "@/components/hotels/boarding-types/boarding-types-table"
import { mapGetters } from "vuex"

export default {
  components: {
    GeneralInfo,
    DescriptionText,
    HotelsAirport,
    Location,
    Distance,
    HotelImages,
    // HotelHeader,
    Classification,
    Rooms,
    BoardingTypes,
    ChildAgeLimit
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
    })
  }
};
</script>