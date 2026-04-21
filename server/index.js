import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { HfInference } from '@huggingface/inference';

const app = express();
const PORT = 3005;

const hf = new HfInference(process.env.HF_TOKEN);

console.log("DEBUG: Token detected. System ready.");

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'online' }));

app.post('/api/upscale', async (req, res) => {
  console.log(`\n🚀 [${new Date().toLocaleTimeString()}] AuraVision: Generating...`);
  try {
    const { description } = req.body;

    // textToImage is currently the only 100% stable task on HF Free API
    const response = await hf.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: `${description || "professional photography"}, ultra-realistic, 8k, sharp focus, cinematic lighting, masterpiece`,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Output = buffer.toString('base64');

    console.log("✅ SUCCESS: AuraVision Generation Complete!");
    return res.json({ success: true, output: `data:image/png;base64,${base64Output}` });

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ error: "Service busy. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log('══════════════════════════════════════');
  console.log(`🟢 AURAVISION SERVER: http://localhost:${PORT}`);
  console.log('══════════════════════════════════════');
});