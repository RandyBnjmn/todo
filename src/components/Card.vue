<template>
  <v-card
    outlined
    elevation="2"
    class="mx-2"
    :class="tarea.completada ? 'green lighten-5' : 'red lighten-5'"
    @dblclick="$emit('completada', tarea.id)"
  >
    <v-card-title>{{ tarea.titulo }}</v-card-title>

    <v-card-subtitle>{{ tarea.fecha }}</v-card-subtitle>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card-text v-on="on" v-bind="attrs">{{ descripcion }}</v-card-text>
      </template>
      <span>{{ tarea.descripcion }}</span>
    </v-tooltip>
    <v-card-actions style="justify-content: space-between">
      <span> {{ isCompleted }}</span>
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
        return this.tarea.completada ? 'Completada' : 'Pendiente'
      },
      descripcion() {
        return this.tarea.descripcion.length > 50
          ? this.tarea.descripcion.substring(0, 50) + '...'
          : this.tarea.descripcion
      },
    },
  }
</script>
