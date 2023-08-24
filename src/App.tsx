import { ToastContainer } from 'react-toastify';
import './App.css';

import Header from './components/header';
import ProMode from './components/proMode';

export type decodedTextType = string | number | null;

function App() {
  return (
    <main className="App h-screen flex justify-center items-center p-3">
      <section className="md:w-[600px]  mx-auto">
        <Header text="Bus Code SCANNER" />
        <ProMode />
      </section>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default App;
