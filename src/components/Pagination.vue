<template>
    <nav aria-label="Page navigation pagination-sm">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a class="page-link" @click="onClick(currentPage - 1)">Previous</a>
        </li>
        <li v-for = "page in numberOfPages" :key="page" class="page-item" :class="currentPage == page ? 'active' : ''">
          <a class="page-link" @click="onClick(page)">{{ page }}</a>
        </li>
      <li class="page-item" v-if="numberOfPages !== currentPage">
          <a class="page-link" @click="onClick(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
    props: {
        numberOfPages: {
            type: Number,
            required : true
        },
        currentPage : {
            type: Number,
            required : true
        }
    },
    emits: ['click'],
    setup(props, { emit }) {
        const onClick = (page) => {
            emit('click', page);
        };

        return {
            onClick
        };
    }
}
</script>