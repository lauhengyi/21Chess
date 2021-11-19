//Returns a list of purchased themes
export default function getPurchasedThemes() {
  const [loading, setLoading] = useState(true);
  //Make saves for var, options, time, and gameDetails
  const [purchasedThemes, setPurchasedThemes] = useState([]);

  useEffect(() => {
    //Get purchased from local storage
    async function getInit() {
      try {
        const jsonValue = await AsyncStorage.getItem("@purchased");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        throw new Error("Unable to get saved");
      }
    }

    if (!loading) {
      getInit().then((initSaved) => {
        setPurchasedThemes(initSaved);
      });
    }
  }, [loading]);

  useEffect(() => {
    async function savePurchased() {
      try {
        const jsonValue = JSON.stringify(saved);
        await AsyncStorage.setItem("@purchased", jsonValue);
      } catch (e) {
        throw new Error("Unable to save saved");
      }
    }
    if (!loading && saved != null) {
      savePurchased();
    }
  }, [purchasedThemes]);

  if (loading) {
    setLoading(false);
  }

  return [purchasedThemes, setPurchasedThemes];
}
