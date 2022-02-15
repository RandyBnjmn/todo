<template>
  <!-- @dblclick="$emit('completada', tarea.id)" -->
  <v-card
    outlined
    elevation="2"
    class="mx-2"
    :class="tarea.completada ? 'green lighten-5' : 'red lighten-5'"
  >
    <v-card-title>{{ tarea.titulo }}</v-card-title>

    <v-card-subtitle>{{ tarea.fecha }}</v-card-subtitle>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card-text v-on="on" v-bind="attrs">{{ descripcion }}</v-card-text>
      </template>
      <span>{{ tarea.descripcion }}</span>
    </v-tooltip>
    <!-- style="justify-content: space-between" -->
    <v-card-actions>
      <span> {{ isCompleted }}</span>
      <v-row justify="end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="$emit('edit', tarea.id)"
              :icon="true"
              color="warning"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="warning">edit</v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
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
        return this.tarea.completada ? 'Completada' : 'Pendiente';
      },
      descripcion() {
        return this.tarea.descripcion.length > 40
          ? this.tarea.descripcion.substring(0, 40) + '...'
          : this.tarea.descripcion;
      },
    },
  };
</script>
