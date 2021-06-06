import '@/app.css';
import ReactDOM from 'react-dom';
import { isFn } from '@spark-build/web-utils';
import { RenderAntdConfigProvider } from '@@/antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { RenderAppRouter } from '@@/routes/Router';


function renderRouter(children?: React.ReactElement) {
  return (
    <Router>
      <RenderAppRouter />

      {children}
    </Router>
  );
}

function renderAntdConfigProvider(children?: React.ReactElement) {
  return <RenderAntdConfigProvider>{children}</RenderAntdConfigProvider>;
}

function ReactDOMContainer(ele: React.ReactElement) {
  ReactDOM.render(ele, document.getElementById('root'));
}


const renderContainers = [renderRouter, renderAntdConfigProvider, ReactDOMContainer] as (
  | typeof renderAntdConfigProvider
  | React.ReactElement
)[];

renderContainers.reduce((prev, current) => {
  if (!isFn(current)) {
    return prev;
  }

  return current(isFn(prev) ? prev() : prev);
});
    

