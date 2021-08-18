
/* 

const events = [
  {
    title: 'Meeting',
    start: new Date(),
    end: new Date(),
  },
  {
    title: 'Coffee break',
    start: new Date(),
    end: new Date(),
  },
]
console.log("$$$$$$$$$$$$$$$$$$$$$$$",events);


const eventTabs = () => {
  return <Calendar events={events} height={600} />
}

export default eventTabs

const styles = StyleSheet.create({})
 


*/

import React,{useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { StyleSheet,Pressable, Text,Button , View,Modal, ScrollView } from 'react-native'
export default class DemoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      events: []

    }
  }
  componentDidMount() {
    fetch('https://api-truggle-schedule.herokuapp.com/schedule/v1/courses')
      .then(response => response.json())
      .then(json => {
        var events = [];
        var courses = json["courses"];
        courses.forEach(course => {
          events.push({
            title: course.subject,
            allDay: false,
            start: renderDateTime(course.date, course.start_hour),
            end: renderDateTime(course.date, course.end_hour),
            classroom: "Mr " + course.teacher.teacher.lastname,
            color: getRandomColor(),
          });
        });
        //console.log("fffffffffffffffffffffffffff", events);
        this.setState({
          events: events
      })
      } 
      )

  }

  render() {
    
    return (
      <ScrollView>
        <FullCalendar
          defaultView="dayGridMonth"
          dateClick={this.handleDateClick}
          select={this.handleSelectClick}
          selectable='true' plugins={[dayGridPlugin, interactionPlugin]}
           events={
             this.state.events
          } />
           
      </ScrollView>
    )



  }
  handleDateClick = (arg) => { 
    alert(arg.dateStr)
  }

}





function renderDateTime(date, time) {
  let newDate = date.split("-");
  let year = parseInt(newDate[0]);
  let mounth = parseInt(newDate[1]) - 1;
  let day = parseInt(newDate[2]);
  let displayDate = new Date(year, mounth, day, parseInt(time.split(":")[0]), parseInt(time.split(":")[1]), 0);
  return displayDate;
}


 
/* 
const styles = StyleSheet.create({}) 
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
  return defaultCalendars[0].source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}
 */




const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
     
     },  
     text: {  
        color: '#3f2949',  
        marginTop: 10  
     }  
});
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}