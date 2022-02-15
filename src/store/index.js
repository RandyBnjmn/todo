import Vue from 'vue'
import Vuex from 'vuex'
import apiTareas from '@/api/apiTareas'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
  },
  mutations: {
    setTareas(state, payload) {
      state.tareas = payload
    },
    eliminar(state, id) {
      state.tareas = state.tareas.filter((tarea) => tarea.id !== id)
    },
    editar(state, payload) {
      const idx = state.tareas.map((tarea) => tarea.id).indexOf(payload.id)
      state.tareas[idx] = payload
    },
    guardar(state, payload) {
      state.tareas.push(payload)
      state.tareas.sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      )
    },
  },

  //actions
  actions: {
    async getTareas({ commit }) {
      const { data } = await apiTareas.get('/tareas.json')
      const payload = []
      for (let id of Object.keys(data)) {
        payload.push({
          id,
          ...data[id],
        })
      }
      payload.sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      )

      commit('setTareas', payload)
    },
    async guardarTarea({ commit }, tarea) {
      if (tarea.id) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        })
        Swal.showLoading()
        tarea.completada = !tarea.completada
        const { titulo, fecha, descripcion, completada } = tarea

        const datos = {
          titulo,
          fecha,
          descripcion,
          completada,
        }
        await apiTareas.put(`/tareas/${tarea.id}.json`, datos)

        commit('editar', tarea)

        Swal.fire({
          title: 'Actulizada',
          text: 'Tarea actualizadda con exito',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        })
        Swal.showLoading()
        const { data } = await apiTareas.post('/tareas.json', tarea)
        const id = data.name
        let payload = {}

        payload = {
          id,
          ...tarea,
        }

        commit('guardar', payload)

        Swal.fire({
          title: 'Agregada',
          text: 'Tarea agregada con exito',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },
    async eliminarTarea({ commit }, id) {
      const { isConfirmed } = await Swal.fire({
        title: 'Está segur@?',
        text: 'No hay vuelta atras!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar',
      })

      if (!isConfirmed) return

      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false,
      })
      Swal.showLoading()

      await apiTareas.delete(`/tareas/${id}.json`)

      commit('eliminar', id)

      Swal.fire({
        title: 'Eliminada',
        text: 'Tarea eliminada con exito',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      })
    },
  },
  modules: {},
  getters: {
    todas(state) {
      return state.tareas
    },
    pendientes(state) {
      return state.tareas.filter(
        (tarea) =>
          !tarea.completada && new Date(tarea.fecha).getTime() >= Date.now()
      )
    },
    completadas(state) {
      return state.tareas.filter((t) => t.completada)
    },
    vencidas(state) {
      return state.tareas.filter(
        (t) => new Date(t.fecha).getTime() < Date.now() && !t.completada
      )
    },

    getByTab: (_, getters) => (tab) => {
      switch (tab) {
        case 'tab-1':
          return getters.todas
        case 'tab-2':
          return getters.pendientes
        case 'tab-3':
          return getters.completadas
        case 'tab-4':
          return getters.vencidas
      }
    },
  },
})
