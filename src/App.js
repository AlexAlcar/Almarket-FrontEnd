import "primereact/resources/themes/lara-light-teal/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './App.css';
import { Card } from 'primereact/card';
import FormularioRegistro from './components/FormularioRegistro';
import { Splitter, SplitterPanel } from 'primereact/splitter';

function App() {
  return (
    <div className="App">
      
      <Splitter style={{ height: '300px' }}>
        <SplitterPanel className="flex align-items-center justify-content-center" size={20} minSize={10}>
          Panel 1
        </SplitterPanel>
        <SplitterPanel size={80}>
          <Splitter layout="vertical">
            <SplitterPanel className="flex align-items-center justify-content-center" size={15}>
              Panel 2
            </SplitterPanel>
            <SplitterPanel size={85}>
              <Splitter>
                <SplitterPanel className="flex align-items-center justify-content-center" size={20}>
                  Panel 3
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center" size={80}>
                  Panel 4
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>

      
    </div>
  );
}

export default App;
