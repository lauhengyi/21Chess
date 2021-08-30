function loadSaved(navigation, saved, settings) {
  //navigate to VarLoad
  navigation.navigate("VarLoad", {
    screen: String(saved.varNum),
    varNum: saved.varNum,
    params: {
      settings: settings,
      options: saved.options,
      saved: saved,
    },
  });
}

export default loadSaved;
