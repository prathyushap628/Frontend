import axios from 'axios'

const state = () => ({
  token: '',
  // this list has your todos loaded from backend.
  todoList: [],
  tasks: [],
})

const getters = {}

const mutations = {
  setToken(state, data) {
    console.log(' token : ' + data);

    state.token = data
    console.log(' tooken : ' + state.token);
  },

  setTodoList(state, data) {
    console.log('setting')
    console.log(data);

    state.todoList = data

    console.log(state.todoList);
  },
  setTokenUpdate(state, data) {
    state.token = data
  },
  setTodoDelete(state, id) {

    state.todoList = state.todoList.filter(function (item) {
      return item.to_do_id !== id
    });


  },
  ADD_TASK(state, task) {
    state.tasks = [{ content: task, done: false }, ...state.tasks];
    //alert();
  },
  // REMOVE_TASK(state, task) {
  //   state.tasks.splice(state.tasks.indexOf(task), 1);
  // },
  TOGGLE_TASK(state, task) {
    task.done = !task.done;
  }
}

const actions = {
  async login(state, data) {
    try {
      //console.log("data:" + data.username);
      // Hit the backend api.
      const res = await axios.post('http://localhost:5000/api/Login/', {
        userName: data.username,
        password: data.password,
      })

      if (res.status == 200) {
        console.log(res)

        // Set the token after the call is success.
        this.commit('setToken', res.data)
        // move to the homepage from login page.
        this.$router.push('/homepage')

      } else {
        alert('Invalid username or password')
      }
    } catch (e) {
      console.log(' error while logging in: ' + e)
      alert(' cannot login right now, please try again later')
    }
  },

  async GetAllToDOs({ commit, state }) {
    try {
      //console.log("data:" + data.username);

      // hitting api for getting todos list.
      const res = await axios.get('http://localhost:5000/api/to_do_list/', {
        headers: {
          Authorization: "Bearer " + this.state.token,
        }
      })
      console.log(res)
      // set the todos list with the data got.
      this.commit('setTodoList', res.data)
    } catch (e) {
      console.log(' error while logging in: ' + e)
      // alert(" cannot login right now, please try again later")
    }
  },
  // async UpdateToDOs({ commit, state }) {
  //   try {
  //     //console.log("data:" + data.username);

  //     // hitting api for getting todos list.
  //     const res = await axios.put('http://localhost:5000/api/to_do_list/{id}/', {
  //       headers: {
  //         Authorization: "Bearer " + state.token,
  //       }
  //     })
  //     console.log(res)
  //     // set the todos list with the data got.
  //     commit('setTokenUpdate', res.data)
  //   } catch (e) {
  //     console.log(' error while logging in: ' + e)
  //     // alert(" cannot login right now, please try again later")
  //   }
  // },
  async DeleteToDOs(state, data) {
    try {

      let id = data.id

      console.log(id);

      // hitting api for getting todos list.
      const res = await axios.delete('http://localhost:5000/api/to_do_list/' + id, {
        headers: {
          Authorization: "Bearer " + this.state.token,
        },

      })
      console.log(res)
      // set the todos list with the data got.
      this.commit('setTodoDelete', id)
    } catch (e) {
      console.log(' error while deleting todo: ' + e)
      // alert(" cannot login right now, please try again later")
    }
  },
  async CreateToDo(state, data) {
    try {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.state.token,
      }

      // hitting api for getting todos list.
      const res = await axios({ method: 'post', url: 'http://localhost:5000/api/to_do_list', headers: headers, data: data.data })
      // const res = await axios.post(, {
      //   data: data.data,
      //   headers: headers,
      // })
      console.log(res)
      try {
        //console.log("data:" + data.username);

        // hitting api for getting todos list.
        const res = await axios.get('http://localhost:5000/api/to_do_list/', {
          headers: {
            Authorization: "Bearer " + this.state.token,
          }
        })
        console.log(res)
        // set the todos list with the data got.
        this.commit('setTodoList', res.data)
      } catch (e) {
        console.log(' error while logging in: ' + e)
        // alert(" cannot login right now, please try again later")
      }

    } catch (e) {
      console.log(' error while creating in: ' + e)
      // alert(" cannot login right now, please try again later")
    }
  }
}




export default {
  state,
  getters,
  mutations,
  actions,
}
