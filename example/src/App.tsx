import './App.css';

import { useState } from 'react';
import { Card, Affix } from 'antd';
import { SketchPicker } from 'react-color';
import { getThemeVariable } from '@spark-build/transform-antd-theme-variable/dist/generateThemeVariable/getThemeVariable';

// @ts-ignore
import { variables as originVariables } from '../antdThemeVariables';

import { Components } from './Components';

const Wrap = ({ children }: React.PropsWithChildren<{}>) => {
  const [variables, setVariables] = useState(originVariables);

  return (
    <div className="app">
      <div className="components" style={variables}>{children}</div>

      <Affix>
        <Card title="切换主题色">
          <SketchPicker
            color={variables['--primary-color']}
            onChange={(v) => setVariables(getThemeVariable({ primaryColor: v.hex }))}
          />
        </Card>
      </Affix>
    </div>
  );
};

function App() {
  return (
    <Wrap>
      <Components />
    </Wrap>
  );
}

export default App;
