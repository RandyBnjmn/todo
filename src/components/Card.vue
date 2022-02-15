<template>
  <!-- @dblclick="$emit('completada', tarea.id)" -->
  <v-card
    @dblclick="$emit('edit', tarea)"
    outlined
    elevation="2"
    class="mx-2"
    :class="color"
  >
    <v-card-title>{{ tarea.titulo }}</v-card-title>

    <v-card-subtitle>{{ tarea.fecha }}</v-card-subtitle>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card-text v-on="on" v-bind="attrs">{{ descripcion }}</v-card-text>
      </template>
      <span>{{ tarea.descripcion }}</span>
    </v-tooltip>

    <v-card-actions>
      <span> {{ isCompleted }}</span>
      <v-row justify="end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="$emit('delete', tarea.id)"
              :icon="true"
              color="red"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: {
      tarea: {
        type: Object,
        require: true,
      },
    },
    computed: {
      isCompleted() {
        if (
          !this.tarea.completada &&
          new Date(this.tarea.fecha).getTime() < Date.now()
        ) {
          return 'Vencida'
        }
        if (this.tarea.completada) {
          return 'Completada'
        }
        if (!this.tarea.completada) {
          return 'Pendiente'
        }

        return ''
      },
      color() {
        return !this.tarea.completada &&
          new Date(this.tarea.fecha).getTime() < Date.now()
          ? 'red lighten-4'
          : this.tarea.completada
          ? 'green lighten-4'
          : 'yellow lighten-4'
      },
      descripcion() {
        return this.tarea.descripcion.length > 40
          ? this.tarea.descripcion.substring(0, 40) + '...'
          : this.tarea.descripcion
      },
    },
  }
</script>
