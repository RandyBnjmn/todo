<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid class="my-5">
        <v-row class="mx-16">
          <v-col>
            <v-dialog v-model="dialog" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Agregar
                  <v-icon small>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Tareas</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="Tarea"
                          required
                          v-model="tarea.titulo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-menu
                          v-model="datePicker"
                          :close-on-content-click="false"
                          max-width="290"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="tarea.fecha"
                              clearable
                              label="Fecha"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              @click:clear="tarea.fecha = null"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="tarea.fecha"
                            @change="datePicker = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          label="Descripcion"
                          required
                          rows="1"
                          v-model="tarea.descripcion"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="6">
                        <v-checkbox
                          label="Completada"
                          v-model="tarea.completada"
                        >
                        </v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">
                    Cerrar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="guardar">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" v-for="tarea in tareas" :key="tarea.id">
            <Card :tarea="tarea" @completada="editar" @delete="eliminar" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Card from '@/components/Card.vue'
  import { mapActions } from 'vuex'
  import apiTareas from '@/api/apiTareas'
  export default {
    name: 'App',
    components: {
      Card,
    },

    data() {
      return {
        dialog: false,
        datePicker: false,
        tareas: [],
        tarea: {
          titulo: '',
          descripcion: '',
          completada: false,
          fecha: null,
        },
      }
    },
    methods: {
      ...mapActions(['getTareas']),

      closeDialog() {
        this.dialog = false
        this.clear()
      },
      clear() {
        this.tarea.titulo = ''
        this.tarea.descripcion = ''
        this.tarea.completada = false
        this.tarea.fecha = null
      },

      async getTareas() {
        const { data } = await apiTareas.get('/tareas.json')

        for (let id of Object.keys(data)) {
          this.tareas.push({
            id,
            ...data[id],
          })
        }
      },

      async guardar() {
        if (this.tarea.id) {
          const { titulo, fecha, descripcion, completada } = this.tarea

          const datos = {
            titulo,
            fecha,
            descripcion,
            completada,
          }
          const { data } = await apiTareas.put(
            `/tareas/${this.tarea.id}.json`,
            datos
          )

          const idx = this.tareas
            .map((tarea) => tarea.id)
            .indexOf(this.tarea.id)
          const dto = {
            id: this.tarea.id,
            titulo: data.titulo,
            descripcion: data.descripcion,
            fecha: data.fecha,
            completada: data.completada,
          }
          this.tareas[idx] = dto
          this.clear()
          this.dialog = false
        } else {
          const { data } = await apiTareas.post('/tareas.json', this.tarea)
          const id = data.name
          this.dialog = false
          this.tareas.push({
            id,
            ...this.tarea,
          })
          this.clear()
        }
      },

      editar(id) {
        const idx = this.tareas.map((tarea) => tarea.id).indexOf(id)
        const tarea = this.tareas[idx]

        //evitando reactividad
        this.tarea.id = id
        this.tarea.titulo = tarea.titulo
        this.tarea.descripcion = tarea.descripcion
        this.tarea.fecha = tarea.fecha
        this.tarea.completada = tarea.completada

        if (tarea.titulo) {
          this.dialog = true
        }
      },

      eliminar(id) {
        console.log(id)
      },
    },

    created() {
      this.getTareas()
    },
  }
</script>
