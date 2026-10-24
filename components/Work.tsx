"use client";

import { useState } from "react";
import { HoverButton } from "./HoverCell";
import Reveal from "./Reveal";

const jobs = [
  {
    company: "ServiceNow",
    role: "Solutions Engineer",
    location: "Orlando, FL",
    short: "Aug 2026 – Present",
    dates: "August 2026 – Present",
    bullets: [
      "Lead 10+ Jumpstart Technical Accelerators, including Health Assessment, CMDB, and CSDM initiatives, to increase enterprise client product adoption and optimize architecture for enterprise accounts.",
      "Shortened time-to-value for enterprise accounts by 2+ weeks by establishing cloned sub-production evaluation baselines to uncover architecture gaps and deliver actionable quick wins.",
      "Designed and presented tailored technical roadmaps and architecture governance frameworks for enterprise stakeholders, driving a 15% increase in platform feature adoption.",
    ],
  },
  {
    company: "Lockheed Martin",
    role: "Software Engineer Intern",
    location: "Orlando, FL",
    short: "Jan 2025 – Aug 2026",
    dates: "January 2025 – August 2026",
    bullets: [
      "Engineered a custom AI chatbot using Genesis AI to parse Jira tasks and generate step-by-step subtasks through webhooks, accelerating sprint testing efficiency by 57%.",
      "Maintained 6 enterprise web applications using Angular, following strict engineering standards and best practices.",
      "Developed automation scripts and configured updates across 8 enterprise servers to maintain data integrity and system throughput.",
      "Ran bi-weekly Agile release cycles, delivering peer-reviewed, well-documented code through Git workflows.",
    ],
  },
];

const skills = [
  {
    label: "Tools",
    items: ["React, Next.js, Angular, TypeScript, Python, Go, FastAPI, Git, Jira, Figma, Claude Code, LLMs"],
  },
  {
    label: "Languages",
    items: ["Python, C, TypeScript, JavaScript, Go, SQL"],
  },
  {
    label: "Expertise",
    items: [
      "ServiceNow ITOM, CMDB, CSDM, ServiceNow Impact",
      "Technical Consulting, Customer Success Strategy, Solutions Engineering, Workflow Automation",
    ],
  },
  {
    label: "Certifications",
    items: ["ServiceNow Certified System Administrator (CSA)", "ServiceNow Data Foundations (CMDB/CSDM)"],
  },
];

// The Skills tab sits after the jobs, so its index is jobs.length.
const SKILLS_INDEX = jobs.length;

export default function Work() {
  const [selected, setSelected] = useState(0);
  const onSkills = selected === SKILLS_INDEX;
  const job = jobs[selected];

  return (
    <section className="panel" id="work">
      <Reveal>
        <h2 className="panel-label" data-reveal>
          Work
        </h2>

        <div className="work-layout" data-reveal>
          <div className="work-tabs" role="tablist" aria-label="Jobs and skills">
            {jobs.map((j, i) => (
              <HoverButton
                key={j.company}
                startIndex={i * 2}
                role="tab"
                id={`tab-${i}`}
                aria-controls="job-panel"
                aria-selected={i === selected}
                className="work-tab"
                onClick={() => setSelected(i)}
              >
                <span className="work-company">{j.company}</span>
                <span className="work-role">{j.role}</span>
                <span className="work-dates">{j.short}</span>
              </HoverButton>
            ))}
            <HoverButton
              role="tab"
              id={`tab-${SKILLS_INDEX}`}
              startIndex={SKILLS_INDEX * 2}
              aria-controls="job-panel"
              aria-selected={onSkills}
              className="work-tab"
              onClick={() => setSelected(SKILLS_INDEX)}
            >
              <span className="work-company">Skills</span>
              <span className="work-role">Tools, expertise &amp; certifications</span>
            </HoverButton>
          </div>

          <div className="work-detail">
            {onSkills ? (
              <article className="job" role="tabpanel" id="job-panel" aria-labelledby={`tab-${SKILLS_INDEX}`}>
                <header className="job-head">
                  <h3>Skills</h3>
                </header>
                {skills.map((group) => (
                  <div className="row skill-row" key={group.label}>
                    <h3 className="row-label">{group.label}</h3>
                    <div className="row-body">
                      {group.items.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </article>
            ) : (
              <article className="job" role="tabpanel" id="job-panel" aria-labelledby={`tab-${selected}`}>
                <header className="job-head">
                  <h3>
                    {job.role} <span>{job.company}, {job.location}</span>
                  </h3>
                  <p className="dates">{job.dates}</p>
                </header>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
