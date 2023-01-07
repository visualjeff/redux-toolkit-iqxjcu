import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { sampleApi } from '../services/sampleApiSlice';
import { Link } from 'react-router-dom';

function Post({ id, title }) {
  return (
    <Link to={`/postDetail/${id}`}>
      {id} - {title}
    </Link>
  );
}

function DynamicListener() {
  const handleEvent = () => {
    trigger('posts');
  };

  useEffect(() => {
    const unsubscribe = dispatch(
      addListener({
        actionCreator: todoAdded,
        effect: (action, listenerApi) => {
          // do some useful logic here
        },
      })
    );
    return unsubscribe;
  }, []);

  return (
    <Box flexBasis="100%" flexDirection="column" alignItems="stretch">
      {result && !result?.isSuccess && (
        <Button
          variant="contained"
          onClick={() => {
            handleEvent();
          }}
        >
          Dispatch
        </Button>
      )}

      <p>Cancel Active Listeners</p>
      <p>Listener makes a service call</p>
      <p>Pause Listeners until action takes place or state changes</p>
      <p>Use the listener API methods to dispatch, get state</p>
      <p>Spawn "child tasks"</p>
    </Box>
  );
}

export default DynamicListener;
