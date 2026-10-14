import { describe, it, expect } from 'vitest';
import { TERMINAL_COMMANDS, INITIAL_TERMINAL_HISTORY } from '../terminalCommands';

describe('Data Layer: TERMINAL_COMMANDS', () => {
  it('should initialize with an informative whoami history entry', () => {
    expect(INITIAL_TERMINAL_HISTORY.length).toBeGreaterThan(0);
    expect(INITIAL_TERMINAL_HISTORY[0].command).toBe('whoami');
    expect(INITIAL_TERMINAL_HISTORY[0].output).toBeDefined();
  });

  it('should have essential core commands registered', () => {
    const requiredCommands = [
      'help',
      'about',
      'projects',
      'run branchbase',
      'run jvm-mcp',
      'run a2a-hub',
      'run macrosentinel',
      'run edurag',
      'run studio-showcase',
      'skills',
      'standards',
      'contact',
      'socials'
    ];

    requiredCommands.forEach((cmd) => {
      expect(TERMINAL_COMMANDS[cmd], `Missing terminal command: ${cmd}`).toBeDefined();
    });
  });

  it('should return valid non-empty output for all registered commands', () => {
    Object.entries(TERMINAL_COMMANDS).forEach(([cmd, entry]) => {
      const output = typeof entry === 'function' ? entry([]) : entry;
      if (Array.isArray(output)) {
        expect(output.length, `Command ${cmd} returned an empty array`).toBeGreaterThan(0);
        output.forEach((line) => expect(typeof line).toBe('string'));
      } else {
        expect(typeof output).toBe('string');
        expect((output as string).trim().length).toBeGreaterThan(0);
      }
    });
  });

  it('should document existing commands within the "help" output', () => {
    const helpOutput = TERMINAL_COMMANDS.help;
    const helpText = Array.isArray(helpOutput) ? helpOutput.join(' ') : (helpOutput as string);

    expect(helpText).toContain('about');
    expect(helpText).toContain('projects');
    expect(helpText).toContain('skills');
    expect(helpText).toContain('standards');
    expect(helpText).toContain('contact');
    expect(helpText).toContain('clear');
  });
});
