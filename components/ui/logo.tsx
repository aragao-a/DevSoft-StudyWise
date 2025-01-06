import {Image, View, ViewProps, Dimensions, ImageSourcePropType} from 'react-native';
import useComponentSize from '@/hooks/use-component-size';

//Define o altura da tela do usuário
const windowHeight = Dimensions.get("window").height;
type scaleMap = Map<string, number>;
const findScale:scaleMap = new Map;
findScale.set('1-1', 1.77);
findScale.set('1-2', 5.3);

type Props = ViewProps & {
    imageSize:number,
    imageVersion:string,
}
export default function Logo({imageSize, imageVersion, style, ...rest}: Props) {

    //Avalia qual versão da logo é e faz ajustes
    let imgPath: ImageSourcePropType = require('@assets/images/studywise-logo-1-1.png');
    let scale = findScale.get('1-1');
    
    switch(imageVersion) {
        case '1-2':
            imgPath = require('@assets/images/studywise-logo-1-2.png');
            scale = findScale.get('1-2')
            break;
    }

    //Calcula o tamanho da logo com base na proporção especificada ((imageSize * scale) * imageSize)
    const imageHeight = windowHeight * imageSize;
    const imageWidth = imageHeight * (scale || 1);

    //state + callback hook que controla estado da largura e altura do container pai da logo
    const {containerSize, onLayout} = useComponentSize();

    return (
        <View style={style} onLayout= {onLayout}>
            {(containerSize?.height !== null  && containerSize?.height !== undefined && (containerSize?.height - imageHeight > 20)) && 
            <Image style={{height: imageHeight, width: imageWidth}} source= {imgPath}/>}
        </View>
    )
}