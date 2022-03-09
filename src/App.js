import "primereact/resources/themes/lara-light-teal/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './App.css';
import { Card } from 'primereact/card';
import FormularioRegistro from './components/FormularioRegistro';

function App() {
  return (
    <div className="App">
      <Card title="Formulario de registro" style={{ width: '55rem', marginBottom: '2em' }}>
        <FormularioRegistro />
      </Card>
    </div>
  );
}

export default App;
