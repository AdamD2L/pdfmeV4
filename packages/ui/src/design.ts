import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
  },
  components: {
    Form: {
      fontSize: 12,
      margin: 8,
      marginLG: 12,
      marginXS: 4,
      padding: 8,
      paddingLG: 12,
      paddingXS: 4,
      itemMarginBottom: 4,
      verticalLabelPadding: '0 0 2px',
    },
  },
};

const background = 'rgb(74, 74, 74)';
const controllerBackground = '#777777bd';
const controllerTextColor = '#ffffff';
const controllerStyle = {
  textColor: controllerTextColor,
  background: controllerBackground,
  height: 40,
};
// TODO これ本当に必要かな？少なくとも外からカスタマイズできる必要はないかも
// となるとcontextを使わず普通にconstantsで管理すればいいかも
// 高さ、横幅は絶対値で指定する
// カラーはなんとか https://ant.design/docs/react/customize-theme#theme から入れる
export const style = {
  Sidebar: { background: '#fffffffa' },
  ErrorScreen: { background, cardBackground: '#ffffffad' },
  Mask: { background: 'rgba(158, 158, 158, 0.58)' },
  Root: { background },
  UnitPager: controllerStyle,
  CtlBar: { ...controllerStyle, barWidth: 300 },
};
