import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    user: {},
    bugs: [],
    activeBug: {},
    comments: [],
    tasks: [],
    comments: [],
    activeLists: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug;
    },
    setComments(state, comments) {
      state.comments = comments
    },
    setActiveLists(state, data) {
      state.activeLists = data
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      console.log(bearer);
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBugs({ commit, dispatch }) {
      api.get("bugs").then((res) => {
        commit("setBugs", res.data);
      });
    },
    async getBugById({ commit, dispatch }, id) {
      try {
        let res = await api.get("bugs/" + id);
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async addBug({ commit, dispatch }, newBug) {
      try {
        let res = await api.post('bugs', newBug)
        dispatch("getBugs")
        router.push({ name: 'bug', params: { bugId: res.data.id } })
        dispatch("getBugById", res.data.id)
      } catch (error) {
        console.error(error)
      }
    },
    async getCommentsbyBugId({ commit, dispatch }, id) {
      try {
        let res = await api.get('bugs/' + id + "/comments")
        commit("setComments", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addComment({ commit, dispatch }, newComment) {
      try {
        let res = await api.post('comments/', newComment)
        dispatch("getCommentsbyBugId", newComment.bugId)
      } catch (error) {
        console.error(error)
      }
    },

    async removeComment({ commit, dispatch }, comment) {
      try {
        let res = await api.delete('comments/' + comment.id)
        dispatch("getCommentsbyBugId", comment.bugId.id)
      } catch (error) {
        console.error(error)
      }
    },
    async statusChange({ commit, dispatch }, update) {
      try {
        let res = await api.put('bugs/' + update.id, update)
        dispatch("getBugById", update.id)
      } catch (error) {
        console.error(error)
      }
    },
    async editBug({ commit, dispatch }, bug) {
      try {
        let res = await api.put('bugs/' + bug.bugId, bug)
        dispatch("getBugById", bug.bugId)
      } catch (error) {
        console.error(error)
      }
    }
  },

  //#endregion

  //#region -- LISTS --

  //#endregion

});
