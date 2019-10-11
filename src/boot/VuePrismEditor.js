// import something here
import * as editor from "vue2-ace-editor"

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import 'semantic-ui-css/semantic.min.css';
import FileUpload from 'vue-upload-component'

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
  Vue.component('file-upload', FileUpload);

}
