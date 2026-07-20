import { terminalManager } from './apps/web/src/lib/terminal/server-terminal-manager';

try {
  terminalManager.createTerminal('test-id', 'c:/test_dir_not_exist_999');
} catch (e) {
  console.error("Caught error:", e);
}
