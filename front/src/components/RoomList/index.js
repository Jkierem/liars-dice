import React from 'react'
import { ArrowForward } from '@material-ui/icons'
import { 
    ListItem, ListItemText, ListItemSecondaryAction,
    IconButton, ListItemIcon, List, makeStyles,
    Container, Divider
} from '@material-ui/core';
import { 
    __, lte, always, gt, sortWith, ascend, 
    prop, divide, converge, identity,
    cond, allPass, intersperse
} from 'ramda';

const between = (min,max) => val => allPass([ lte(min), gt(max) ])(val)
const getColor = (count,capacity) => {
  const percentage = (count*100)/capacity;
  return cond([
    [lte(70), always("red")],
    [between(45,70), always("orange")],
    [gt(45), always("green")],
  ])(percentage)
}

const RoomLine = (props) => {
  const { name, capacity, playerCount, onClick } = props;
  return <ListItem>
    <ListItemIcon>
      <div style={{ 
        userSelect: "none",
        fontWeight: "bold",
        color: getColor(playerCount,capacity)
      }}>
        {playerCount}/{capacity}
      </div>
    </ListItemIcon>
    <ListItemText fontSize="huge">
      {name}
    </ListItemText>
    <ListItemSecondaryAction>
      <IconButton color="secondary" onClick={onClick}>
        <ArrowForward/>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

const NoRooms = () => {
    return <ListItem>
        <ListItemText>
            Sorry. No rooms available at the moment.
        </ListItemText>
    </ListItem>
}

const useStyle = makeStyles({
    roomsContainer: {
        height: "60%",
        overflowY: "scroll",
    },
})

const props = (...atts) => obj => atts.map(prop(__,obj));
const sortRooms = sortWith([
    ascend(prop("name")),
    ascend(x => converge(divide,props("playerCount","capacity")(x)))
])

const RoomList = (props) => {
    const css = useStyle()

    const { rooms, onSelect=identity } = props;
    const handleRoomSelect = (data) => () => {
        onSelect(data)
    } 
    return <Container className={css.roomsContainer}>
        <List>
            {rooms.length ? intersperse(<Divider /> ,sortRooms(rooms).map((info,index) => {
                return <RoomLine 
                    key={index}
                    {...info}
                    onClick={handleRoomSelect(info)}
                />
            })) : <NoRooms />}
        </List>
    </Container>
}

export default RoomList