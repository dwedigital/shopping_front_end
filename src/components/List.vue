<template>
<div class="container">
    <div class="row">
    <div class="col-sm-10">
        <h1>Shopping List</h1>
        <alert class="message" :message="message" v-show="showMessage"
        ref="Alert"></alert>
        <hr><br>
        <button id="test" type="button" class="btn btn-success btn-md"
        v-b-modal.item-modal
        v-on:click="clearMessage"
        >Add Item</button>
        <table class="table table-hover mt-5">
            <thead>
                <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">In Basket?</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in list" :key="item.id" :class="{
                    bought: item.status,
                    }">
                    <td :class="{
                    strike: item.status,
                    }">{{ item.item }}</td>
                    <td :class="{
                    strike: item.status,
                    }">{{item.quantity}}</td>
                    <td>
                        <span v-if="item.status"><input type="checkbox"
                        @change="boughtItem(item.id, false)" checked/></span>
                        <span v-else><input type="checkbox"
                        @change="boughtItem(item.id, true)"/></span>
                        </td>
                   <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm"
                  v-b-modal.UpdateModal
                  @click="editItem(item)"
                  >Update</button>
                  <button type="button" class="btn btn-danger btn-sm"
                  @click="deleteItem(item.id)">Delete</button>
                </div>
              </td>
                </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-danger btn-sm mt-5 mb-5 p-2"
        v-on:click="clearList"
        v-show="showDelete"
        >Clear List</button>
    </div>
    </div>
<add-item-modal/>
<!--Update Modal-->
<update-modal v-bind:editForm="editForm" ref="editModal"/>
</div>

</template>

<script>
import axios from 'axios';
import UpdateModal from './UpdateModal.vue';
import AddItemModal from './AddItem.vue';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      list: [],
      message: '',
      showMessage: false,
      showDelete: false,
      listLength: 0,
      editForm: {
        id: 0,
        item: '',
        quantity: '',
      },
    };
  },
  methods: {
    getList() {
      const path = 'https://shopping-back-end.herokuapp.com/list';
      axios.get(path)
        .then((res) => {
          this.list = res.data.list;
        })
        .then(() => {
          if (this.list.length > 0) {
            this.showDelete = true;
          } else {
            this.showDelete = false;
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    alert(payload) {
      this.showMessage = payload.showMessage;
      this.message = payload.message;
      setTimeout(() => {
        this.showMessage = false;
        return true;
      }, 2000);
    },
    clearMessage() {
      this.showMessage = false;
    },
    editItem(item) {
      this.editForm.id = item.id;
      this.editForm.item = item.item;
      this.editForm.quantity = item.quantity;
    },
    boughtItem(id, status) {
      console.log(status);
      const payload = {
        status,
      };
      const path = `https://shopping-back-end.herokuapp.com/bought/${id}`;
      axios.put(path, payload)
        .then(() => {
          this.getList();
        })
        .catch((error) => {
        // eslint-disable-next-line
          console.log(error);
          this.getList();
        });
    },
    deleteItem(id) {
      const path = `https://shopping-back-end.herokuapp.com/list/${id}`;
      axios.delete(path)
        .then(() => {
          this.getList();
        })
        .catch((error) => {
        // eslint-disable-next-line
          console.log(error);
          this.getList();
        });
    },
    clearList() {
      const path = 'https://shopping-back-end.herokuapp.com/list';
      axios.delete(path)
        .then(() => {
          this.getList();
        })
        .catch((error) => {
        // eslint-disable-next-line
          console.log(error);
          this.getList();
        });
    },
  },
  created() {
    this.getList();
  },
  mounted() {
    console.log(this.$refs.editModal.test());
    console.log(this.$refs.addItemModal);
  },
  components: {
    UpdateModal,
    AddItemModal,
    Alert,
  },
};
</script>

<style scoped>
.bought{
    background-color: #e8f5e9;
}

.strike{
    text-decoration: line-through;
}

.btn-group{
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-group button{
  padding:0.2rem;
  border-radius: 2px!important;
  width: 100%;
}
.btn-group :nth-child(1){
  margin-bottom: 2px;
}

.table td{
  padding:0.75rem 0;
}

</style>
