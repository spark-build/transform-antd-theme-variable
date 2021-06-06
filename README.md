# transform-antd-theme-variable

利用 postcss，将 antd 的变量转化为 css variable，以实现无 runtime 的实时动态主题切换

## Installation

```bash
yarn add -D @spark-build/transform-antd-theme-variable
```

## Usage

使用 `transform-antd-theme-variable` 命令进行覆盖

```bash
yarn transform-antd-theme-variable
```

使用 `generateThemeVariable` 命令生成可配置的主题色汇总文件
```bash
yarn generateThemeVariable

// export const variables = {
//   '--primary-color': '#1890ff',
//   '--primary-color-fade': 'rgba(24, 144, 255, 0.04)',
//   '--primary-active-color': '#ffffff',
//   '--primary-hover-color': '#ffffff',
//   '--primary-color-lighten-20': '#7ec1ff',
//   '--primary-color-lighten-35': '#cbe6ff',
//   '--link-hover-color': '#40a9ff',
//   '--link-active-color': '#096dd9',
//   '--table-selected-row-bg--darken-2': '#003465',
//   '--primary-color--lighten-20': '#7ec1ff',
//   '--primary-color--lighten-35': '#cbe6ff',
//   '--primary-color--fade-12': 'rgba(24, 144, 255, 0.12)',
//   '--primary-1': '#e6f7ff',
//   '--primary-2': '#bae7ff',
//   '--primary-3': '#91d5ff',
//   '--primary-4': '#69c0ff',
//   '--primary-5': '#40a9ff',
//   '--primary-6': '#1890ff',
//   '--primary-7': '#096dd9',
//   '--primary-8': '#0050b3',
//   '--primary-9': '#003a8c',
//   '--primary-10': '#002766',
// };
```

#### 示例

```bash
git clone https://github.com/spark-build/transform-antd-theme-variable.git && cd transform-antd-theme-variable && yarn && yarn build && cd example && yarn && yarn dev
```
