import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Layout />
    </>
  );
}

export default App;
