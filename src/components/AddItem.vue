<template>
  <b-modal ref="addItemModal" id="item-modal" title="Add a new item" hide-footer>
    <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-title-group" label="Item:" label-for="form-item-input">
        <b-form-input
          id="form-item-input"
          type="text"
          v-model="addItemForm.item"
          required
          placeholder="Enter item"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-quantity-group" label="Quantity:" label-for="form-quantity-input">
        <b-form-input
          id="form-quantity-input"
          type="number"
          v-model="addItemForm.quantity"
          required
          placeholder="Enter quantity"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddItemModal',
  data() {
    return {
      addItemForm: {
        item: '',
        quantity: 1,
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addItemModal.hide();
      const payload = {
        item: this.addItemForm.item,
        quantity: this.addItemForm.quantity,
      };
      this.addItem(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addItemModal.hide();
      this.initForm();
    },
    initForm() {
      this.addItemForm.item = '';
      this.addItemForm.quantity = 1;
    },
    addItem(payload) {
      const path = 'https://shopping-back-end.herokuapp.com/list';
      axios
        .post(path, payload)
        .then(() => {
          this.$parent.getList();
          this.$parent.alert({
            message: 'Item added',
            showMessage: true,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.$.parent.getList();
          this.showMessage = 'There was an error';
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 2000);
        });
      this.initForm();
    },
  },
};
</script>
