import React, { useState, useEffect } from 'react'
import { db, auth } from './src/firebase/config';
import RouteInit from './src/routes/RouteInit';
import RoutesTabsBottom from './src/routes/RoutesTabsBottom';

export default function App({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <RouteInit />
    );
  }
  return (
    <RoutesTabsBottom />
  );
}