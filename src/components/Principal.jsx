import { Card } from 'primereact/card';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Cabecera from './Cabecera/Cabecera';
import MenuLateral from "./MenuLateral/MenuLateral";

const Principal =({children})=>{

    return(
        <Splitter style={{ height: '99vh' }}>
        <SplitterPanel size={92} minSize={92}>
          <Splitter layout="vertical">
            <SplitterPanel className="flex align-items-center justify-content-center" size={8} minSize={8} maxSize={8} >
              <Cabecera />
            </SplitterPanel>
            <SplitterPanel size={92} minSize={92} maxSize={92}>
              <Splitter>
              <SplitterPanel className="flex align-items-center justify-content-center" size={10} minSize={10} maxSize={10}>
                <MenuLateral />
              </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center" size={90} minSize={90} maxSize={90} >
                  {children}
                </SplitterPanel>
              </Splitter>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>

    )
}

export default Principal;