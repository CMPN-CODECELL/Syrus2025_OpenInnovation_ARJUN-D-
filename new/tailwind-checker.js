// This is a simple script to check Tailwind CSS configuration
const tailwindConfig = require('./tailwind.config.js');
const fs = require('fs');
const path = require('path');

console.log('Tailwind CSS Configuration Checker');
console.log('==================================');

// Check that content paths are configured
console.log('\nChecking content paths:');
if (tailwindConfig.content && tailwindConfig.content.length > 0) {
  console.log('✅ Content paths found:', tailwindConfig.content);
} else {
  console.log('❌ No content paths found!');
}

// Check for essential theme configs
console.log('\nChecking theme configuration:');
if (tailwindConfig.theme) {
  console.log('✅ Theme configuration found');
  
  // Check for extended theme
  if (tailwindConfig.theme.extend) {
    console.log('✅ Extended theme configuration found');
    
    // Check colors - especially custom colors
    if (tailwindConfig.theme.extend.colors) {
      console.log('✅ Custom colors defined:', Object.keys(tailwindConfig.theme.extend.colors));
    } else {
      console.log('ℹ️ No custom colors found in theme.extend');
    }
  } else {
    console.log('⚠️ No theme extension found. Consider using theme.extend');
  }
} else {
  console.log('❌ No theme configuration found!');
}

// Check for plugins
console.log('\nChecking plugins:');
if (tailwindConfig.plugins && tailwindConfig.plugins.length > 0) {
  console.log('✅ Plugins found:', tailwindConfig.plugins.length);
} else {
  console.log('ℹ️ No plugins found');
}

// Check CSS files for @tailwind directives
console.log('\nChecking CSS files for @tailwind directives:');
const globalCssPath = path.join(__dirname, 'src', 'app', 'globals.css');

try {
  const cssContent = fs.readFileSync(globalCssPath, 'utf8');
  
  if (cssContent.includes('@tailwind base')) {
    console.log('✅ Found @tailwind base directive');
  } else {
    console.log('❌ Missing @tailwind base directive!');
  }
  
  if (cssContent.includes('@tailwind components')) {
    console.log('✅ Found @tailwind components directive');
  } else {
    console.log('❌ Missing @tailwind components directive!');
  }
  
  if (cssContent.includes('@tailwind utilities')) {
    console.log('✅ Found @tailwind utilities directive');
  } else {
    console.log('❌ Missing @tailwind utilities directive!');
  }
  
  // Check for @apply usage
  const applyMatches = cssContent.match(/@apply\s+[^;]+;/g);
  if (applyMatches && applyMatches.length > 0) {
    console.log(`⚠️ Found ${applyMatches.length} @apply usages - check for unknown utility classes!`);
    applyMatches.forEach((match, index) => {
      console.log(`  ${index + 1}. ${match.trim()}`);
    });
  } else {
    console.log('✅ No @apply directives found - reduces risk of unknown utility errors');
  }
  
} catch (error) {
  console.log(`❌ Error reading CSS file: ${error.message}`);
}

console.log('\nConfiguration check complete!'); 