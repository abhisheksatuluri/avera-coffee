import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyAKdHBk-Ci6fXVS8HrXLzd66ABcfTZqEvU';
const MODEL = 'gemini-3.1-flash-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const MAX_RETRIES = 3;
const RETRY_DELAY = 10000;
const BETWEEN_DELAY = 5000;

const STYLE_PREFIX = `Ultra-premium, dark cinematic product photography style. Moody lighting with deep shadows.
Color palette: near-black backgrounds (#0B0B0D), warm gold accents (#D6A84F), rich espresso browns (#1C1410), cream highlights (#F4EDE3).
Shot on medium format camera. Shallow depth of field. Editorial luxury aesthetic. No text, no logos, no watermarks.`;

const images = [
  {
    filename: 'Arabica Washed.webp',
    prompt: `${STYLE_PREFIX} A premium specialty coffee bag, matte black packaging with minimal gold foil accents, labeled "Arabica Washed". The bag sits on a dark slate surface with a few scattered whole coffee beans around it. Soft directional warm light from the left creates dramatic shadows. Clean, crystalline aesthetic suggesting purity and precision. The beans visible are light-medium brown, perfectly uniform. A small ceramic cup of clear, bright coffee sits beside the bag, catching golden light. Hyper-realistic product photography.`
  },
  {
    filename: 'Arabica Natural.webp',
    prompt: `${STYLE_PREFIX} A premium specialty coffee bag, deep burgundy and black matte packaging with gold details, "Arabica Natural" style. Surrounded by dried coffee cherries and a scattering of dark roasted beans on weathered dark wood. Warm amber backlighting creates a halo effect. Wild berries (blueberries, dark cherries) artfully placed nearby to suggest tasting notes. Rich, indulgent, sensual mood. The scene feels abundant and decadent. Hyper-realistic product photography.`
  },
  {
    filename: 'Fine Robusta.webp',
    prompt: `${STYLE_PREFIX} A bold, commanding specialty coffee bag in stark matte black packaging with copper/bronze accents, "Fine Robusta" style. The bag stands alone on a dark concrete surface. Extremely dark, almost noir lighting with a single dramatic spotlight. Dark cocoa powder dusted on the surface. A few walnuts cracked open nearby. Dense crema visible in a dark espresso cup beside it. The entire scene radiates power, intensity, and uncompromising quality. Hyper-realistic product photography.`
  },
  {
    filename: 'Red Honey Sun-Dried.webp',
    prompt: `${STYLE_PREFIX} A premium specialty coffee bag with warm terracotta and black matte packaging, gold lettering, "Red Honey" style. Set against a dark background with warm golden hour light streaming in from one side. A small dish of raw honeycomb sits nearby. Dried peach slices artfully placed. Coffee beans with a reddish-brown hue scattered on a dark surface. The overall mood is warm, sweet, and inviting — evoking sunshine and patience. Raised bamboo drying beds visible as a subtle background element. Hyper-realistic product photography.`
  },
  {
    filename: 'Black Honey Sun-Dried.webp',
    prompt: `${STYLE_PREFIX} A premium specialty coffee bag in deep black and dark plum matte packaging with subtle gold accents, "Black Honey" style. The darkest, most dramatic lighting of all — almost entirely shadow with razor-thin gold light edges. Dark figs cut in half, toffee pieces, and dark plums arranged around the bag on black marble. Coffee beans appear almost black with a slight sheen. The scene feels rare, exclusive, and intensely luxurious — like something found in a private collection. Hyper-realistic product photography.`
  },
  {
    filename: 'Fermented Whiskey.webp',
    prompt: `${STYLE_PREFIX} The most premium and experimental specialty coffee bag — distressed leather-textured black packaging with aged gold embossing, "Fermented Whiskey" style. Set on dark oak wood surface. A small whiskey glass with amber liquid sits beside it, catching warm light. Vanilla pods and burnt caramel pieces artfully placed. Wisps of smoke or steam create atmosphere. The entire scene evokes a private whiskey bar — exclusive, mysterious, addictive. Oak barrel stave visible in the background, out of focus. This is the rarest offering. Hyper-realistic product photography.`
  },
  {
    filename: 'Coffee Beans Texture Background.webp',
    prompt: `${STYLE_PREFIX} Overhead flat-lay of thousands of dark roasted coffee beans filling the entire frame edge to edge. Very dark, moody — the beans are deep brown to almost black. Subtle warm gold light catching the oily sheen on some beans. No other objects, pure texture. This will be used as a website background at low opacity. The pattern should be dense and uniform but with natural variation. Shot from directly above. 4K resolution texture photography.`
  },
  {
    filename: 'Floating Coffee Particles in Smoke.webp',
    prompt: `${STYLE_PREFIX} Abstract macro photography of fine coffee grounds and particles suspended in wisps of smoke against a pure black background. The particles catch golden light, creating tiny points of warm illumination floating in darkness. Ethereal, dreamlike quality. Very sparse — mostly black space with occasional illuminated coffee dust particles. This will overlay on a dark website at very low opacity to add subtle texture. Minimal, abstract, atmospheric.`
  },
  {
    filename: 'Roasting Fire Ritual.webp',
    prompt: `${STYLE_PREFIX} Close-up of coffee beans tumbling inside a professional drum roaster, shot through the viewing window. Beans are mid-roast, transitioning from green to caramel brown. Orange-amber glow from the heat source creates dramatic warm lighting from below. Chaff floating in the air catches the light. The metal drum has a beautiful industrial patina. The scene captures the precise moment of transformation — raw becoming refined. Cinematic, warm, mesmerizing.`
  },
  {
    filename: 'URBAN ACHIEVER LIFESTYLE.webp',
    prompt: `${STYLE_PREFIX} A silhouetted figure of a stylish professional standing by a floor-to-ceiling window in a modern high-rise apartment at dawn. Holding a ceramic coffee cup. City skyline visible through the window, bathed in golden early morning light. The interior is dark and minimal. The person is confident, composed, successful — this is their ritual moment before conquering the day. The coffee is a deliberate, sophisticated choice. Aspirational but authentic. Warm cinematic tones.`
  },
  {
    filename: 'Early Morning Window Ritual.webp',
    prompt: `${STYLE_PREFIX} A beautifully composed still life of a morning coffee ritual on a dark wooden table near a window. Soft, diffused golden morning light streams through sheer curtains. A ceramic pour-over dripper sits on a server, mid-brew. Steam rises from a freshly poured cup. A folded newspaper or leather journal sits nearby. The scene is peaceful, intentional, meditative — this is the sacred morning moment. Warm tones, soft shadows, intimate scale.`
  },
  {
    filename: 'Farmer Silhouette.webp',
    prompt: `${STYLE_PREFIX} Dramatic silhouette of an Indian coffee farmer standing among coffee plants on a hillside at sunrise. The Western Ghats mountain range visible in the misty background. Golden dawn light creates a powerful rim-light effect around the farmer's figure. The farmer holds coffee branches heavy with ripe red cherries. Mist rolls through the valley below. This is the origin — the land, the hands, the dawn. Powerful, reverent, grounding.`
  },
  {
    filename: 'Hand Holding Coffee Cherries.webp',
    prompt: `${STYLE_PREFIX} Close-up macro shot of weathered, experienced hands cupping freshly picked ripe red coffee cherries. The hands belong to an Indian estate farmer. Rich, warm directional lighting highlights the texture of both skin and cherries. Dark, out-of-focus coffee plantation in the background. A few green leaves frame the composition. The image speaks of direct connection between source and cup — craft, care, human touch. Intimate, tactile, emotional.`
  },
  {
    filename: 'ORIGIN & CRAFT.webp',
    prompt: `${STYLE_PREFIX} A moody, atmospheric shot of a professional coffee cupping session in progress. Multiple small ceramic bowls of freshly ground coffee arranged in a precise row on a dark wooden counter. Silver cupping spoons. Steam rising from the bowls. A pair of hands carefully evaluating one bowl. The setting is a dimly lit roastery — industrial but refined. Quality control as art form. The image conveys expertise, precision, and uncompromising standards.`
  },
  {
    filename: 'GRID CONSISTENCY SHOT.webp',
    prompt: `${STYLE_PREFIX} Perfectly arranged overhead shot of coffee brewing equipment on a dark slate surface. A Chemex pour-over, a dark ceramic cup of black coffee, a small pile of whole beans, and a wooden scoop — all arranged in a precise grid layout with generous spacing. Minimal, geometric, satisfying. Warm side lighting creates subtle shadows. The arrangement feels intentional, designed, luxurious. Clean product photography with editorial restraint.`
  }
];

