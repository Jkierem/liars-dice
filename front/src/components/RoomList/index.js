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
    cond, allPass, compose, flatten, map, addIndex, dropLast
} from 'ramda';

const useStyle = makeStyles({
  roomsContainer: {
      overflowY: "scroll",
      marginBottom: "16px"
  },
  roomItem: {
    marginTop: "8px",
    marginBottom: "8px"
  }
})

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
  const { roomItem } = useStyle()
  const { id, name, capacity, playerCount, onClick } = props;
  return <ListItem key={id} className={roomItem}>
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

const props = (...atts) => obj => atts.map(prop(__,obj));
const sortRooms = sortWith([
    ascend(prop("name")),
    ascend(x => converge(divide,props("playerCount","capacity")(x)))
])
const mapIndexed = addIndex(map);
const joinRooms = compose(
  dropLast(1),
  flatten,
  mapIndexed((c,index) => [c, <Divider key={`divider-${index}`} />])
)

const RoomList = (props) => {
    const css = useStyle()

    const { rooms, onSelect=identity } = props;
    const handleRoomSelect = (data) => () => {
        onSelect(data)
    } 
    return <Container className={css.roomsContainer}>
        <List>
            {rooms.length ? joinRooms(sortRooms(rooms).map((info,index) => {
                return <RoomLine 
                    {...info}
                    key={index}
                    onClick={handleRoomSelect(info)}
                />
            })) : <NoRooms />}
        </List>
    </Container>
}

export default RoomList