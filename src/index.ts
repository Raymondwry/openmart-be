import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import express from 'express';
const cors = require('cors');

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

const app: express.Application = express();
const PORT: number | string = process.env.PORT || 3001;
app.use(cors());
app.use(express.json()); 


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});


app.get('/data', async (req: express.Request, res: express.Response) => {
  const { page = 1, pageSize = 10, search = '' } = req.query;

  const { data, error, count } = await supabase
    .from('openmart_be')
    .select('*', { count: 'exact' })
    .ilike('name', `%${search}%`)
    .range((page as number - 1) * (pageSize as number), page as number * (pageSize as number) - 1);
  
  if (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching data');
  } else {
    res.json({ data, total: count });
  }
});


app.post('/data', async (req: express.Request, res: express.Response) => {
  const { data, error } = await supabase
    .from('openmart_be')
    .insert(req.body);
  
  if (error) {
    console.error('Error:', error);
    res.status(500).send('Error adding data');
  } else {
    res.json(data);
  }
});


app.put('/data/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('openmart_be')
    .update(req.body)
    .eq('id', id);
  
  if (error) {
    console.error('Error:', error);
    res.status(500).send('Error updating data');
  } else {
    res.json(data);
  }
});


app.delete('/data/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('openmart_be')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error:', error);
    res.status(500).send('Error deleting data');
  } else {
    res.json(data);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
