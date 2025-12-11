<script setup>
import * as v from 'vue'
import {goodSales} from "../../Good"

</script>

<template>
  <div class="Sales">
    <table>
      <th>
        Цена / Количесто:
      </th>
      <th v-for="goodCount in goodSales.definedCounts">
        {{ goodCount }}
      </th>
      <tr v-for="rule in goodSales.rules">
        <td>{{ rule.priceRange[0] }} - {{ rule.priceRange[1] }}</td>
        <td v-for="goodCount in goodSales.definedCounts">{{ 
          rule.array.find(sale => sale.count == goodCount) ? rule.array.find(sale => sale.count == goodCount).salePercent : "-"
        }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  table
  {
    padding: 0 100px;
  }
  th, td 
  {
    padding: 5px;
    text-wrap: nowrap;
    background-color: rgba(255, 2555, 255, 0.2);
  }

</style>
