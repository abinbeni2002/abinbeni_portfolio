import React, { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Cloud,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Terminal,
  X,
  Layers3,
  Database,
} from "lucide-react";
import { profile, experience, projects, skills } from "./data.js";

const hasLink = (value) => typeof value === "string" && value.trim().length > 0;

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading" data-reveal="left">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {note && <p data-reveal="right">{note}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projectFilter, setProjectFilter] = useState("All");
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const closeMenu = () => setMenuOpen(false);
  const nameParts = profile.name.split(" ");
  const brandName = nameParts.join(" ");
  const brandInitials = nameParts
    .slice(-2)
    .map((part) => part[0])
    .join("");
  const heroLineOne = nameParts.slice(0, -1).join(" ");
  const heroLineTwo = nameParts.at(-1);
  const visibleProjects = projects.filter((project) => {
    if (projectFilter === "All") return true;
    return project.type.toLowerCase().includes(projectFilter.toLowerCase());
  });
  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Skills", "#skills"],
  ];

  useEffect(() => {
    const pointerTargets = [
      ...document.querySelectorAll(".hero-artwork, .project-stage"),
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePointerAtmosphere = (event) => {
      if (reducedMotion.matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(1, (event.clientX - bounds.left) / bounds.width),
      );
      const y = Math.max(
        0,
        Math.min(1, (event.clientY - bounds.top) / bounds.height),
      );
      event.currentTarget.style.setProperty(
        "--pointer-x",
        `${(x * 100).toFixed(1)}%`,
      );
      event.currentTarget.style.setProperty(
        "--pointer-y",
        `${(y * 100).toFixed(1)}%`,
      );

      if (event.currentTarget.matches(".hero-artwork")) {
        event.currentTarget.style.setProperty(
          "--art-tilt-x",
          `${((0.5 - y) * 2.2).toFixed(2)}deg`,
        );
        event.currentTarget.style.setProperty(
          "--art-tilt-y",
          `${((x - 0.5) * 3).toFixed(2)}deg`,
        );
      }
    };
    const resetPointerAtmosphere = (event) => {
      event.currentTarget.style.setProperty("--pointer-x", "50%");
      event.currentTarget.style.setProperty("--pointer-y", "45%");
      event.currentTarget.style.setProperty("--art-tilt-x", "0deg");
      event.currentTarget.style.setProperty("--art-tilt-y", "0deg");
    };
    pointerTargets.forEach((element) => {
      element.addEventListener("pointermove", updatePointerAtmosphere, {
        passive: true,
      });
      element.addEventListener("pointerleave", resetPointerAtmosphere);
    });

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(progress),
        );
        document.documentElement.style.setProperty(
          "--world-grid-phase",
          prefersReducedMotion ? "0px" : `${(window.scrollY * 0.38) % 58}px`,
        );
        document.documentElement.style.setProperty(
          "--world-light-phase",
          prefersReducedMotion ? "0px" : `${(window.scrollY * 0.12) % 180}px`,
        );
        document.documentElement.style.setProperty(
          "--hero-shift",
          prefersReducedMotion
            ? "0px"
            : `${Math.min(window.scrollY, 480) * -0.035}px`,
        );

        const readingLine = window.innerHeight * 0.46;
        const currentSection = [
          ...document.querySelectorAll("main section[id]"),
        ].find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= readingLine && bounds.bottom > readingLine;
        });
        if (currentSection) setActiveSection(currentSection.id);

        const explorationScenes = document.querySelectorAll(
          "[data-explore-scene]",
        );
        const viewportCenter = window.innerHeight * 0.5;
        const compactViewport = window.matchMedia("(max-width: 800px)").matches;
        explorationScenes.forEach((scene) => {
          if (prefersReducedMotion) {
            scene.style.setProperty("--explore-depth", "0px");
            scene.style.setProperty("--explore-tilt", "0deg");
            scene.style.setProperty("--explore-scale", "1");
            scene.style.setProperty("--explore-focus", "1");
            return;
          }

          const bounds = scene.getBoundingClientRect();
          const distance =
            (bounds.top + bounds.height * 0.5 - viewportCenter) /
            window.innerHeight;
          const clampedDistance = Math.max(-1.25, Math.min(1.25, distance));
          const intensity = Math.abs(clampedDistance);
          const depth = Math.min(
            intensity * (compactViewport ? 66 : 180),
            compactViewport ? 72 : 190,
          );
          const tilt = compactViewport
            ? 0
            : Math.max(-5, Math.min(5, clampedDistance * -4.5));
          const scale =
            1 -
            Math.min(
              intensity * (compactViewport ? 0.022 : 0.055),
              compactViewport ? 0.03 : 0.07,
            );
          scene.style.setProperty("--explore-depth", `${-depth}px`);
          scene.style.setProperty("--explore-tilt", `${tilt}deg`);
          scene.style.setProperty("--explore-scale", String(scale));
          scene.style.setProperty(
            "--explore-focus",
            String(
              1 -
                Math.min(
                  intensity * (compactViewport ? 0.1 : 0.45),
                  compactViewport ? 0.1 : 0.45,
                ),
            ),
          );
        });

        const journey = document.querySelector(".project-journey");
        const stage = journey?.querySelector(".project-stage");
        if (
          journey &&
          stage &&
          window.matchMedia("(min-width: 801px)").matches
        ) {
          const range = journey.offsetHeight - stage.offsetHeight;
          const progress =
            range > 0
              ? Math.max(
                  0,
                  Math.min(
                    1,
                    (stage.getBoundingClientRect().top -
                      journey.getBoundingClientRect().top) /
                      range,
                  ),
                )
              : 0;
          journey.style.setProperty("--works-progress", String(progress));
          const count = Number(journey.dataset.projectCount) || 1;
          setActiveWorkIndex(
            Math.max(
              0,
              Math.min(count - 1, Math.floor(progress * count - 0.12)),
            ),
          );
          journey.querySelectorAll(".project-card").forEach((card, index) => {
            const target = count > 1 ? index / (count - 1) : 0;
            const distance = progress - target;
            card.style.setProperty("--screen-turn", `${distance * -34}deg`);
            card.style.setProperty(
              "--screen-depth",
              `${Math.min(Math.abs(distance) * 330, 330)}px`,
            );
            card.style.setProperty(
              "--screen-scale",
              String(1 - Math.min(Math.abs(distance) * 0.15, 0.15)),
            );
          });
        } else {
          setActiveWorkIndex(0);
        }

        document.querySelectorAll(".project-art-image").forEach((image) => {
          if (prefersReducedMotion) {
            image.style.setProperty("--image-parallax", "0px");
            return;
          }
          const bounds = image.getBoundingClientRect();
          const distanceFromCenter =
            (bounds.top + bounds.height / 2 - window.innerHeight / 2) /
            window.innerHeight;
          const parallax =
            Math.max(-1, Math.min(1, distanceFromCenter)) *
            (compactViewport ? -32 : -16);
          image.style.setProperty("--image-parallax", `${parallax}px`);
        });
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      pointerTargets.forEach((element) => {
        element.removeEventListener("pointermove", updatePointerAtmosphere);
        element.removeEventListener("pointerleave", resetPointerAtmosphere);
      });
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -48px 0px" },
    );

    document
      .querySelectorAll("[data-reveal]:not(.is-visible)")
      .forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [projectFilter]);

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="scroll-progress" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label={`${profile.name}, home`}>
          <span className="brand-mark">{brandInitials}</span>
          <span>
            {brandName}
            <i>.</i>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={menuOpen ? "nav-links nav-open" : "nav-links"}
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              aria-current={
                activeSection === href.slice(1) ? "location" : undefined
              }
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            aria-current={activeSection === "contact" ? "location" : undefined}
            onClick={closeMenu}
          >
            Let’s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" />
              {profile.availability}
            </div>
            <p className="hero-kicker">
              {profile.role} &nbsp;·&nbsp; {profile.location}
            </p>
            <h1>
              Building reliable
              <br />
              solutions with
              <br />
              <span className="outline-text">Java &amp; Spring Boot</span>
            </h1>
            <p className="hero-description">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View my work <ArrowRight size={17} />
              </a>
              {hasLink(profile.resumeUrl) ? (
                <a
                  className="button button-quiet"
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowDownRight size={16} /> Resume
                </a>
              ) : (
                <a className="button button-quiet" href="#contact">
                  Contact me <ArrowUpRight size={16} />
                </a>
              )}
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              {hasLink(profile.github) && (
                <a
                  href={profile.github}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} />
                </a>
              )}
              {hasLink(profile.linkedin) && (
                <a
                  href={profile.linkedin}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={17} />
                </a>
              )}
              {hasLink(profile.email) && (
                <a href={`mailto:${profile.email}`} aria-label="Email">
                  <Mail size={17} />
                </a>
              )}
            </div>
            <div className="hero-meta">
              <span>
                <Code2 size={15} /> Java · Spring Boot
              </span>
              <span>
                <Cloud size={15} /> AWS
              </span>
              <span>
                <Database size={15} /> PostgreSQL
              </span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Decorative code terminal">
            <div className="hero-artwork">
              <img
                src="/facenest-preview.svg"
                alt="FaceNest profile workspace, shown as a featured project exhibit"
                fetchPriority="high"
              />
              <span className="hero-art-label">
                FIG. 01 &nbsp; / &nbsp; PROFILE SYSTEM
              </span>
            </div>
            <div className="visual-orbit orbit-a" />
            <div className="visual-orbit orbit-b" />
            <div className="terminal-card hero-terminal">
              <div className="terminal-top">
                <div className="traffic-lights">
                  <b />
                  <b />
                  <b />
                </div>
                <span>developer.java</span>
                <span className="terminal-lock">●</span>
              </div>
              <div className="terminal-body">
                <div className="line-no">
                  01
                  <br />
                  02
                  <br />
                  03
                  <br />
                  04
                  <br />
                  05
                  <br />
                  06
                  <br />
                  07
                  <br />
                  08
                </div>
                <pre>
                  <span className="syntax-purple">public class</span>{" "}
                  <span className="syntax-green">Developer</span> {"{"}
                  <br />
                  {"  "}
                  <span className="syntax-purple">private final</span> String
                  focus =<br />
                  {"    "}
                  <span className="syntax-orange">"backend engineering"</span>;
                  <br />
                  <br />
                  {"  "}
                  <span className="syntax-purple">public void</span>{" "}
                  <span className="syntax-blue">build</span>() {"{"}
                  <br />
                  {"    "}learn();
                  <br />
                  {"    "}ship();
                  <br />
                  {"    "}improve();
                  <br />
                  {"  }"}
                  <br />
                  {"}"}
                </pre>
              </div>
              <div className="terminal-bottom">
                <span>
                  <span className="status-dot" /> Ready to build
                </span>
                <span>UTF-8&nbsp; · &nbsp;Java</span>
              </div>
            </div>
            <div className="floating-chip chip-top">
              <Braces size={16} />
              <span>Clean code</span>
            </div>
            <div className="floating-chip chip-bottom">
              <Layers3 size={16} />
              <span>Systems thinking</span>
            </div>
            <div className="visual-caption">BUILD · DEBUG · DELIVER</div>
          </div>
          <div className="hero-metrics" aria-label="Portfolio overview">
            <div>
              <strong>{experience[0]?.period.split(" ")[0] ?? "—"}</strong>
              <span>Systems engineering since</span>
            </div>
            <div>
              <strong>{projects.length}</strong>
              <span>Personal projects</span>
            </div>
            <div>
              <strong>{skills.length}</strong>
              <span>Skill areas</span>
            </div>
            <div>
              <strong>AWS</strong>
              <span>Cloud exposure</span>
            </div>
          </div>
          <a className="scroll-cue" href="#about">
            <span className="scroll-line" /> SCROLL TO EXPLORE
          </a>
        </section>

        <section className="ticker" aria-label="Core technologies">
          <div className="ticker-track">
            <span>JAVA 17</span>
            <i>✳</i>
            <span>SPRING BOOT</span>
            <i>✳</i>
            <span>REST APIs</span>
            <i>✳</i>
            <span>POSTGRESQL</span>
            <i>✳</i>
            <span>AWS</span>
            <i>✳</i>
            <span>CI/CD</span>
            <i>✳</i>
            <span>JAVA 17</span>
            <i>✳</i>
            <span>SPRING BOOT</span>
            <i>✳</i>
            <span>REST APIs</span>
            <i>✳</i>
            <span>POSTGRESQL</span>
            <i>✳</i>
            <span>AWS</span>
            <i>✳</i>
            <span>CI/CD</span>
            <i>✳</i>
          </div>
        </section>

        <section
          className="section container about-section"
          id="about"
          data-explore-scene
        >
          <SectionHeading
            eyebrow="01 / ABOUT ME"
            title={
              <>
                Curious by nature.
                <br />
                <span className="muted-heading">Engineer by practice.</span>
              </>
            }
            note="I enjoy understanding how systems work, finding the root cause of problems, and turning ideas into reliable software."
          />
          <div className="about-grid">
            <div className="about-main">
              <span className="quote-mark">“</span>
              <p>
                I’m a software professional focused on growing deeper in{" "}
                <strong>backend development</strong>. My day-to-day experience
                in application support has taught me to investigate issues
                methodically, read logs, and care about what happens after code
                ships—not just before.
              </p>
              <p>
                Outside work, I build personal projects to explore APIs,
                full-stack workflows, and AI-powered experiences. I’m looking
                for opportunities where I can contribute to backend engineering
                while continuing to learn.
              </p>
              <div className="signature-line">
                <span className="signature-dot" /> Always learning, always
                iterating.
              </div>
            </div>
            <div className="about-aside">
              <div className="fact-card" data-reveal="right">
                <span className="fact-number">01</span>
                <div>
                  <h3>Production mindset</h3>
                  <p>
                    Support, troubleshooting, log analysis, and operational
                    awareness.
                  </p>
                </div>
              </div>
              <div className="fact-card" data-reveal="left">
                <span className="fact-number">02</span>
                <div>
                  <h3>Backend first</h3>
                  <p>
                    Java, Spring Boot, RESTful services, and data persistence.
                  </p>
                </div>
              </div>
              <div className="fact-card" data-reveal="right">
                <span className="fact-number">03</span>
                <div>
                  <h3>Cloud curious</h3>
                  <p>
                    Hands-on exposure to AWS services and established delivery
                    pipelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <SectionHeading
              eyebrow="§·02 / HALL OF THE WORKS"
              title={
                <>
                  The works<span className="accent-dot">.</span>
                </>
              }
              note="A closer look at the systems I’m building: profile workflows, backend services, and thoughtful AI experiences."
            />
            <div className="projects-tools">
              <div
                className="project-controls"
                role="group"
                aria-label="Filter projects"
              >
                {["All", "Full-stack", "AI"].map((filter) => (
                  <button
                    className={
                      projectFilter === filter
                        ? "project-filter is-active"
                        : "project-filter"
                    }
                    key={filter}
                    type="button"
                    aria-pressed={projectFilter === filter}
                    onClick={() => {
                      setActiveWorkIndex(0);
                      setProjectFilter(filter);
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <a
                className="projects-github-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                View GitHub <ArrowUpRight size={14} />
              </a>
            </div>
            <div
              className="project-journey"
              data-project-count={visibleProjects.length}
            >
              <div className="project-stage">
                <div className="works-stage-head">
                  <span>SELECTED PROJECTS &nbsp;·&nbsp; 2025—26</span>
                  <span aria-live="polite">
                    EXHIBIT {String(activeWorkIndex + 1).padStart(2, "0")} /{" "}
                    {String(visibleProjects.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="projects-grid">
                  {visibleProjects.map((project, idx) => (
                    <article
                      className={`project-card project-${project.number}`}
                      data-reveal={idx % 2 === 0 ? "left" : "right"}
                      key={project.name}
                    >
                      <div className="project-art">
                        <img
                          className="project-art-image"
                          src={
                            project.name === "FaceNest"
                              ? "/facenest-preview.svg"
                              : "/clearmind-preview.svg"
                          }
                          alt={
                            project.name === "FaceNest"
                              ? "FaceNest profile editor showing a photo profile and completion progress"
                              : "ClearMind chat interface with a calming visual and supportive conversation"
                          }
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="project-art-shade" />
                        <div className="project-number">{project.number}</div>
                        <span className="project-index">
                          PROJECT {project.number}
                        </span>
                      </div>
                      <div className="project-content">
                        <div className="project-type">{project.type}</div>
                        <div className="project-title-row">
                          <h3>{project.name}</h3>
                          <span className="project-status">
                            <span className="status-dot" />
                            {project.status}
                          </span>
                        </div>
                        <p>{project.summary}</p>
                        <div className="project-tags">
                          {project.highlights.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <div className="project-links">
                          {hasLink(project.repo) ? (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Source code <Github size={15} />
                            </a>
                          ) : (
                            <span className="link-pending">
                              Repository link to add
                            </span>
                          )}
                          {hasLink(project.live) && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Live demo <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="works-stage-foot">
                  <span>
                    {visibleProjects[activeWorkIndex]?.name ?? "Selected work"}
                  </span>
                  <div className="works-progress-rail">
                    <span />
                  </div>
                  <span>SCROLL TO EXPLORE</span>
                </div>
              </div>
            </div>
            <div className="project-footnote">
              <span className="tiny-spark">✳</span> These are project summaries,
              not claims of production deployment. Add accurate feature details
              and public links in <code>src/data.js</code>.
            </div>
          </div>
        </section>

        <section
          className="section container experience-section"
          id="experience"
          data-explore-scene
        >
          <SectionHeading
            eyebrow="03 / PROFESSIONAL JOURNEY"
            title={
              <>
                Professional
                <br />
                <span className="muted-heading">journey.</span>
              </>
            }
            note="Learning to build dependable systems through production support, investigation, cloud operations, and delivery."
          />
          <div className="timeline">
            {experience.map((item, idx) => (
              <article
                className="timeline-item"
                data-reveal="left"
                key={item.company}
              >
                <div className="timeline-marker">0{idx + 1}</div>
                <div className="experience-card">
                  <div className="experience-top">
                    <div>
                      <span className="company-label">{item.company}</span>
                      <h3>{item.role}</h3>
                    </div>
                    <span className="period">{item.period}</span>
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    <span>Application support</span>
                    <span>AWS</span>
                    <span>Java ecosystem</span>
                    <span>CI/CD operations</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="honesty-note">
            <span className="note-icon">i</span> Experience is described
            conservatively. Add verified metrics, team scope, and specific
            outcomes only when you can substantiate them.
          </p>
        </section>

        <section
          className="section container skills-section"
          id="skills"
          data-explore-scene
        >
          <SectionHeading
            eyebrow="04 / TOOLKIT"
            title={
              <>
                Tools of the trade<span className="accent-dot">.</span>
              </>
            }
            note="A practical toolkit across backend development, data, cloud services, and delivery workflows."
          />
          <div className="skills-layout">
            <div className="skills-intro" data-reveal="left">
              <div className="skills-icon">
                <Terminal size={25} />
              </div>
              <h3>My working toolkit</h3>
              <p>
                I’m continuously strengthening fundamentals and building
                practical experience with each project.
              </p>
              <div className="skills-code">
                $ whoami
                <br />
                <span>backend-engineer-in-progress</span>
                <br />
                <br />$ status
                <br />
                <span className="green-text">
                  learning · building · improving
                </span>
                <span className="cursor">_</span>
              </div>
            </div>
            <div className="skill-groups">
              {skills.map((group, idx) => (
                <div
                  className="skill-group"
                  data-reveal="right"
                  key={group.group}
                >
                  <div className="skill-group-head">
                    <span className="skill-index">0{idx + 1}</span>
                    <h3>{group.group}</h3>
                    <ArrowUpRight size={16} />
                  </div>
                  <div className="skill-pills">
                    {group.items.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" data-explore-scene>
          <div className="container contact-inner">
            <div className="contact-copy">
              <span className="eyebrow">05 / NEXT CHAPTER</span>
              <h2>
                Have a backend
                <br />
                problem to solve<span className="accent-dot">?</span>
              </h2>
              <p>
                Interested in backend engineering roles, collaborative projects,
                or a technical conversation? Reach out through a profile below.
              </p>
              <div className="contact-actions">
                {hasLink(profile.linkedin) && (
                  <a
                    className="button button-primary"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Connect on LinkedIn <ArrowUpRight size={16} />
                  </a>
                )}
                {hasLink(profile.email) && (
                  <a
                    className="button button-quiet"
                    href={`mailto:${profile.email}`}
                  >
                    Email me <Mail size={16} />
                  </a>
                )}
              </div>
            </div>
            <div className="contact-links">
              {hasLink(profile.github) && (
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <span className="contact-link-icon">
                    <Github size={19} />
                  </span>
                  <span>
                    <small>CODE & PROJECTS</small>
                    <strong>GitHub</strong>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              )}
              {hasLink(profile.linkedin) && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <span className="contact-link-icon">
                    <Linkedin size={19} />
                  </span>
                  <span>
                    <small>PROFESSIONAL NETWORK</small>
                    <strong>LinkedIn</strong>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              )}
              {hasLink(profile.email) && (
                <a href={`mailto:${profile.email}`}>
                  <span className="contact-link-icon">
                    <Mail size={19} />
                  </span>
                  <span>
                    <small>DIRECT CONTACT</small>
                    <strong>{profile.email}</strong>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              )}
              {hasLink(profile.resumeUrl) && (
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <span className="contact-link-icon">
                    <Check size={19} />
                  </span>
                  <span>
                    <small>CAREER PROFILE</small>
                    <strong>View resume</strong>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <a className="brand" href="#home">
          <span className="brand-mark">{brandInitials}</span>
          <span>
            {brandName}
            <i>.</i>
          </span>
        </a>
        <p>Designed with intent. Built with React.</p>
        <a href="#home" className="back-top">
          BACK TO TOP <ArrowUpRight size={13} />
        </a>
        <span className="footer-copy">
          © {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </div>
  );
}

export default App;
