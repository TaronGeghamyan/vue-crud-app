<template>
  <div class="home">
    <CrudTable table-name="States" class="table table-bordered" />
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.css";
import { Options, Vue } from "vue-class-component";
import CrudTable from "@/components/CrudTable.vue";

@Options({
  components: {
    CrudTable,
  },
})
export default class StatesView extends Vue {}
</script>
