<template>
  <div class="q-pa-lg row justify-center">
    <div
      class="col"
      style="max-width: 500px"
    >
      <q-table
        v-if="isMounted"
        title="Clients"
        :data="clients"
        :columns="columns"
        row-key="UIDClient"
        flat
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            label="Dodaj klijenta"
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
            Client
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="EMail"
            :error="!client.eMail || client.eMail.length === 0"
            error-message="EMail je potreban."
            label="EMail"
            v-model="client.eMail"
          />
          <q-input
            ref="Headquarters"
            :error="!client.headquarters || client.headquarters.length === 0"
            error-message="Sjedište je potrebno."
            label="Sjedište"
            v-model="client.headquarters"
          />
          <q-input
            ref="Contact"
            :error="!client.contact || client.contact.length === 0"
            error-message="Kontakt je potreban."
            label="Kontakt"
            v-model="client.contact"
          />
          <q-input
            ref="Name"
            :error="!client.name || client.name.lenght === 0"
            error-message="Ime je potrebno."
            label="Ime"
            v-model="client.name"
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
  name: 'KlijentiIndex',
  data () {
    return {
      openDialog: false,
      client: null,
      clientModel: {
        UIDClient: null,
        eMail: null,
        name: null,
        contact:null,
        headquarters:null
      },
      isMounted: false,
      clients: [],
      columns: [
        {
          name: 'eMail',
          label: 'EMail',
          align: 'left',
          field: 'eMail',
          sortable: true
        },
        {
          name: 'name',
          label: 'Ime',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'contact',
          label: 'Kontakt',
          align: 'left',
          field: 'contact',
          sortable: true
        },
         {
          name: 'headquarters',
          label: 'Sjedište',
          align: 'left',
          field: 'headquarters',
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
    let collectionRef = this.$db.collection('client')
    collectionRef.get()
      .then((rows) => {
        rows.forEach((row) => {
          this.clients.push(row.data())
        })
        this.isMounted = true
      })
  },
  methods: {
    onNewRow () {
      this.client = JSON.parse(JSON.stringify(this.clientModel))
      this.openDialog = true
    },
    onOKClick () {
      if (!this.$refs['EMail'].hasError &&
        !this.$refs['Name'].hasError &&
        !this.$refs['Headquarters'].hasError&&
        !this.$refs['Contact'].hasError) {
        let collectionRef = this.$db.collection('client')
        if (this.client.UIDClient === null) {
          collectionRef.add(this.client)
            .then((doc) => {
              this.client.UIDClient = doc.id
              var docRef = this.$db.collection('client').doc(doc.id)
              docRef.update({ UIDClient: doc.id })
                .then((response) => {
                  this.client.UIDClient = doc.id
                  this.clients.push(this.client)
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
          var docRef = this.$db.collection('client').doc(this.client.UIDClient)
          docRef.set(this.client)
            .then((response) => {
              let client = this.clients.find(client => client.UIDClient === this.client.UIDClient)
              if (client) {
                for (const attributeName in this.client) {
                  client[attributeName] = JSON.parse(JSON.stringify(this.client[attributeName]))
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
    onUpdateRow (client) {
      this.client = JSON.parse(JSON.stringify(this.clientModel))
      for (const attributeName in this.client) {
        this.client[attributeName] = JSON.parse(JSON.stringify(client[attributeName]))
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
        let docRef = this.$db.collection('client').doc(row.UIDClient)
        docRef.delete()
          .then(() => {
            let index = this.clients.findIndex(client => client.UIDClient === row.UIDClient)
            if (index >= 0) {
              this.clients.splice(index, 1)
            }
          }).catch((error) => {
            console.error('Error removing document: ', error)
          })
      })
    }
  }
}
</script>
