import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import { HeaderBackButton, createStackNavigator } from "react-navigation";
import SideBar from "../Components/SideBar";
import aboutStore from "../MobX/AboutStore";
import Wallpaper from "../Components/Wallpaper";
import toggler from "../APIs/toggler";
import { observer } from "mobx-react";
let { width } = Dimensions.get("window");

@observer
class About extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "About",
      headerStyle: { backgroundColor: "#2196f3" },
      headerTintColor: "#000",
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
    };
  };

  state = {
    animation: new Animated.Value(width / 8),
    animation2: new Animated.Value((7 * width) / 8),
    imageStyle: {
      width: (0.85 * width) / 8,
      height: (0.85 * width) / 8,
      resizeMode: "contain",
      margin: "3%"
    }
  };

  componentWillMount() {
    this.props.navigation.addListener("didBlur", () => {
      if (aboutStore.expanded) this.toggle();
    });
  }

  toggle() {
    let initialValue = aboutStore.expanded ? width : width / 8,
      finalValue = aboutStore.expanded ? width / 8 : width;

    let initialValue2 = aboutStore.expanded ? 0 : (7 * width) / 8,
      finalValue2 = aboutStore.expanded ? (7 * width) / 8 : 0;

    aboutStore.expanded = !aboutStore.expanded;
    this.state.animation.setValue(initialValue);
    this.state.animation2.setValue(initialValue2);

    let animate = Animated.parallel([
      Animated.spring(this.state.animation, {
        toValue: finalValue,
        speed: 2
      }),

      Animated.timing(this.state.animation2, {
        toValue: finalValue2,
        duration: 600
      })
    ]);
    if (aboutStore.expanded) {
      this.setState({
        imageStyle: {
          width: 0,
          height: 0
        }
      });
    } else {
      this.setState({
        imageStyle: {
          width: (0.85 * width) / 8,
          height: (0.85 * width) / 8,
          resizeMode: "contain",
          margin: 2
        }
      });
    }
    toggler(aboutStore);
    animate.start();
  }

  navigationToMyProfile() {
    this.props.navigation.navigate("MyProfile");
  }
  navigationToMainPage() {
    this.props.navigation.navigate("MainPage");
  }
  navigationToShop() {
    this.props.navigation.navigate("Shop");
  }
  navigationToContacts() {
    this.props.navigation.navigate("Contacts");
  }
  navigationToSetting() {
    this.props.navigation.navigate("Setting");
  }
  navigationToAbout() {
    this.props.navigation.navigate("About");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <SideBar
            width={this.state.animation}
            toggle={this.toggle.bind(this)}
            imageStyle={this.state.imageStyle}
            textStyle={styles.textStyle}
            store={aboutStore}
            navigationToMyProfile={this.navigationToMyProfile.bind(this)}
            navigationToMainPage={this.navigationToMainPage.bind(this)}
            navigationToContacts={this.navigationToContacts.bind(this)}
            navigationToShop={this.navigationToShop.bind(this)}
            navigationToSetting={this.navigationToSetting.bind(this)}
            navigationToAbout={this.navigationToAbout.bind(this)}
          />
          <Animated.View style={{ width: this.state.animation2 }}>
            <Wallpaper source={require("../RES/background.jpg")} />
            <Text style={styles.welcome}>Welcome to Rich Messenger</Text>
            <Text style={styles.version}>Rich Messenger Version 1.0.0 </Text>
            <Text style={styles.creators}>
              Created By Ali Khalili & Arash Heidary
            </Text>
            <Text style={{ marginBottom: 2, textAlign: "center" }}>
              Website: www.richmessenger.com
            </Text>
            <Text style={{ marginBottom: 30, textAlign: "center" }}>
              E-Mail: info@richmessenger.com
            </Text>
            <Text style={{ textAlign: "center" }}>©2018</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: width / 14.4,
    textAlign: "center",
    marginTop: width / 20,
    marginBottom: width / 30
  },
  version: {
    textAlign: "center",
    marginBottom: width / 2
  },
  creators: {
    textAlign: "center",
    marginBottom: width / 24
  },
  textStyle: {
    fontSize: width / 18,
    fontWeight: "bold",
    marginTop: "3%"
  }
});

export default createStackNavigator({
  About: {
    screen: About
  }
});
