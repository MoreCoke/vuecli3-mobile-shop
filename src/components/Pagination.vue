<template>
  <div class="mb-3">
    <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item" :class="{'disabled' : !propPage.has_pre}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="$emit('pageData',(propPage.current_page -1))"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in propPage.total_pages"
          :key="page"
          :class="{'active': propPage.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="$emit('pageData',page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled' : !propPage.has_next}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="$emit('pageData',(propPage.current_page +1))"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name:"Product",
  props: ["propPage"]
};
</script>