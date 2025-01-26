import { Stack , usePathname} from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import RootBackground from '@/components/ui/root-background';
import * as SystemUI from 'expo-system-ui';
import { colorMap } from '@/constants/color-map';
import { Montserrat_400Regular, Montserrat_600SemiBold, useFonts as useGoogleFonts} from '@expo-google-fonts/montserrat'

SplashScreen.preventAutoHideAsync();

const colors:colorMap = new Map;
colors.set('/', '#00B7C9')
colors.set('/sign-in', '#00B7C9')
colors.set('/sign-up', 'white')
colors.set('/home', 'white')

export default function RootLayout() {
  // Começa a navegação somente se as fontes estiverem carregadas
  const [loadedCustomFonts, errorCustomFonts] = useFonts({
    'VisbyRoundCF-Regular': require('@assets/fonts/VisbyRoundCF-Regular.otf'),
    'VisbyRoundCF-Medium': require('@assets/fonts/VisbyRoundCF-Medium.otf'),
    'VisbyRoundCF-DemiBold': require('@assets/fonts/VisbyRoundCF-DemiBold.otf'),
    'VisbyRoundCF-Bold': require('@assets/fonts/VisbyRoundCF-Bold.otf'),
  });

  const [loadedGoogleFonts, errorGoogleFonts] = useGoogleFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })

  useEffect(() => {
    if ((loadedCustomFonts || loadedGoogleFonts) || errorCustomFonts || errorGoogleFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadedCustomFonts, errorCustomFonts, loadedGoogleFonts, errorGoogleFonts]);


  //Muda a cor de fundo do sistema com base na cor da tela, útil pra quando o teclado subir
  const pathName = usePathname();
  let color = colors.get(pathName) || null;
  if(color === 'undefined') {
    color = null;
  }
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(color);
  }, [color])


  if (!(loadedCustomFonts && loadedGoogleFonts) && !errorCustomFonts && !errorGoogleFonts) {
    return null;
  }

  // stack de navegação
  return (
    <RootBackground>
    <Stack screenOptions={{
      headerShown: false,
      animationTypeForReplace:'push',
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-up"/>
        <Stack.Screen name="home-stage-1" />
        <Stack.Screen name="home-stage-2" />
        <Stack.Screen name="profile" />
    </Stack>
    </RootBackground>
  )
}