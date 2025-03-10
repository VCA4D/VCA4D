<template>
  <Section
    :title="continent"
    :textColor="CONTINENT_TEXT_COLORS[continent]"
    :borderColor="CONTINENT_BG_COLORS[continent]"
  >
    <CardList>
      <li v-for="item in getStudiesByCountry()" :key="item.country">
        <template v-if="item.studies.length === 1">
          <Card
            :link="getLink(item.studies[0])"
            :isLocal="item.studies[0].local"
            :title="getCountry(item.country).prettyName"
          >
            <template #logo>
              <LogoCountryLarge :isoCode="getCountry(item.country).iso || 'gr'" />
            </template>
            <template #footer>
              <CardFooter class="" :text="getProduct(item.studies[0].product).prettyName">
                <template #logo>
                  <LogoProductSmall :productName="item.studies[0].product" />
                </template>
              </CardFooter>
            </template>
          </Card>
        </template>
        <template v-else>
          <Dropdown
            :shown="openedCountry === item.country"
            :triggers="[]"
            :overflowPadding="20"
            placement="bottom"
          >
            <Card
              :isLocal="false"
              :isOpen="openedCountry === item.country"
              :title="getCountry(item.country).prettyName"
              @click.stop="
                openedCountry === item.country
                  ? (openedCountry = null)
                  : (openedCountry = item.country)
              "
            >
              <template #logo>
                <LogoCountryLarge :isoCode="getCountry(item.country).iso || 'gr'" />
              </template>
              <template #footer>
                <CardFooter text="studies">
                  <template #logo>
                    <NumberBadge :value="item.studies.length" />
                  </template>
                </CardFooter>
              </template>
            </Card>
            <template #popper>
              <SubCardsList
                v-if="openedCountry === item.country"
                :link="{
                  name: 'comparison',
                  query: { studies: getStudyListQueryString(item.studies.map((study) => study.id)) }
                }"
                :linkTitle="`Compare all ${getCountry(item.country).prettyName} studies`"
              >
                <Card
                  v-for="study in item.studies"
                  :key="study.id"
                  :link="getLink(study)"
                  :isLocal="study.local"
                  :title="getProduct(study.product).prettyName"
                >
                  <template #logo>
                    <LogoProductLarge :productName="study.product" />
                  </template>
                </Card>
              </SubCardsList>
            </template>
          </Dropdown>
        </template>
      </li>
    </CardList>
  </Section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getLink } from '@utils/router'
import { getCountry, getProduct } from '@utils/data'
import { getStudyListQueryString } from '@utils/router.js'
import LogoProductLarge from './LogoProductLarge.vue'
import LogoProductSmall from './LogoProductSmall.vue'
import LogoCountryLarge from './LogoCountryLarge.vue'
import Section from './Section.vue'
import CardList from './CardList.vue'
import CardFooter from './CardFooter.vue'
import NumberBadge from './NumberBadge.vue'
import Card from './Card.vue'
import SubCardsList from './SubCardsList.vue'
import { Dropdown } from 'floating-vue'

const props = defineProps({
  continent: String,
  studies: Array,
  countries: Array
})

const CONTINENT_BG_COLORS = {
  Europe: '#0073CF',
  Africa: '#5F8A64',
  America: '#C46D4D',
  'Asia - Pacific': '#F6E065'
}
const CONTINENT_TEXT_COLORS = {
  Europe: '#0073CF',
  Africa: '#5F8A64',
  America: '#C46D4D',
  'Asia - Pacific': '#806C00'
}

const openedCountry = ref(null)

const closeCountry = () => {
  openedCountry.value = null
}
onMounted(() => {
  document.addEventListener('click', closeCountry)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeCountry)
})

const getStudiesByCountry = () => {
  const countries = [...new Set(props.studies.map((study) => study.country))]
  countries.sort((a, b) => a.localeCompare(b))
  return countries.map((country) => ({
    country,
    studies: props.studies.filter((study) => study.country === country)
  }))
}
</script>

<style scoped lang="scss"></style>