async function generateImageWithRetry(imageConfig, index, total) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`\n[${index + 1}/${total}] Generating: ${imageConfig.filename} (attempt ${attempt}/${MAX_RETRIES})`);

    const body = {
      contents: [{ parts: [{ text: imageConfig.prompt }] }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.status === 503 || response.status === 429) {
        console.log(`  Rate limited (${response.status}). Waiting ${RETRY_DELAY/1000}s before retry...`);
        await new Promise(r => setTimeout(r, RETRY_DELAY));
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`  ERROR (${response.status}): ${errorText.substring(0, 300)}`);
        if (attempt < MAX_RETRIES) {
          await new Promise(r => setTimeout(r, RETRY_DELAY));
        }
        continue;
      }

      const data = await response.json();
      const parts = data.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData) {
          const { mimeType, data: b64data } = part.inlineData;
          const buffer = Buffer.from(b64data, 'base64');
          const outPath = path.join('public', imageConfig.filename);
          fs.writeFileSync(outPath, buffer);
          console.log(`  SUCCESS: ${outPath} (${(buffer.length / 1024).toFixed(0)} KB, ${mimeType})`);
          return true;
        }
      }

      console.error(`  No image data in response. Retrying...`);
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, RETRY_DELAY));
      }
    } catch (error) {
      console.error(`  Network error: ${error.message}`);
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, RETRY_DELAY));
      }
    }
  }
  return false;
}

async function main() {
  const onlyMissing = process.argv.includes('--missing');

  let toGenerate = images;
  if (onlyMissing) {
    toGenerate = images.filter(img => !fs.existsSync(path.join('public', img.filename)));
    console.log(`Generating ${toGenerate.length} missing images (skipping ${images.length - toGenerate.length} existing)\n`);
  } else {
    console.log(`Generating all ${toGenerate.length} images\n`);
  }

  const results = { success: 0, failed: 0, failures: [] };

  for (let i = 0; i < toGenerate.length; i++) {
    const success = await generateImageWithRetry(toGenerate[i], i, toGenerate.length);
    if (success) {
      results.success++;
    } else {
      results.failed++;
      results.failures.push(toGenerate[i].filename);
    }
    if (i < toGenerate.length - 1) {
      console.log(`  Waiting ${BETWEEN_DELAY/1000}s between requests...`);
      await new Promise(r => setTimeout(r, BETWEEN_DELAY));
    }
  }

  console.log('\n=== COMPLETE ===');
  console.log(`Success: ${results.success}/${toGenerate.length}`);
  if (results.failures.length > 0) {
    console.log(`Failed: ${results.failures.join(', ')}`);
  }
}

main();
