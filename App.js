import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RaiseComplaintScreen from './src/screens/RaiseComplaintScreen';
import ComplaintsListScreen from './src/screens/ComplaintsListScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import {
    DepartmentScreen,
    ProgrammeScreen,
    BlockScreen,
    RoomScreen,
    RoleScreen,
    UserScreen,
} from './src/screens/master/MasterScreens';

import { colors } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
    Dashboard: { active: 'grid', inactive: 'grid-outline' },
    Tickets: { active: 'ticket', inactive: 'ticket-outline' },
    RaiseComplaint: { active: 'add-circle', inactive: 'add-circle-outline' },
    Reports: { active: 'bar-chart', inactive: 'bar-chart-outline' },
    Notifications: { active: 'notifications', inactive: 'notifications-outline' },
};

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.bgCard,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    paddingBottom: 6,
                    paddingTop: 6,
                    height: 64,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textDim,
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
                tabBarIcon: ({ focused, color, size }) => {
                    const icons = TAB_ICONS[route.name];
                    const name = focused ? icons?.active : icons?.inactive;
                    return <Ionicons name={name || 'ellipse-outline'} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Tickets" component={ComplaintsListScreen} options={{ title: 'Tickets' }} />
            <Tab.Screen name="RaiseComplaint" component={RaiseComplaintScreen} options={{ title: 'New Ticket' }} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: colors.bgCard },
                    headerTintColor: colors.text,
                    headerTitleStyle: { fontWeight: '700' },
                    contentStyle: { backgroundColor: colors.bg },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

                {/* Master Screens (accessible via navigation.navigate) */}
                <Stack.Screen name="Departments" component={DepartmentScreen} />
                <Stack.Screen name="Programmes" component={ProgrammeScreen} />
                <Stack.Screen name="Blocks" component={BlockScreen} />
                <Stack.Screen name="Rooms" component={RoomScreen} />
                <Stack.Screen name="Roles" component={RoleScreen} />
                <Stack.Screen name="Users" component={UserScreen} />

                {/* Standalone screens reachable from Dashboard */}
                <Stack.Screen name="ComplaintsList" component={ComplaintsListScreen} options={{ title: 'All Tickets' }} />
                <Stack.Screen name="RaiseComplaint" component={RaiseComplaintScreen} options={{ title: 'Raise Ticket' }} />
                <Stack.Screen name="Reports" component={ReportsScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
