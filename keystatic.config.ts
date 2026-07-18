import { createElement } from "react";
import { config, collection, fields, singleton } from "@keystatic/core";

// Storage mode:
// - Local development edits files directly on disk, with no login. This keeps
//   the local workflow open and simple (and matches the middleware, which
//   leaves everything ungated in dev).
// - The deployed site uses GitHub: edits are committed to the repo (which
//   triggers a redeploy) and signing in with GitHub is required. It switches on
//   automatically once NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO and the GitHub secrets
//   are set in production. See .env.example for the full list.
const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as
  | `${string}/${string}`
  | undefined;

const storage =
  process.env.NODE_ENV === "production" && githubRepo
    ? ({ kind: "github", repo: githubRepo } as const)
    : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: {
      name: "Ellie Parsonage",
      mark: () =>
        createElement(
          "div",
          {
            style: {
              width: "22px",
              height: "22px",
              borderRadius: "5px",
              background: "#0000ff",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "10px",
              letterSpacing: "0.02em",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            },
          },
          "EP",
        ),
    },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "yaml" },
      columns: ["title", "category"],
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Project title",
            description: "The project name shown on the site.",
            validation: { isRequired: true },
          },
          slug: {
            label: "Web link name (leave as-is)",
            description:
              "The short name used in this project's web link, e.g. “silkweaver”. It fills in automatically from the title, so you can normally ignore it.",
          },
        }),
        number: fields.text({
          label: "Number",
          description:
            "The big number shown when this project opens (e.g. 01, 02, 03). Keep them in sequence.",
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: "Position in the list",
          description: "Lower numbers appear first on the site.",
          validation: { isRequired: true },
        }),
        category: fields.text({
          label: "Category",
          description: "A short label, e.g. Branding, Album Artwork.",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          description: "The short paragraph shown next to the work.",
          multiline: true,
          validation: { isRequired: true },
        }),
        cover: fields.image({
          label: "Cover image",
          description:
            "The small preview shown in your work menu. Usually one of the gallery images.",
          directory: "public/images/work",
          publicPath: "/images/work",
          validation: { isRequired: true },
        }),
        images: fields.array(
          fields.image({
            label: "Image",
            directory: "public/images/work",
            publicPath: "/images/work",
          }),
          {
            label: "Gallery images",
            description:
              "The pictures people scroll through, top to bottom. Drag to reorder, click one to preview or replace it.",
            // filename is surfaced so the editor can render a thumbnail per row
            itemLabel: (props) => props.value?.filename ?? "Image",
          },
        ),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: "Site settings",
      path: "src/content/settings",
      format: { data: "yaml" },
      schema: {
        name: fields.text({
          label: "Your name",
          description: "Shown small at the top of the opening screen.",
          validation: { isRequired: true },
        }),
        role: fields.text({
          label: "Your role",
          description: "e.g. Graphic Designer. Shown under your name.",
        }),
        heroLine1: fields.text({
          label: "Big opening word (top)",
          description: "The first giant word on the opening screen. Currently “Design”.",
          validation: { isRequired: true },
        }),
        heroLine2: fields.text({
          label: "Big opening word (bottom)",
          description: "The second giant word on the opening screen. Currently “Portfolio”.",
          validation: { isRequired: true },
        }),
        available: fields.text({
          label: "Availability line",
          description: "Small line above your contact details, e.g. “Available for freelance”.",
        }),
        contactHeading: fields.text({
          label: "Contact heading",
          description: "The big line on the contact section, e.g. “Let’s make something.”",
        }),
        contactEmail: fields.text({
          label: "Contact email",
          description: "Where the “email me” button sends people.",
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
