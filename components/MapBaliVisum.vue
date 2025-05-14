<template>
  <div class="rounded-lg overflow-hidden relative">
    <!-- <div
      class="absolute bottom-0 right-0 z-10 bg-black p-2 text-white max-w-md rounded-tl-xl"
      @click="gotoMap"
      role="button"
    >
      Jln Legian No.475, Legian, Kuta, Badung Regency, Bali 80361
    </div>
    <GMapMap
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
      :options="{
        disableDefaultUi: true,
      }"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="center = m.position"
      >
      </GMapMarker>
    </GMapMap> -->
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      center: { lat: -8.699016848027297, lng: 115.1692123260667 },
      markers: [
        {
          position: {
            lat: -8.699016848027297,
            lng: 115.1692123260667,
          },
        }, // Along list of clusters
      ],
    };
  },
  methods: {
    gotoMap() {
      window.location.href = "https://maps.app.goo.gl/sn9cNnJk92M6fYCt6";
    },
  },
};
</script>
