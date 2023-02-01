<template>
  <div class="q-pa-lg row justify-center">
    <div
      class="col"
      style="max-width: 500px"
    >
      <q-table
        v-if="isMounted"
        title="Locations"
        :data="locations"
        :columns="columns"
        row-key="UIDLocation"
        flat
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            label="Dodaj lokaciju" 
            @click="onNewRow"
          />
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.name==='actions'">
              <q-btn
                dense
                color="primary"
                icon="edit"
                @click="onUpdateRow(props.row)"
              />
              <q-btn
                dense
                color="primary"
                icon="delete"
                @click="onDeleteRow(props.row)"
              />
            </div>
            <div v-else>
              {{props.row[props.col.field]}}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-if="openDialog"
      v-model="openDialog"
    >
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">
            Location
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Name"
            :error="!location.name || location.name.length === 0"
            error-message="Ime je potrebno."
            label="Ime"
            v-model="location.name"
          />
          <q-input
            ref="Shelf Number"
            :error="!location.shelfNumber || location.name.shelfNumber === 0"
            error-message="Broj police je potreban."
            label="Broj police"
            v-model="location.shelfNumber"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Prihvati"
            @click="onOKClick"
          />
          <q-btn
            color="primary"
            label="Odustani"
            @click="onCancelClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'LokacijeIndex',
  data () {
    return {
      openDialog: false,
      location: null,
      locationModel: {
        UIDLocation: null,
        name: null,
        shelfNumber: null
      },
      isMounted: false,
      locations: [],
      columns: [
        {
          name: 'name',
          label: 'Ime',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'shelfNumber',
          label: 'Broj police',
          align: 'left',
          field: 'shelfNumber',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Opcije:',
          align: 'left',
          field: null,
          sortable: false
        }
      ]
    }
  },
  mounted: function () {
    let collectionRef = this.$db.collection('location')
    collectionRef.get()
      .then((rows) => {
        rows.forEach((row) => {
          this.locations.push(row.data())
        })
        this.isMounted = true
      })
  },
  methods: {
    onNewRow () {
      this.location = JSON.parse(JSON.stringify(this.locationModel))
      this.openDialog = true
    },
    onOKClick () {
      if (!this.$refs['Name'].hasError &&
        !this.$refs['Shelf Number'].hasError) {
        let collectionRef = this.$db.collection('location')
        if (this.location.UIDLocation === null) {
          collectionRef.add(this.location)
            .then((doc) => {
              this.location.UIDLocation = doc.id
              var docRef = this.$db.collection('location').doc(doc.id)
              docRef.update({ UIDLocation: doc.id })
                .then((response) => {
                  this.location.UIDLocation = doc.id
                  this.locations.push(this.location)
                  this.openDialog = false
                })
                .catch(function (error) {
                  console.error('Error adding document: ', error)
                })
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        } else {
          var docRef = this.$db.collection('location').doc(this.location.UIDLocation)
          docRef.set(this.location)
            .then((response) => {
              let location = this.locations.find(location => location.UIDLocation === this.location.UIDLocation)
              if (location) {
                for (const attributeName in this.location) {
                  location[attributeName] = JSON.parse(JSON.stringify(this.location[attributeName]))
                }
              }
              this.openDialog = false
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        }
      }
    },
    onCancelClick () {
      this.openDialog = false
    },
    onUpdateRow (location) {
      this.location = JSON.parse(JSON.stringify(this.locationModel))
      for (const attributeName in this.location) {
        this.location[attributeName] = JSON.parse(JSON.stringify(location[attributeName]))
      }
      this.openDialog = true
    },
    onDeleteRow (row) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Confirm deletion.',
        ok: true,
        cancel: true
      }).onOk(() => {
        let docRef = this.$db.collection('location').doc(row.UIDLocation)
        docRef.delete()
          .then(() => {
            let index = this.locations.findIndex(location => location.UIDLocation === row.UIDLocation)
            if (index >= 0) {
              this.locations.splice(index, 1)
            }
          }).catch((error) => {
            console.error('Error removing document: ', error)
          })
      })
    }
  }
}
</script>

