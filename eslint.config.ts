import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  {
    name: 'app/vue-template-formatting',
    files: ['**/*.vue'],
    rules: {
      'no-trailing-spaces': 'error',
      'vue/max-attributes-per-line': ['error', {
        multiline: {
          max: 1,
        },
        singleline: {
          max: 1,
        },
      }],
      'vue/first-attribute-linebreak': ['error', {
        multiline: 'below',
        singleline: 'ignore',
      }],
      'vue/html-closing-bracket-newline': ['error', {
        multiline: 'always',
        selfClosingTag: {
          multiline: 'always',
          singleline: 'never',
        },
        singleline: 'never',
      }],
      'vue/multiline-html-element-content-newline': ['error', {
        ignoreWhenEmpty: true,
      }],
      'vue/html-indent': ['error', 2, {
        alignAttributesVertically: false,
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
      }],
    },
  },
)
