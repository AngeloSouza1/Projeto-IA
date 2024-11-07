import express from 'express';

const app = express();
const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => res.send('Server running'));

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
