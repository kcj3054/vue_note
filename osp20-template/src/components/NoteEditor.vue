<template>
  <div class="note-grid">
    <div class="note-editor">
      <input
        class="title-input"
        type="text"
        v-model="title"
        placeholder="Title"
      />
      <textarea
        rows="10"
        v-model="text"
        placeholder="Take a note..."
      ></textarea>
      <div class="note-editor-bottom">
        <button @click="createNew" class="fas fas-check-circle">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
      <div>
        <!-- <Photoshop-picker v-model="colors" /> -->
        <compact-picker v-model="colors" />
      </div>
    </div>
    <div>
      <p>{{ value }}</p>
      <p>{{ description }}</p>
      <button id="btn" :disabled="button_disabled" @click="speech_start">
        버튼
      </button>
      <button @click="speech_stop">녹음 멈추기</button>
      <p>{{ $store.state.history }}</p>
    </div>
  </div>
</template>

<script>
import { Compact } from "vue-color";

export default {
  components: {
    // "Photoshop-picker": Photoshop,
    "compact-picker": Compact,
  },
  data: function () {
    return {
      title: "",
      theme: "",
      text: "",
      colors: " ",
    };
  },
  methods: {
    createNew() {
      this.$emit("noteAdded", this.title, this.text, this.theme);
      this.title = "";
      this.text = "";
      this.theme = this.colors.hex;
    },
    deleteNote(index) {
      this.$emit("noteDeleted", index);
    },
  },
};
</script>
