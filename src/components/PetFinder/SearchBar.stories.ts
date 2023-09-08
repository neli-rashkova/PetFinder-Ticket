import SearchBar from "./SearchBar.vue";
import RegularButton from "../Buttons/RegularButton.vue";
import SmallButton from "../Buttons/SmallButton.vue";

export default {
  title: "SearchBar",
  component: SearchBar,
};

export const WithRegularButton = () => ({
  components: { SearchBar, RegularButton },
  data() {
    return {};
  },
  template: `
  <SearchBar />
  `,
});

export const WithSmallButton = () => ({
  components: { SearchBar, SmallButton },
  data() {
    return {};
  },
  template: `
  <SearchBar />
  `,
});
