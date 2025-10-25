import {
  bio,
  skills,
  education,
  experience,
  research,
  projects,
  publications,
  footer,
  contactLinks,
} from "./user-data/data.js";
import { html, render } from "https://unpkg.com/lit-html?module";

import { URLs } from "./user-data/urls.js";

const { gitConnected, linkedInImage } = URLs;

// Set LinkedIn profile image immediately
function setLinkedInImage() {
  const profileImg = document.getElementById("profile-img");
  if (profileImg && linkedInImage) {
    profileImg.src = linkedInImage;
    profileImg.onerror = () => setFallbackProfileImage();
  }
}

async function fetchGitConnectedData(url) {
  try {
    const response = await fetch(url);
    const { basics } = await response.json();
    mapBasicResponse(basics);
  } catch (error) {
    console.error("Error fetching GitConnected data:", error);
  }
}

function mapBasicResponse(basics) {
  const { name } = basics;
  window.parent.document.title = name || "Nuruzzaman Rahat";
}

function setFallbackProfileImage() {
  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.src = "https://ui-avatars.com/api/?name=Nuruzzaman+Rahat&size=150&background=f9bf3f&color=000&bold=true";
  }
}

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  const bioTemplate = html` ${items.map((bioItem) => html`<p>${bioItem}</p>`)}`;
  render(bioTemplate, bioTag);
}

function populateSkills(items, id) {
  const skillsTag = document.getElementById(id);

  const skillsTemplate = html` ${items.map(
    (item) => html` <div class="col-md-3 animate-box">
      <div class="progress-wrap">
        <li class="skill-item">${item}</li>
      </div>
    </div>`
  )}`;
  render(skillsTemplate, skillsTag);
}

function populateProjects(items, id) {
  const projectdesign = document.getElementById(id);
  if (!projectdesign || !items?.length) return;

  const tagsTemplate = (tags) => html`
    <div class="tags-container">
      ${tags.map((tag) => html`<div class="profile-badge brown-badge">${tag}</div>`)}
    </div>
  `;

  const projectTemplate = html`
    <div class="repo-wrapper">
      ${items.map(
        (item) => html`
          <div class="repo-card">
            <a
              href="${item.link}"
              target="_blank"
              class="repo-link"
            >
              <p class="repo-heading">${item.title}</p>
              <p class="repo-description">${item.description}</p>
              ${tagsTemplate(item.technologies)}
            </a>
          </div>
        `
      )}
    </div>
  `;

  render(projectTemplate, projectdesign);
}

function populatePublications(items, id) {
  const publicationdesign = document.getElementById(id);
  if (!publicationdesign || !items?.length) return;

  const publicationTemplate = html`
    ${items.map(
      (item) => html`
        <div class="blog-card">
          <div class="blog-content">
            <a href="${item.link}" target="_blank" class="blog-link">
              <p class="blog-heading">${item.title}</p>
              <p class="publish-date">${item.journal} • ${item.year}</p>
            </a>
          </div>
        </div>
      `
    )}
  `;

  render(publicationTemplate, publicationdesign);
}

function populateExp_Edu(items, id) {
  const mainContainer = document.getElementById(id);
  if (!mainContainer || !items?.length) return;

  const detailsTemplate = (details) => html`
    ${details.map(
      (detail) => html` <p class="timeline-text">&blacksquare; ${detail}</p> `
    )}
  `;

  const tagsTemplate = (tags) => html`
    <div class="tags-container">
      ${tags.map((tag) => html`<div class="profile-badge brown-badge">${tag}</div>`)}
    </div>
  `;

  const timelineTemplate = html`
    ${items.map(
      (item) => html`
        <article class="timeline-entry animate-box">
          <div class="timeline-entry-inner">
            <div class="timeline-icon color-2">
              <i class="fa fa-${item.icon}"></i>
            </div>
            <div class="timeline-label">
              <div class="exp-heading">
                <p class="blog-heading">${item.title}</p>
                <span class="publish-date">${item.duration}</span>
              </div>
              <span class="timeline-sublabel">${item.subtitle}</span>
              ${detailsTemplate(item.details)} ${tagsTemplate(item.tags)}
            </div>
          </div>
        </article>
      `
    )}
    <article class="timeline-entry begin animate-box">
      <div class="timeline-entry-inner">
        <div class="timeline-icon color-2"></div>
      </div>
    </article>
  `;

  render(timelineTemplate, mainContainer);
}

function populateLinks(items, id) {
  const footer = document.getElementById(id);
  if (!footer || !items?.length) return;

  const linkTemplate = (data) => html`
    <li>
      <a
        href="${data.link || "#"}"
        @click="${data.func || null}"
      >
        ${data.text}
      </a>
    </li>
  `;

  const columnTemplate = (item) => html`
    <span class="col">
      <p class="col-title">${item.label}</p>
      <nav class="col-list">
        <ul>
          ${item.data.map((data) => linkTemplate(data))}
        </ul>
      </nav>
    </span>
  `;

  const copyrightTemplate = (item) => html`
    <div class="copyright-text no-print">
      ${item.data.map((copyright) => html`<p>${copyright}</p>`)}
    </div>
  `;

  const footerTemplate = html`
    ${items.map(
      (item) => html`
        ${item.label === "copyright-text"
          ? copyrightTemplate(item)
          : columnTemplate(item)}
      `
    )}
  `;

  render(footerTemplate, footer);
}

function populateContactLinks(items, id) {
  const contactLinks = document.getElementById(id);
  if (!contactLinks || !items?.length) return;
  const contactLinkTemplate = (item) => html`
    <li class="profile-card" style="padding: 6px 12px">
      <a href="${item.link}" target="_blank" class="contact-link">
        <i class="${item.icon}"></i>
        <span class="contact-label">${item.label}</span>
      </a>
    </li>
  `;
  const contactLinksTemplate = html`
    <ul class="contact-links-list">
      ${items.map((item) => contactLinkTemplate(item))}
    </ul>
  `;
  render(contactLinksTemplate, contactLinks);
}

// Set LinkedIn image first
setLinkedInImage();

populateBio(bio, "bio");
populateSkills(skills, "skills");
populateProjects(projects, "projects");
populatePublications(publications, "publications");
fetchGitConnectedData(gitConnected);
populateExp_Edu(experience, "experience");
populateExp_Edu(research, "research");
populateExp_Edu(education, "education");
populateLinks(footer, "footer");
populateContactLinks(contactLinks, 'contact-links');
