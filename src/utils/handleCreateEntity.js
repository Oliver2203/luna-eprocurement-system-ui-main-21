import axios from '~/api/axios';

const CREATE_ENTITY_URL = '/api/entity/create-entity';

const handleCreateEntity = async (name, code, setError) => {
  try {
    const res = await axios.post(CREATE_ENTITY_URL, JSON.stringify({ name, code }), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    if (res?.status === 200) {
      return true;
    }
  } catch (err) {
    if (!err?.res) {
      setError({
        entity: 'No server response',
        businessNum: 'No server response',
      });
    } else if (err.res?.status === 403) {
      setError({
        entity: 'Invalid Entity Code or Business Registration Number',
        businessNum: 'Invalid Entity Code or Business Registration Number',
      });
    } else {
      setError({
        entity: 'Login failed',
        businessNum: 'Login failed',
      });
    }
  }
};

export default handleCreateEntity;
