<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Agregar
        <v-icon small>add</v-icon>
      </v-btn>
    </template>
    <v-form
      ref="form"
      @submit.prevent="validar"
      lazy-validation
      v-model="valid"
    >
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
                  :rules="tituloRules"
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
                      :rules="fechaRules"
                      required
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
                  :rules="descripcionRules"
                ></v-textarea>
              </v-col>

              <v-col cols="6">
                <v-checkbox label="Completada" v-model="tarea.completada">
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
          <v-btn color="blue darken-1" text type="submit"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        tarea: {
          titulo: '',
          descripcion: '',
          completada: false,
          fecha: null,
        },
        dialog: this.open,
        datePicker: false,
        tituloRules: [(v) => !!v || 'Este campo es requerido'],
        descripcionRules: [(v) => !!v || 'Este campo es requerido'],
        fechaRules: [(v) => !!v || 'Este campo es requerido'],
        valid: true,
      }
    },
    props: {
      open: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      validar() {
        if (this.$refs.form.validate()) {
          this.$emit('guardar-tarea', this.tarea)
          this.$refs.form.reset()
          this.dialog = false
        }
      },

      closeDialog() {
        this.dialog = false
        this.clear()
      },

      clear() {
        this.$refs.form.reset()
      },
    },
    computed: {
      ...mapState(['edit']),
    },
  }
</script>
