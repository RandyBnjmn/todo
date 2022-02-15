<template>
  <v-app>
    <v-card>
      <v-tabs v-model="tab" background-color="white" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Todas
          <v-icon></v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Pendientes
          <v-icon></v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          completadas
          <v-icon></v-icon>
        </v-tab>

        <v-tab href="#tab-4">
          vencidas
          <v-icon></v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="i in 4"
          :key="i"
          :value="'tab-' + i"
          style="min-height: auto"
        >
          <v-main>
            <v-container class="my-5">
              <v-row class="mx-16" v-if="tab === 'tab-1'">
                <v-col class="text-end">
                  <DialogForm @guardar-tarea="guardar" />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  v-for="tarea in getByTabs"
                  :key="tarea.id"
                >
                  <Card
                    :tarea="tarea"
                    @completada="editar"
                    @delete="eliminar"
                    @edit="editar"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
  import Card from '@/components/Card.vue'
  import DialogForm from '@/components/DialogForm.vue'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      Card,
      DialogForm,
    },

    data() {
      return {
        tab: null,
      }
    },

    methods: {
      ...mapActions(['getTareas', 'eliminarTarea', 'guardarTarea']),
      guardar(tarea) {
        this.guardarTarea({ ...tarea })
      },
      editar(tarea) {
        this.guardarTarea(tarea)
      },
      eliminar(id) {
        this.eliminarTarea(id)
      },
    },

    computed: {
      ...mapState(['tareas']),

      getByTabs() {
        return this.$store.getters['getByTab'](this.tab)
      },
    },

    async created() {
      await this.getTareas()
      console.log(this.$store.getters.vencidas)
    },
  }
</script>
