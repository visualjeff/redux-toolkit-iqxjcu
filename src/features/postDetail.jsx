import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import {
  sampleApi,
  useGetPostQuery,
  useGetUserPostQuery,
} from '../services/sampleApiSlice';

const Flex = styled(Box)`
  display: flex;
  gap: 10px;
`;

function PostDetail() {
  const { id } = useParams();
  // Fetch only the post
  // const { data, error, isLoading } = useGetPostQuery(id);

  // Fetch post and user.  The returned data is merged in the hook. Post includes name.
  const { data, error, isLoading } = useGetUserPostQuery(id);

  return (
    <>
      {data && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
          }}
        >
          <Flex sx={{ m: '10px' }}>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 2,
              }}
            >
              <TextField
                id="name"
                label="name"
                variant="outlined"
                value={data?.name}
                sx={{
                  width: '100%',
                }}
              />
            </Box>
          </Flex>
          <Flex sx={{ m: '10px' }}>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 2,
              }}
            >
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={data?.title}
                style={{ width: '100%' }}
              />
            </Box>
          </Flex>
          <Flex sx={{ m: '10px' }}>
            <Box
              sx={{
                display: 'flex',
                flexGrow: 2,
              }}
            >
              <TextField
                id="body"
                label="body"
                variant="outlined"
                value={data?.body}
                style={{ width: '100%' }}
              />
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default PostDetail;
