const TestProxy = () => {
  let game = { help: "1" };

  let gameSetting = {
    get: (object: any, property: any) => {
      if (property in object) {
        return "you are inside game setting: " + object[property];
      }
      throw new Error(`Invalid property type: ${property}`);
    },
    set: (object: any, property: any, newValue: any) => {
      if (property in object) {
        object[property] = newValue;
        console.log("value has been set!");
      }
      throw new Error(
        `Unable to set value! Invalid property type: ${property}`
      );
    },
  };

  let gameSettingProxy = new Proxy(game, gameSetting);

  try {
    console.log(gameSettingProxy.help);
    gameSettingProxy.help = "3";
    gameSettingProxy.test = "3";
  } catch (err) {
    console.log(err.message);
  }

  return <div>Test Proxy</div>;
};

export default TestProxy;
