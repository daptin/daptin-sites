// import something here
import * as editor from "vue2-ace-editor"

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import 'semantic-ui-css/semantic.min.css';


import ace from 'brace'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/theme/monokai'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

// "async" is optional
export default async ({Vue}) => {
  // something to do

  Vue.use(VueTabs)
  Vue.component("editor", editor);
  Vue.component('v-select', vSelect);

  Vue.component('tabs', {
    template: `
        <div>
            <div class="tabs">
              <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
              </ul>
            </div>

            <div class="tabs-details">
                <slot></slot>
            </div>
        </div>
    `,

    data() {
      return {tabs: []};
    },

    created() {

      this.tabs = this.$children;

    },
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isActive = (tab.name == selectedTab.name);
        });
      }
    }
  });

  Vue.component('tab', {

    template: `

        <div v-show="isActive"><slot></slot></div>

    `,

    props: {
      name: {required: true},
      selected: {default: false}
    },

    data() {

      return {
        isActive: false
      };

    },

    computed: {

      href() {
        return '#' + this.name.toLowerCase().replace(/ /g, '-');
      }
    },

    mounted() {

      this.isActive = this.selected;

    }
  });

}
