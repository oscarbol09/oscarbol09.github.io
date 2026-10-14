import { describe, it, expect } from 'vitest';
import { PROJECTS, Project } from '../projects';

describe('Data Layer: PROJECTS Dataset Integrity', () => {
  it('should contain a non-empty list of projects', () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it('should have unique ids and slugs for every project', () => {
    const ids = new Set<string>();
    const slugs = new Set<string>();

    PROJECTS.forEach((p) => {
      expect(ids.has(p.id), `Duplicate project id: ${p.id}`).toBe(false);
      expect(slugs.has(p.slug), `Duplicate project slug: ${p.slug}`).toBe(false);
      ids.add(p.id);
      slugs.add(p.slug);
    });
  });

  it('should comply with valid category and badgeColor unions', () => {
    const validCategories = new Set(['systems', 'ai_rag', 'desktop_tools', 'vision', 'frontend_craft']);
    const validBadgeColors = new Set(['cyan', 'blue', 'violet', 'emerald', 'amber']);

    PROJECTS.forEach((p) => {
      expect(validCategories.has(p.category), `Invalid category "${p.category}" in project ${p.id}`).toBe(true);
      expect(validBadgeColors.has(p.badgeColor), `Invalid badgeColor "${p.badgeColor}" in project ${p.id}`).toBe(true);
    });
  });

  it('should have valid GitHub URLs for all repositories', () => {
    const githubUrlRegex = /^https:\/\/github\.com\/oscarbol09\/[a-zA-Z0-9_.-]+$/;
    PROJECTS.forEach((p) => {
      expect(p.githubUrl).toMatch(githubUrlRegex);
    });
  });

  it('should have non-empty highlights, techStack and metrics', () => {
    PROJECTS.forEach((p: Project) => {
      expect(p.highlights.length).toBeGreaterThan(0);
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(p.description.trim().length).toBeGreaterThan(20);

      p.metrics.forEach((m) => {
        expect(m.label.trim().length).toBeGreaterThan(0);
        expect(m.value.trim().length).toBeGreaterThan(0);
      });

      p.technicalDecisions.forEach((td) => {
        expect(td.title.trim().length).toBeGreaterThan(0);
        expect(td.explanation.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
