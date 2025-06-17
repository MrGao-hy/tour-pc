import React, { useEffect } from 'react';
import { Switch, ConfigProvider, theme } from 'antd';
import { setDarkMode } from '@/store/reducer/settingSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
const { darkAlgorithm } = theme;

const DarkModeSwitch = () => {
  const isDarkMode = useSelector((state: RootState) => state.setting.isDarkMode);
  const dispatch: AppDispatch = useDispatch();
  return (
    <Switch
      checked={isDarkMode}
      checkedChildren="🌜"
      unCheckedChildren="🌞"
      onChange={(checked) => dispatch(setDarkMode(checked))}
    />
  );
}

export function DarkModeConfigProvider({
                                         children
                                       }: {
  children: React.ReactNode;
}) {
  const isDarkMode = useSelector((state: RootState) => state.setting.isDarkMode);
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? [darkAlgorithm] : undefined
      }}
    >
      {children}
    </ConfigProvider>
  );
}
export default DarkModeSwitch
