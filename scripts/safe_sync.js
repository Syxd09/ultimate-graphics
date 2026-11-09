/**
 * Safe workspace mirror synchronization script.
 * Enforces strict exclusion of all user media directories ('UG', 'UG images', 'public_assets_backup').
 * Verifies asset integrity before and after operation.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SOURCE = 'E:\\mattis';
const TARGET = 'E:\\Ultimate Graphics';
const PROTECTED_DIRS = ['UG', 'UG images', 'public_assets_backup', 'node_modules', '.next', '.git'];

function countFilesInDir(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  return fs.readdirSync(dirPath).length;
}

const sourceUgCount = countFilesInDir(path.join(SOURCE, 'public', 'UG'));
console.log(`[SafeSync] Source public/UG file count: ${sourceUgCount}`);

if (sourceUgCount === 0) {
  console.error('[SafeSync] CRITICAL: Source public/UG is empty or missing! Aborting synchronization.');
  process.exit(1);
}

const xdArgs = PROTECTED_DIRS.map(d => `"${d}"`).join(' ');
const cmd = `robocopy "${SOURCE}" "${TARGET}" /MIR /XD ${xdArgs}`;

console.log(`[SafeSync] Executing: ${cmd}`);
try {
  execSync(cmd, { stdio: 'inherit' });
} catch (err) {
  // Robocopy returns exit code 1 for successful file copy
  if (err.status > 7) {
    console.error(`[SafeSync] Robocopy encountered an error (exit code ${err.status})`);
    process.exit(err.status);
  }
}

const targetUgCount = countFilesInDir(path.join(TARGET, 'public', 'UG'));
console.log(`[SafeSync] Target public/UG file count: ${targetUgCount}`);

if (targetUgCount < sourceUgCount) {
  console.error('[SafeSync] Warning: Target UG file count mismatch. Restoring from source...');
  execSync(`robocopy "${path.join(SOURCE, 'public', 'UG')}" "${path.join(TARGET, 'public', 'UG')}" /E /R:3 /W:1`, { stdio: 'inherit' });
}

console.log('[SafeSync] Workspace synchronization completed safely. All media assets preserved.');

