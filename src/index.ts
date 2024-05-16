import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// Configure your Supabase client
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

// Configure Multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// Endpoint to handle file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    // Assuming file upload is successful and file is available in req.file
    console.log('File uploaded successfully:', req.file);
    res.send('File uploaded successfully');
  } else {
    // If the file is too large or another error occurred
    res.status(400).send('File is too large or not provided');
  }
});

// Endpoint to say hello
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Fetch data with pagination and search
app.get('/data', async (req, res) => {
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

// Add data
app.post('/data', async (req, res) => {
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

// Update data
app.put('/data/:id', async (req, res) => {
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

// Delete data
app.delete('/data/:id', async (req, res) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
