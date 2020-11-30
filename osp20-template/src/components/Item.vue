<template>
  <div
    class="item"
    :style="{
        'background-color': note.theme,
        color: `rgba(0,0,0,${getOpacity(note.opacity)}`,
    }"
    >
    <!-- color: `rgba(0,0,0,${note.opacity / 100})` -->
    <!-- 'opacity': note.opacity / 100 -->
    <!-- opacity: 0 ~ 1 범위 -->
    <!-- color: 100 -->

    <!-- 포지션 리레이티브 속성 -->
    <div class="header">
        <!-- font awesome 폰트디자인 만들어져 있는거 써먹을 수 있다, index.html  -->
        <span class="lock" @click.prevent="lockNote(index)">
        <i :class="note.isLocked ? 'fas fa-lock' : 'fas fa-lock-open'"></i>
        </span>
        <span class="delete" @click.prevent="deleteNote(index)"
        ><i class="fas fa-times"></i
        ></span>
        <span>{{ note.title }}</span>
    </div>
    
    <!-- v-if="!note.isLocked" -->
    <div  v-if="!note.isLocked" class="contents">
        <p ref="selectText">{{ note.text }}</p>
        <input
        v-model="note.opacity"
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="100"
        />

        <label for="volume">Opacity</label>
        <div>opacity: {{ getOpacity(note.opacity) }}</div>
    </div>
    </div>
</template>

<script>
export default {
    name: "Item",
    props: {
        note: {
            type: Object,
            required: true
        },
        lockNote: {
            type: Function,
            required: true
        },
        deleteNote: {
            type: Function,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        getOpacity(opacity) {
            return opacity / 100;
        },
        testFunction() {
            const query = window.getSelection().toString();
            if (query) {
                window.open(`https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${query}`, '_blank');
            }
        }
    },
    mounted() {
        document.addEventListener('mouseup', event => {
        if (event.target === this.$refs.selectText || event.target.contains(this.$refs.selectText))
            this.testFunction();
        });
    }
}
</script>

<style>

</style>