import { Provider } from "mobx-react";
import * as React from "react";
import "./App.css";
import Casual from "./component/Casual";
import Store from "./store/store";

const store = {
  store: new Store()
};

class App extends React.Component {
  // 在这里我们要使用mobx-react里的Provider，
  // 把所有的state注入Provider中，后面的子组件都可以使用@inject("想要使用的state")注入被观察者。
  public render() {
    return (
      <Provider {...store}>
        <div>
          <Casual />
        </div>
      </Provider>
    );
  }
}

export default App;
