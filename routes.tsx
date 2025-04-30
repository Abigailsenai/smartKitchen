import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons/";
import {Film} from './film';
import {Liv} from './liv';
import {Msc} from './msc';
import {Rec} from './rec';
const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator
              screenOptions={{
                tabBarActiveBackgroundColor: "#91bcff",
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    right: 30,
                    left: 30,
                    borderRadius: 5,
                    backgroundColor: "#0e72ff",
                },

            }}>
                <Tab.Screen
                name="rec"
                component={Rec}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={30} color={"#fff"} style={{
                                marginTop: 40,
                                height: 30,
                              }} name="fast-food-outline" />)
                        }
                        return (<Ionicons size={30} color={"#000"} style={{
                            marginTop: 40,
                            height: 30,
                          }} name="fast-food-outline" />)
                    }
                }}
            />
           <Tab.Screen
                name="film"
                component={Film}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={30} color={"#fff"} style={{
                                marginTop: 40,
                                height: 30,
                              }} name="film-outline" />)
                        }
                        return (<Ionicons size={30} color={"#000"} style={{
                            marginTop: 40,
                            height: 30,
                          }} name="film-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="liv"
                component={Liv}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={30} color={"#fff"} style={{
                                marginTop: 40,
                                height: 30,
                              }} name="book-outline" />)
                        }
                        return (<Ionicons size={30} color={"#000"} style={{
                            marginTop: 40,
                            height: 30,
                          }} name="book-outline" />)
                    }
                }}
            />
                <Tab.Screen
                name="msc"
                component={Msc}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={30} color={"#fff"} style={{
                                marginTop: 40,
                                height: 30,
                              }} name="musical-notes-outline" />)
                        }
                        return (<Ionicons size={30} color={"#000"} style={{
                            marginTop: 40,
                            height: 30,
                          }} name="musical-notes-outline" />)
                    }
                }}
            />
        </Tab.Navigator>
    )
}