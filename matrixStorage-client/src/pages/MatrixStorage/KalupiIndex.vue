<template>
  <div class="q-pa-lg row justify-center">
    <div
      class="col"
      style="max-width: 500px"
    >
      <q-table
        v-if="isMounted"
        title="Matrixes"
        :data="matrixes"
        :columns="columns"
        row-key="UIDMatrix"
        flat
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            label="Dodaj kalup"
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
            Kalup
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Matrix Designation"
            :error="!matrix.matrixDesignation || matrix.matrixDesignation.lenght === 0"
            error-message="Oznaka kalupa je potrebna."
            label="Oznaka kalupa"
            v-model="matrix.matrixDesignation"
          />
          <q-select
            label="Klijent"
            dense
            v-model="matrix.client"
            :options="clients"
            option-value="UIDClient"
            option-label="name"
          />
          <q-select
            label="Lokacija"
            dense
            v-model="matrix.location"
            :options="locations"
            option-value="UIDLocation"
            option-label="name"
          />  
          <q-input
            ref="Weight"
            :error="!matrix.weight || matrix.weight.length === 0"
            error-message="Težina je potrebna."
            label="Težina"
            v-model="matrix.weight"
          />
          <q-input
            ref="In Use"
            :error="!matrix.inUse || matrix.inUse.lenght === 0"
            error-message="Koristi se je potrebno."
            label="Koristi se"
            v-model="matrix.inUse"
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
  name: 'KalupiIndex',
  data () {
    return {
      openDialog: false,
      matrix: null,
      matrixModel: {
        UIDMatrix: null,
        weight: null,
        inUse: null,
        matrixDesignation: null,
        clientName:null,
        locationName:null
      },
      isMounted: false,
      matrixes: [],
      columns: [
         {
          name: 'matrixDesignation',
          label: 'Oznaka kalupa',
          align: 'left',
          field: 'matrixDesignation',
          sortable: true
        },
        {
          name: 'weight',
          label: 'Težina',
          align: 'left',
          field: 'weight',
          sortable: true
        },
        {
          name: 'inUse',
          label: 'Koristi se',
          align: 'left',
          field: 'inUse',
          sortable: true
        },
        {
          name: 'clientName',
          label: 'Klijent',
          align: 'left',
          field: 'client',
          sortable: true
        },
        {
          name: 'locationName',
          label: 'Lokacija',
          align: 'left',
          field: 'location',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Opcije:',
          align: 'left',
          field: null,
          sortable: false
        }
      ],
      clients:[],
      locations:[],
    }
  },
  mounted: function () {
    let collectionRef = this.$db.collection('matrix')
    collectionRef.get()
      .then((rows) => {
        rows.forEach((row) => {
          this.matrixes.push(row.data())
        })
        this.isMounted = true
      })
      collectionRef = this.$db.collection('client')
    collectionRef.get()
      .then((clients) => {
        clients.forEach((client) => {
          this.clients.push(client.data())
        })
      })
        collectionRef = this.$db.collection('location')
    collectionRef.get()
      .then((locations) => {
        locations.forEach((location) => {
          this.locations.push(location.data())
        })
      })

  },
  methods: {
    onNewRow () {
      this.matrix = JSON.parse(JSON.stringify(this.matrixModel))
      this.openDialog = true
    },
    onOKClick () {
      console.log(this.$refs['Weight'].hasError)
      console.log(this.$refs['In Use'].hasError)
      console.log(this.$refs['Matrix Designation'].hasError)
      if (!this.$refs['Weight'].hasError &&
        !this.$refs['In Use'].hasError &&
        !this.$refs['Matrix Designation'].hasError)       {
        let collectionRef = this.$db.collection('matrix')
        if (this.matrix.UIDMatrix === null) {
          collectionRef.add(this.matrix)
            .then((doc) => {
              this.matrix.UIDMatrix = doc.id
              var docRef = this.$db.collection('matrix').doc(doc.id)
              docRef.update({ UIDMatrix: doc.id })
                .then((response) => {
                  this.matrix.UIDMatrix = doc.id
                  this.matrixes.push(this.matrix)
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
          var docRef = this.$db.collection('matrix').doc(this.matrix.UIDMatrix)
          docRef.set(this.matrix)
            .then((response) => {
              let matrix = this.matrixes.find(matrix => matrix.UIDMatrix === this.matrix.UIDMatrix)
              if (matrix) {
                for (const attributeName in this.matrix) {
                  matrix[attributeName] = JSON.parse(JSON.stringify(this.matrix[attributeName]))
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
    onUpdateRow (matrix) {
      this.matrix = JSON.parse(JSON.stringify(this.matrixModel))
      for (const attributeName in this.matrix) {
        this.matrix[attributeName] = JSON.parse(JSON.stringify(matrix[attributeName]))
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
        let docRef = this.$db.collection('matrix').doc(row.UIDMatrix)
        docRef.delete()
          .then(() => {
            let index = this.matrixes.findIndex(matrix => matrix.UIDMatrix === row.UIDMatrix)
            if (index >= 0) {
              this.matrixes.splice(index, 1)
            }
          }).catch((error) => {
            console.error('Error removing document: ', error)
          })
      })
    }
  }
}
</script>
