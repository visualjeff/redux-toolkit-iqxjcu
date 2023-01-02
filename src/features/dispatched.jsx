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

function Dispatched() {
  const [trigger, result] = sampleApi.useLazyGetPostsQuery();

  const handleEvent = () => {
    trigger('posts');
  };

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

      <Box flexBasis="100%" flexDirection="column" alignItems="stretch">
        {result &&
          result?.isSuccess &&
          result.data.map((post, idx) => {
            if (idx % 2 === 0) {
              return (
                <Box
                  width={[1]}
                  key={post.id}
                  sx={{
                    textAlign: 'left',
                    border: '1px solid #d9d9d9',
                    color: 'black',
                    backgroundColor: 'white',
                  }}
                >
                  <Post id={post.id} title={post.title} />
                </Box>
              );
            } else {
              return (
                <Box
                  width={[1]}
                  key={post.id}
                  sx={{
                    textAlign: 'left',
                    border: '1px solid #d9d9d9',
                    backgroundColor: 'gray',
                  }}
                >
                  <Post id={post.id} title={post.title} />
                </Box>
              );
            }
          })}
      </Box>
    </Box>
  );
}

export default Dispatched;
