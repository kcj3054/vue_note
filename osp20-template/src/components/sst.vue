<template>
  <div>
    <h1>{{ value }}</h1>
    <h2>{{ description }}</h2>
    <button id="btn" :disabled="button_disabled" @click="speech_start">
      버튼
    </button>
    <button @click="speech_stop">녹음 멈추기</button>

    <h3>{{ $store.state.history }}</h3>
    <div class="image-warpper">
      <img :src="image.download_url" :alt="image.author" v-for="(image,i) in images" :key="i">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      value: "",
      description: "녹음을 시작하세요.",
      recognition: null,
      result: "",
      button_disabled: false,
    };
  },
  computed : {
    ...mapState(['images'])
  },
  mounted() {
    // 크롬에서 webkit이 들어가있다 
    //let recognition = new webkitSpeechRecognition();
    var recognition = new window.webkitSpeechRecognition
    recognition.lang = "ko-KR";
    recognition.interimResults = false;

    this.recognition = recognition;
  },
  methods: {
    change() {
      this.$store.commit("change", 125);
    },
    speech_start() {
      this.recognition.start();

      this.recognition.onstart = () => {
        this.description = "녹음 중 입니다.";
        this.button_disabled = true;
      };

      this.recognition.onspeechend = () => {
        this.description = "녹음 끝.";
        this.button_disabled = false;
      };

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.result = result;

        this.$store.dispatch("addToHistory", [result]);
      };
    },
    speech_stop() {
      this.recognition.stop();
      this.description = "녹음 끝.";
      this.button_disabled = false;
    },
  },
};
</script>

<style lang="scss">
#btn {
  font-size: 30px;
  width: 100px;
  height: 60px;
}
.image-warpper {
  img {
    width: 100%;
    height: auto;
  }
}
</style>