<template>
  <div id="app">
    <app-header @openEditor="editorOpen = !editorOpen"></app-header>
    <app-note-editor
      v-if="editorOpen"
      @noteAdded="newNote"
      @noteDeleted="deleteNote"
    ></app-note-editor>
    <div class="accordion-container">
      <item
        v-for="(note, index) in notes"
        :key="`note-${index}`"
        :note="note"
        :lockNote="lockNote"
        :deleteNote="deleteNote"
        :index="index"
      /> 
    </div>
    <div>
      <app-Sst></app-Sst>
    </div>
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import Item from "./components/Item.vue";
import sst from "./components/sst.vue";

//prompt 자바스크립트 비밀ㄴ호
export default {
  name: "App",
  data: function () {
    return {
      opacity: 0,
      editorOpen: false,
      notes: [
        {
          title: "Code",
          text: "1131112",
          theme: "#FF8A80",
          opacity: 0.1,
          password: "",
          isLocked: false,
          description: "",
          active: "",
        },
        {
          title: "event",
          text: "event",
          theme: "#DDA0DD",
          opacity: 0.1,
          password: "",
          isLocked: false,
          description: "",
          active: "",
        },
      ],
    };
  },
  computed: {},
  methods: {
    newNote(title, text, theme, opacity) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        opacity: opacity,
        password: "",
        isLocked: false,
      });
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    // 몇번째 note에 접근할지
    lockNote(index) {
      // 1. 비밀번호 입력
      // 2. 확인용 비밀번호 입력
      // 1, 2 맞으면? -> OK -> 해당 노트의 isLocked가 true 값으로 전환되어야 한다. -> 아코디언 메뉴가 접힌다.
      // 틀리면? -> 메시지 출력
    
      const password = prompt("비밀번호를 입력하세요");
      const truePassNum = prompt("비밀번호를 다시 입력해주세요");
      // cin, scanf,

      if (password === truePassNum) {
        this.notes[index].isLocked = true;
      } else {
        console.log('틀렸습니다');
      }
    },
    //비밀번호확인
  },
  mounted() {
    if (localStorage.getItem("notes")) {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    }
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
  },
  components: {
    appNoteEditor: NoteEditor,
    appHeader: Header,
    Item, 
    appSst : sst
  },
};
</script>

// margin  a(상하) , b(좌우) 
<style lang="scss">
@import "/styles/global.scss";
.accordion-container {
  max-width: 960px;
  margin: 0 auto;
}

.header {
  position: relative;
}

// 상위 컴포넌트가 relative이면 absolute는 relative에 영향을 받게된다
.delete {
  position: absolute;
  right: 10px;
}

.lock {
  position: absolute;
  right: 30px;
}
</style>
