<template>
  <div>
    <v-tabs
      v-if="!isOperator"
      v-model="tab"
      class="mb-8 ml-3"
    >
      <v-tab
        v-for="(operator, index) in operators"
        :key="index"
        @click="setOperator(operator.id)"
        :disabled="loadingTab"
        >{{ operator.first_name }}</v-tab
      >
    </v-tabs>
    <template v-if="graphs !== null && graphs.length">
      <div v-for="(price, i) in graphs" :key="i">
        <v-data-table
          :headers="[]"
          :items="price.data"
          class="elevation-1 mb-15"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat height="40">
              <v-toolbar-title>{{ price.boarding_type.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
          </template>

          <template v-slot:header>
            <thead>
              <tr>
                <th style="min-width: 150px">Room type</th>
                <th style="min-width: 100px">Actions</th>
                <th style="min-width: 100px">Num adults</th>
                <th style="min-width: 100px">Num kids</th>
                <th
                  v-for="(period, index) in price.periods"
                  :key="index"
                  style="text-align: center"
                >
                  <div>
                    <v-chip color="primary" outlined>
                      <v-icon small class="mr-2"> mdi-calendar </v-icon>
                      {{
                        new Date(period.start_period).toLocaleDateString(
                          "ru-RU"
                        ) +
                        " - " +
                        new Date(period.end_period).toLocaleDateString("ru-RU")
                      }}

                      <hotel-period-edit :period="period"></hotel-period-edit>

                      <hotel-period-delete
                        :period="period"
                      ></hotel-period-delete>
                    </v-chip>
                  </div>
                </th>
              </tr>
            </thead>
          </template>

          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.name.name">
                <td>
                  {{ item.name.name }}
                  <hotel-price-add
                    :offer="{
                      boardingTypeID: price.boarding_type.boarding_type_id,
                      items: item.items,
                      roomTypeID: item.name.room_type_id,
                      tab
                    }"
                  ></hotel-price-add>
                </td>

                <td>
                  <div
                    v-for="(childbek, index) in item.items"
                    :key="index"
                    class="my-5"
                  >
                    <v-btn
                      icon
                      small
                      color="primary"
                      @click="
                        editOffer(
                          childbek,
                          price.boarding_type.boarding_type_id
                        )
                      "
                    >
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      color="red"
                      @click="deletePrice(childbek)"
                    >
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>

                <td>
                  <div
                    v-for="(adult, index) in item.items"
                    :key="index"
                    class="my-5"
                  >
                    <span>
                      {{ adult.adults }}
                    </span>
                  </div>
                </td>

                <td>
                  <div
                    v-for="(child, index) in item.items"
                    :key="index"
                    class="my-5"
                  >
                    <span>
                      {{ child.children }}
                    </span>
                  </div>
                </td>

                <td
                  v-for="(period, ind) in price.periods"
                  :key="ind"
                  align="center"
                >
                  <div
                    v-for="(childbek, index) in item.items"
                    :key="index"
                    class="my-5"
                  >
                    <span style="cursor: pointer">
                      <v-icon small>mdi-currency-eur</v-icon>
                      {{ getPrice(period, childbek.periods) }}
                    </span>
                    <v-btn icon small color="primary" @click="toggleInput(period, childbek)">
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>

                  </div>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary"> Refresh </v-btn>
          </template>
        </v-data-table>
      </div>
    </template>

    <template v-else>
      <div v-if="loading" class="d-flex justify-center mb-5">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <p v-else class="d-flex justify-center">No price charts are assigned to you</p>
    </template>

    <hotel-price-edit
      :periodPrice="periodPrice"
      :periodID="periodID"
      :itemID="itemID"
      :priceID="priceID"
      @dialog="showEditPrice = false"
      :showEditPrice="showEditPrice"
    ></hotel-price-edit>

    <hotel-price-delete
      @dialog="showDeletePrice = false"
      :showDeletePrice="showDeletePrice"
      :delItem="delItem"
    ></hotel-price-delete>

    <hotel-offer-edit
      @dialog="showEditOffer = false"
      :showEditOffer="showEditOffer"
      :editOfferItem="editOfferItem"
    ></hotel-offer-edit>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import hotelPriceAdd from "./hotel-price-add.vue";
import HotelPeriodEdit from "./hotel-period-edit.vue";
import HotelPeriodDelete from "./hotel-period-delete.vue";
import HotelPriceEdit from "./hotel-price-edit.vue";
import HotelPriceDelete from "./hotel-price-delete.vue";
import HotelOfferEdit from "./hotel-offer-edit.vue";
export default {
  components: {
    hotelPriceAdd,
    HotelPeriodEdit,
    HotelPeriodDelete,
    HotelPriceEdit,
    HotelPriceDelete,
    HotelOfferEdit,
  },
  name: "HotelPrices",
  data() {
    return {
      tab: null,
      items: [],
      loading: false,
      loadingTab: false,
      inputVisible: false,
      headers: [
        { text: "Room type", value: "name" },
        { text: "Num adults", value: "adults" },
        { text: "Num kids", value: "children" },
      ],
      periodPrice: "",
      periodID: "",
      itemID: "",
      priceID: "",
      showEditPrice: false,
      delItem: {
        type: "",
        kids: "",
        adults: "",
        id: "",
      },
      showDeletePrice: false,

      showEditOffer: false,
      editOfferItem: {},
    };
  },
  methods: {
    ...mapActions({
      getGraphs: "hotels/graphs/get",
    }),
    toggleInput(period, item) {
      let per = item.periods.find((el) => el.id === period.id);
      per.price.price
        ? (this.periodPrice = per.price.price)
        : (this.periodPrice = 0);

      per.price.id ? (this.priceID = per.price.id) : (this.priceID = "");

      this.periodID = period.id;
      this.itemID = item.id;

      this.showEditPrice = true;
    },
    getPrice(period, periods) {
      if (periods.length) {
        let per = periods.find((el) => el.id === period.id);
        if (per.price.price) {
          return per.price.price;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },

    deletePrice(item) {
      this.delItem.type = item.room_type.name;
      this.delItem.adults = item.adults;
      this.delItem.kids = item.children;
      this.delItem.id = item.id;

      this.showDeletePrice = true;
    },
    editOffer(item, boardingTypeID) {
      this.showEditOffer = true;
      const { adults, children, id, operator, room_type, hotel_id } = item;

      let obj = {
        adults,
        children,
        id,
        operator,
        room_type,
        hotel_id,
        boardingTypeID,
      };

      this.editOfferItem = obj;
    },
    async setOperator(id) {
      this.loadingTab = true
      await this.getGraphs(id);
      this.loadingTab = false
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      graphs: "hotels/graphs/graphs",
      operators: "hotels/graphs/operators",
      isOperator: "auth/isOperator",
    }),
  },
  async created() {
    this.loading = true
    await this.getGraphs();
    this.loading = false
  },
};
</script>