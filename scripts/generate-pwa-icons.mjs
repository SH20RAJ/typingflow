import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Base SVG icon - a simple keyboard icon
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
  <path d="M6 8h.01"></path>
  <path d="M10 8h.01"></path>
  <path d="M14 8h.01"></path>
  <path d="M18 8h.01"></path>
  <path d="M8 12h.01"></path>
  <path d="M12 12h.01"></path>
  <path d="M16 12h.01"></path>
  <path d="M7 16h10"></path>
</svg>
`;

// Sizes for the PWA icons
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

// Function to generate a PNG icon of a specific size
async function generateIcon(size, iconsDir) {
  try {
    const svgBuffer = Buffer.from(svgIcon);
    const pngBuffer = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    
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
