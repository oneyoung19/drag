<template>
  <div class="container">
    <table class="table" border="1" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th class="forth">first</th>
          <th class="forth">second</th>
          <th class="forth">third</th>
          <th class="forth">forth</th>
          <th class="forth">forth</th>
          <th class="forth">forth</th>
          <th class="forth">forth</th>
          <th class="forth">forth</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td class="forth">123</td>
          <td class="forth">123</td>
          <td class="forth">123</td>
          <td class="forth">123</td>
        </tr>
        <tr>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td>123</td>
          <td class="forth">123</td>
          <td >123</td>
          <td>123</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.container {
  width: 2000px;
  border: 1px solid #000;
  overflow: scroll;
}
.table {
}
.forth {
  width: 100px;
}
th, td {
  text-align: center;
}
</style>
