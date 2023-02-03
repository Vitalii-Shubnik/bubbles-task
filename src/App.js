import { useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';
const bubbles = [
  {
    root: true,
    id: 1,
    name: "Keimo: Factory of factories - Humane productivity software",
    bubbles: [2, 3],
  }, {
    id: 2,
    name: "First factory: current product",
    bubbles: [4, 5],
  }, {
    id: 3,
    name: "Second factory, new product line",
    bubbles: [11, 12],
  }, {
    id: 4,
    name: "Strategic mission: Make the current business cash flow positive",
    bubbles: [6, 7],
  }, {
    id: 5,
    name: "Next: Expand business (geo x product segment matrix)",
    bubbles: [],
  }, {
    id: 6,
    name: "Generate 6000€ new MRR monthly",
    bubbles: [8, 9, 10],
  }, {
    id: 7,
    name: "Get to positive net revenue retention (12 mos. trailing avg.)",
    bubbles: [11, 12],
  }, {
    id: 8,
    name: "Systematically search for an efficient way of generating demos",
    bubbles: [],
  }, {
    id: 9,
    name: "Create a system for improving sales funnel throughput",
    bubbles: [],
  }, {
    id: 10,
    name: "Increase new customer ARPA",
    bubbles: [],
  }, {
    id: 11,
    name: "Create a system for managing customer life-cycle",
    bubbles: [],
  }, {
    id: 12,
    name: "Create upsales potential",
    bubbles: [],
  },
];


function ListItem({ item, parrentId }) {
  const [showChildren, setShowChildren] = useState(false);
  let children = null;
  if (item?.bubbles?.length && showChildren) {
    children = (
      <div className="bubbles">
        {item.bubbles.map(i => {
          const populatedItem = bubbles.find(b => b.id === i);
          return <ListItem item={populatedItem} key={populatedItem.id + Math.random() * 21300} />;
        })}
      </div>
    );
  }

  function toggleShowChildren(e) {
    e.stopPropagation()
    setShowChildren(!showChildren);
  }

  function createNewBubble(e, id) {
    e.stopPropagation();
    const newId = Math.random() * 100000
    bubbles.push({
      id: newId,
      name: "New bubble",
      bubbles: [],
    },)
    bubbles.find(bubble => bubble.id === id).bubbles.push(newId)
  }

  function copyPasteBubble(e) {
    e.stopPropagation();
    bubbles.find(b=>b.root).bubbles.push(item.id)
  }
  
  return (
    <Draggable onMouseDown={e => e.stopPropagation()}>
      <div className="bubble">
        <div className='child-bubble' onClick={toggleShowChildren}
          onWheel={(e) => createNewBubble(e, item.id)}
          onDoubleClick={(e) => copyPasteBubble(e)}

        >

          <h3>{item.name}</h3>
          {children}
          <button className='copy-paste' onClick={copyPasteBubble}>Copy</button>
        </div>
      </div>
    </Draggable>
  );
}

function App() {
  return (
    <div className="bubbles" >
      {bubbles.filter(b => b.root).map(i => (
        <ListItem item={i} key={i.id} />
      ))}
    </div>
  );
}

export default App;
