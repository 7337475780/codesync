import fs from 'fs';
import path from 'path';

const REPLACEMENTS = {
  // Colors
  'bg-\\[#0a0a0a\\]': 'bg-surface',
  'bg-\\[#141414\\]': 'bg-surface-elevated',
  'bg-\\[#1a1a1a\\]': 'bg-surface-elevated',
  'bg-\\[#000\\]': 'bg-background',
  'bg-\\[#030303\\]': 'bg-background',
  'text-gray-400': 'text-text-secondary',
  'text-gray-300': 'text-text-primary',
  'text-gray-500': 'text-text-muted',
  'text-gray-600': 'text-text-muted',
  'bg-\\[#8b5cf6\\]': 'bg-primary',
  'text-\\[#8b5cf6\\]': 'text-primary',
  'border-\\[#8b5cf6\\]': 'border-primary',
  
  // Tailwind v4 doesn't support nested arbitrary opacity like /10 directly if the base class is custom without definition, 
  // but if it's mapped in theme as a color it does. 
  // We'll replace hardcoded variants with surface classes or custom tailwind mapped colors.
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  for (const [key, value] of Object.entries(REPLACEMENTS)) {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

const dirs = [
  'c:\\Users\\tharu\\codesync\\apps\\web\\src\\app\\dashboard\\projects\\[projectId]\\workspace',
  'c:\\Users\\tharu\\codesync\\apps\\web\\src\\components\\workspace'
];

dirs.forEach(d => {
  if (fs.existsSync(d)) {
    processDirectory(d);
  } else {
    console.log("Directory not found:", d);
  }
});

console.log("Done");
