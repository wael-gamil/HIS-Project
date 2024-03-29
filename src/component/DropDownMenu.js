import { NavLink } from 'react-router-dom';
import classes from './DropDownMenu.module.css';
import { useState } from 'react';
function DropDownMenu(props) {
  const [scrollReachedEnd, setScrollReachedEnd] = useState(false);
  return (
    <div
      className={`${classes.DropDownMenu} ${
        props.scrollable && classes.scrollable
      }`}
      onScroll={event => {
        const container = event.target;
        if (
          Math.abs(
            container.scrollTop +
              container.clientHeight -
              container.scrollHeight
          ) === 1
        ) {
          // Scroll has reached the end
          props.pagescroll();
        }
      }}
    >
      {props.searchstate && (
        <div className={classes.search}>
          <input
            type='text'
            id='search'
            placeholder='Search'
            onChange={e => {
              if (props.searchstate) {
                setTimeout(() => {
                  props.searchstate(e.target.value);
                }, 1000);
              }
            }}
          />
        </div>
      )}
      {props.content.map(p => (
        <>
          {props.type === 'link' ? (
            <NavLink
              to={!p.func && p.path}
              className={({ isActive }) =>
                `${classes.link} ${
                  isActive && p.activeEffect ? classes.active : ''
                }`
              }
              onClick={p.func}
            >
              <h2>{p.icon}</h2>
              <h2>{p.body}</h2>
            </NavLink>
          ) : props.type === 'text' ? (
            <>
              <div
                onClick={() => {
                  props.selectstate(p.id);
                  props.setSelectedStep(props.currentStep + 1);
                }}
                className={`${classes.card} ${classes.hoverEffect}`}
              >
                {p.body}
              </div>
            </>
          ) : (
            props.type === 'card' && (
              <>
                <div
                  onClick={() => {
                    if (props.multiple) {
                      // if multiple selection is allowed
                      props.selectstate(prevState => {
                        if (prevState.includes(p.id)) {
                          // if the ID already exists in the array, remove it
                          return prevState.filter(id => id !== p.id);
                        } else {
                          // if the ID doesn't exist in the array, add it
                          return [...prevState, p.id];
                        }
                      });
                    } else {
                      // if only single selection is allowed
                      props.selectstate(p.id);
                      props.clickFunction &&
                        props.clickFunction(p.id, p.card.name);
                    }
                    p.day && props.selectedDay(p.body);
                    props.currentStep &&
                      props.setSelectedStep(props.currentStep + 1);
                  }}
                  className={`${classes.cardContainer} `}
                >
                  <div
                    className={`${classes.card} ${classes.hoverEffect} ${
                      Array.isArray(props.selected)
                        ? props.selected.includes(p.id) && classes.selected
                        : props.selected === p.id && classes.selected
                    }`}
                  >
                    {Object.keys(p.card).map(key => {
                      return <>{p.card[key]}</>;
                    })}
                  </div>
                </div>
              </>
            )
          )}
        </>
      ))}
    </div>
  );
}
export default DropDownMenu;
