import { useState, useCallback} from 'react';
import { LayoutChangeEvent } from 'react-native';

export default function useComponentSize(){   
    /* Pega a largura e a altura da tela de tamanho dinâmico em tempo de execução e atualiza objeto com altura e largura */

    const [containerSize, setSize] = useState<null | { width: number; height: number }>(     null   );  

    const onLayout = useCallback(
        (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;  
        setSize({ width, height });   
        }, []);
        
    return {containerSize, onLayout}; }; 