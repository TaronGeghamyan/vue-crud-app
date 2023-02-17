<template>
  <div v-if="editingRow">
    <h3>Edit Row</h3>
    <form @submit.prevent="saveRow">
      <div v-for="column in columns" :key="column.id">
        <div v-if="column != 'id' && !isJSON(rows[0][column])">
          <label>{{ column }}:</label>
          <input v-model="editingRow[column]" :type="column.type" />
        </div>
      </div>
      <br />
      <button class="formB" type="submit">Save</button>
      <button class="formB" type="button" @click="cancelEditing">Cancel</button>
    </form>
  </div>
  <div v-if="!prefix">
    <button class="addRow" @click="addRow">Add Row</button>
  </div>

  <table class="table table-bordered">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">
          {{ column }}
        </th>
        <th v-if="!prefix">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="column in columns" :key="column">
          <div v-if="!Array.isArray(row[column])">
            <div v-if="isJSON(row[column])">
              <span
                align="center"
                v-for="(item, index) in row[column]"
                :key="column + item + index"
              >
                <p v-if="index != 'id'">{{ item }}</p>
              </span>
            </div>
            <div v-else>
              {{ row[column] }}
            </div>
          </div>
          <div v-else>
            <div v-for="(item, index) in row[column]" :key="index">
              {{ item }}
            </div>
          </div>
        </td>
        <td v-if="!prefix">
          <button @click="editRow(row)">Edit</button>
          <button @click="deleteRow(row.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
import { isJSON } from "@/helpers/JsonData";

export default {
  name: "CrudTable",
  props: {
    tableName: String,
    prefix: String,
  },
  computed: mapState({
    rows: (state) => state.rows,
    columns: (state) => state.columns,
  }),
  data() {
    return {
      dataList: [],
      editingRow: null,
      newRow: {},
    };
  },
  methods: {
    isJSON,
    editRow(row) {
      this.editingRow = { ...row };
    },
    saveRow() {
      const rowData = this.editingRow;
      if ("id" in rowData) {
        this.$store.dispatch("editRow", {
          table: this.tableName,
          updatedRow: rowData,
        });
      } else {
        this.$store.dispatch("createRow", {
          table: this.tableName,
          newRow: rowData,
        });
      }

      this.editingRow = null;
    },
    deleteRow(id) {
      this.$store.dispatch("deleteRow", { table: this.tableName, id });
    },
    cancelEditing() {
      this.editingRow = null;
    },
    addRow() {
      this.editingRow = { ...this.newRow };
    },
  },
  created() {
    this.$store.dispatch("fetchData", {
      table: this.tableName,
      prefix: this.prefix,
    });
  },
};
</script>

<style>
.addRow {
  float: right;
}

table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
