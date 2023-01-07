import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../redux/counterSlice';
import { addListener, removeListener } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { store } from '../redux/store';

function DynamicListener() {
  const count = useSelector((state) => state.CounterReducer.value);
  const dispatch = useDispatch();

  const [message, setMessage] = useState();

  useEffect(() => {
    // Not recommended but does work
    const unsubscribe = store.dispatch(
      addListener({
        actionCreator: increment,
        effect: (action, listenerApi) => {
          setMessage(`${action.type} fired`);
        },
      })
    );
    return unsubscribe;
  }, []);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => {
            setMessage('');
            dispatch(decrement());
          }}
        >
          Decrement
        </button>
      </div>
      {message}
    </div>
  );
}

export default DynamicListener;
