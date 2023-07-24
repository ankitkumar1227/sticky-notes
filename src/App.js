import { React } from "react";
import "./Components/css/App.css";
import Header from "./Components/NoteComponents/Header";
import Notes from "./Components/NoteComponents/Notes";
import { Provider } from "react-redux";
import store from './../src/Components/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="main">
        <Header />
        <Notes />
      </div>
    </Provider>
  );
}
export default App;