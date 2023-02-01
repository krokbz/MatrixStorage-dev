<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Skladište Kalupa
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Izbornik</q-item-label>
        <q-item
          clickable
          to="/kalupi"
        >
          <q-item-section avatar>
            <q-icon name="view_carousel" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kalupi</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/lokacije"
        >
          <q-item-section avatar>
            <q-icon name="location_on" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Lokacije</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/klijenti"
        >
          <q-item-section avatar>
            <q-icon name="work" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Klijenti</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          @click="home"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Početna</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          @click="logout"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Odjavi Se</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MatrixStorageLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$auth.signOut()
        .then(() => {
          this.$router.push('/')
        })
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>
