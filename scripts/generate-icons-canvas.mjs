import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { createCanvas } from 'canvas';

// Base SVG icon - a simple keyboard icon converted to canvas drawing commands
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Function to create the icons directory if it doesn't exist
async function createIconsDirectory() {
  const iconsDir = path.join(process.cwd(), 'public', 'icons');
  try {
    await mkdir(iconsDir, { recursive: true });
    console.log('Icons directory created or already exists.');
    return iconsDir;
  } catch (err) {
    console.error('Error creating icons directory:', err);
    throw err;
  }
}

// Function to draw the keyboard icon on canvas
function drawKeyboardIcon(ctx, size) {
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = size * 0.083; // Equivalent to stroke-width="2" in the original 24x24 viewBox

  // Draw keyboard outline (rectangle with rounded corners)
  const padding = size * 0.083;
  ctx.beginPath();
  const rectWidth = size - 2 * padding;
  const rectHeight = (rectWidth * 0.75); // Keep the 4:3 ratio
  const radius = size * 0.083; // Rounded corners
  
  ctx.moveTo(padding + radius, padding);
  ctx.lineTo(padding + rectWidth - radius, padding);
  ctx.arcTo(padding + rectWidth, padding, padding + rectWidth, padding + radius, radius);
  ctx.lineTo(padding + rectWidth, padding + rectHeight - radius);
  ctx.arcTo(padding + rectWidth, padding + rectHeight, padding + rectWidth - radius, padding + rectHeight, radius);
  ctx.lineTo(padding + radius, padding + rectHeight);
  ctx.arcTo(padding, padding + rectHeight, padding, padding + rectHeight - radius, radius);
  ctx.lineTo(padding, padding + radius);
  ctx.arcTo(padding, padding, padding + radius, padding, radius);
  ctx.closePath();
  ctx.stroke();

  // Draw keyboard keys (simplified)
  const keySize = size * 0.04;
  const startY = size * 0.33;
  const keySpacing = size * 0.17;

  // Top row keys
  for (let i = 0; i < 4; i++) {
    const x = padding + keySpacing + (i * keySpacing);
    ctx.beginPath();
    ctx.arc(x, startY, keySize, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Middle row keys
  for (let i = 0; i < 3; i++) {
    const x = padding + keySpacing * 1.5 + (i * keySpacing);
    ctx.beginPath();
    ctx.arc(x, startY + keySpacing, keySize, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Space bar
  const spaceBarY = startY + (keySpacing * 2);
  const spaceBarWidth = size * 0.42;
  ctx.beginPath();
  ctx.moveTo(size * 0.29, spaceBarY);
  ctx.lineTo(size * 0.71, spaceBarY);
  ctx.stroke();
}

// Function to generate a PNG icon of a specific size
async function generateIcon(size, iconsDir) {
  try {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw the keyboard icon
    drawKeyboardIcon(ctx, size);

    const pngBuffer = canvas.toBuffer('image/png');
    const iconPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    await writeFile(iconPath, pngBuffer);
    console.log(`Generated icon of size ${size}x${size}`);
  } catch (err) {
    console.error(`Error generating icon of size ${size}x${size}:`, err);
  }
}

// Main function to generate all icons
async function generateIcons() {
  try {
    const iconsDir = await createIconsDirectory();
    
    // Generate all icon sizes in parallel
    await Promise.all(sizes.map(size => generateIcon(size, iconsDir)));
    
    console.log('All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

// Run the script
generateIcons();
