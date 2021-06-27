import React, { useState } from 'react';
import colors from '../config/colors';
import VarContainer from "./components/VarContainer";
import { View, StyleSheet, Text, ScrollView, Pressable, Images, useWindowDimensions} from 'react-native';
import { TabView, SceneMap, TabBar,} from 'react-native-tab-view';


// Different variation data
const LENTO_VAR = [
  {
    id: 0,
    title: 'Var. 0',
    header: 'Vanilla Chess',
    caption: 'As normal as it gets!',
  },
  
  {
    id: 1,
    title: 'Var. 1',
    header: 'Scrambled Chess',
    caption: 'Mix it up!'
  }
];

const Lento = () => (
  <>
    <ScrollView contentContainerStyle={styles.variationSelectContainer}>
      {LENTO_VAR.map(lento => <VarContainer
        key={lento.id}
        var={lento.id}
        title={lento.title}
        header={lento.header}
        caption={lento.caption}/>)}
    </ScrollView>
  </>
);

const Andante = () => (
 <View>

 </View> 
);

const Allegro = () => (
  <View>
   
 </View> 
);

const Presto = () => (
  <View>
   
  </View> 
);

const renderTabBar = props => (
  <TabBar
    {...props}
    getLabelText={({ route }) => route.title}
    activeColor={colors.black}
    inactiveColor={colors.grey1}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    labelStyle={styles.tabLabel}
    contentContainerStyle={styles.tabItem}
  />
);


function SelectScreen({navigation, route}) {
  
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'lento', title: 'Lento' },
    { key: 'andante', title: 'Andante' },
    { key: 'allegro', title: 'Allegro' },
    { key: 'presto', title: 'Presto' },
  ]);

  const renderScene = SceneMap({
    lento: Lento,
    andante: Andante,
    allegro: Allegro,
    presto: Presto,
  });

  return (
      <>
          <View style={styles.headerContainer}>
              <Text style={styles.header}>
                  Select Variation
              </Text>
          </View>

          <View style={styles.line}/>

          <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={renderTabBar}
          />
      </>
  );
};

const styles = StyleSheet.create({
    variationSelectContainer: {
        alignItems: 'center'
    },
    
    headerContainer: {
        backgroundColor: colors.white,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    header: {
        fontFamily: 'FogtwoNo5',
        fontSize: 40,
        color: colors.black,
        marginTop: 15,
    },

    line: {
        height: 2,
        backgroundColor: colors.black,
    },

    tab: {
        fontFamily: 'FogtwoNo5',
        backgroundColor: colors.white,
    },

    tabBar: {
        backgroundColor: colors.primary,
    },

    tabLabel: {
        fontFamily: 'FogtwoNo5',
        fontSize: 19,
        color: colors.black,
    },

    indicator: {
      backgroundColor: colors.black,
    },
});

export default SelectScreen;