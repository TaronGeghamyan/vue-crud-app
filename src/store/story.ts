import Vuex from "vuex";
import axios from "axios";
import {
  API_URL,
  API_CRUD_PREFIX,
  API_PREFIX_GET_FULL_CASES_HISTORY,
  API_PREFIX_GET_STATES_CASES_HISTORY,
} from "../config";
import { isJSON } from "@/helpers/JsonData";

interface MyRowType {
  id: number;
}

export default new Vuex.Store({
  state: {
    columns: [],
    rows: Array<MyRowType>(),
    prefix: String,
  },
  mutations: {
    setColumns(state, columns) {
      state.columns = columns;
    },
    addRows(state, newRow: MyRowType) {
      state.rows.push(newRow);
    },
    setRows(state, rows) {
      state.rows = rows;
    },
    updateRow(state, updatedRow: MyRowType) {
      const index = state.rows.findIndex((r) => r.id === updatedRow.id);
      state.rows.splice(index, 1, updatedRow);
    },
    deleteRow(state, id) {
      const index = state.rows.findIndex((r: { id: number }) => r.id === id);
      state.rows.splice(index, 1);
    },
    fixPrefix(state, prefix) {
      state.prefix = prefix;
    },
  },
  actions: {
    async fetchData({ state, commit }, { table, prefix }) {
      let apiPrefix;
      switch (prefix) {
        case "states_cases":
          apiPrefix = API_PREFIX_GET_STATES_CASES_HISTORY;
          break;
        case "national_cases":
          apiPrefix = API_PREFIX_GET_FULL_CASES_HISTORY;
          break;
        default:
          apiPrefix = API_CRUD_PREFIX;
      }
      commit("fixPrefix", apiPrefix);

      try {
        const response = await axios.get(`${API_URL}/${apiPrefix}/${table}`);
        const rows = response.data;
        console.log(JSON.stringify(rows));
        const columns = Object.keys(rows[0]);
        console.log(JSON.stringify(columns));
        commit("setColumns", columns);
        commit("setRows", rows);
        console.log(columns);
      } catch (error) {
        console.error(error);
      }
    },
    async createRow({ state, commit }, { table, newRow }) {
      const prefix = state.prefix;
      try {
        const response = await axios.post(
          `${API_URL}/${prefix}/${table}`,
          newRow
        );
        const createdRow = response.data;
        commit("addRows", createdRow);
      } catch (error) {
        console.error(error);
      }
    },
    editRow({ state, commit }, { table, updatedRow }) {
      const prefix = state.prefix;
      const id = updatedRow.id;
      const rowData = JSON.parse(JSON.stringify(updatedRow));
      delete rowData.id;

      for (const property in rowData) {
        if (isJSON(rowData[property])) {
          delete rowData[property];
        }
      }

      axios.put(`${API_URL}/${prefix}/${table}/${id}`, rowData).then(() => {
        commit("updateRow", updatedRow);
      });
    },
    deleteRow({ state, commit }, { table, id }) {
      const prefix = state.prefix;
      axios.delete(`${API_URL}/${prefix}/${table}/${id}`).then(() => {
        commit("deleteRow", id);
      });
    },
  },
});
