<template>
 <b-modal ref="UpdateModal"
         id="UpdateModal"
         title="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-title-edit-group"
                label="Item:"
                label-for="form-item-edit-input">
      <b-form-input id="form-item-edit-input"
                    type="text"
                    v-model="editForm.item"
                    required
                    placeholder="Enter item">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-quantity-edit-group"
                  label="Quantity:"
                  label-for="form-quantity-edit-input">
        <b-form-input id="form-quantity-edit-input"
                      type="text"
                      v-model="editForm.quantity"
                      required
                      placeholder="Enter Quantity">
        </b-form-input>
      </b-form-group>
    <b-button-group>
      <b-button type="submit" variant="primary">Update</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>
    </b-button-group>
  </b-form>
</b-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateModal',
  data() {
    return {
    };
  },
  props: {
    editForm: {
      required: true,
    },
  },
  methods: {
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.UpdateModal.hide();
      this.initForm();
      this.getList();
    },
    test() {
      console.log('hola');
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.UpdateModal.hide();
      const payload = {
        item: this.editForm.item,
        quantity: this.editForm.quantity,
      };
      this.updateItem(payload, this.editForm.id);
    },
    updateItem(payload, itemID) {
      const path = `https://shopping-back-end.herokuapp.com/list/${itemID}`;
      axios.put(path, payload)
        .then(() => {
          this.$parent.getList();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.$parent.getList();
        });
    },
  },
};
</script>
