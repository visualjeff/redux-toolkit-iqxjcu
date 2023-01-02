import { Box } from '@mui/material';
import { useGetPostsQuery } from '../services/sampleApiSlice';

function ImmediateLoad() {
  const { data, error, isFetching, isLoading } = useGetPostsQuery('posts');

  return (
    <div className="App">
      <Box
        flexBasis="100%"
        flexDirection="column"
        alignItems="stretch"
        sx={{ border: '1px solid #d9d9d9' }}
      >
        {!isLoading &&
          data.map((post, idx) => {
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
                  {post.id} - {post.title}
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
                  {post.id} - {post.title}
                </Box>
              );
            }
          })}
      </Box>
    </div>
  );
}

export default ImmediateLoad;
