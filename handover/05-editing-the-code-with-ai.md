# Editing the code (with an AI's help)

The editor (Keystatic) handles almost everything: your words, images and projects. This guide is for the rare moment you want to change something the editor can't reach, like a colour, a font, spacing, the wording of a button, or a new section. You can do this by asking an AI to write the change for you. Here is how, and how to keep it safe.

## It's hard to break

A few things make this low risk:

- **Every past version is kept.** GitHub remembers every version of the site, so anything can be rolled back.
- **A bad change usually just doesn't appear.** If a code change is wrong, the site normally fails to rebuild and stays as it is. The live site keeps showing the last good version.
- **Nothing is instant or permanent.** Changes take about a minute to go live, and can always be undone.

The worst realistic outcome is "that didn't work", not "I broke the website". If a change looks risky, or you would simply rather not, pass it to a technical person of your choice.

## Getting an AI to help

This works with any AI assistant: ChatGPT, Claude, Cursor, or whatever you use.

1. **Give it the project context.** Copy the block at the bottom of this page and paste it in first. It tells the AI how your site is built.
2. **Describe what you want, plainly.** For example: "On the contact section, make the button dark blue instead of green." A screenshot pointing at the exact thing helps.
3. **Ask it to explain before it changes anything.** Say: "Tell me which file to change and exactly what to type, and flag anything risky." A good answer names the file and shows the before and after.
4. **Make the change.** The easiest route is on GitHub's website: open your repository, click into the file the AI named, click the pencil to edit, paste the change, and Save (GitHub calls this "Commit"). That triggers the same one-minute rebuild as the editor.

Would rather not touch it yourself? Hand the AI's answer to a technical person of your choice and let them apply it.

## Rules worth giving the AI

- **One change at a time.** Small steps are easy to check and undo.
- **Keep words and images in the editor.** Your text and pictures belong in Keystatic, not pasted into code. The AI should never move your content into a code file.
- **Check it after.** Once it is live, look at the real site on your phone and laptop.

## The prompt to give the AI

Copy this and paste it into the AI before you ask for anything:

```
I'm a designer rather than a developer, and I'd like help making a small change to
my portfolio website. Please explain in plain English, change as little as
possible, and tell me exactly which file to edit and what to type. Flag anything
risky. Do one change at a time.

My live site is at https://ellieparsonagedesign.com, so you can look at it for
visual context.

Here is how my site is built:

- It's a Next.js website (App Router) written in TypeScript, styled with Tailwind
  CSS and small animations from the "motion" library. React 19.
- My words, images and projects are managed in a visual editor called Keystatic,
  not in the code. Project content lives as YAML files in `src/content/projects/`
  and site settings in `src/content/settings`. Images live in
  `public/images/work/<project>/`. Never move my text or images into code files;
  they must stay editable in Keystatic.
- The look and behaviour live in the code: page layout is in `src/app/`, the
  reusable pieces (the project sections, the work menu, the image reveal, the
  contact area) are in `src/components/`, and styling is Tailwind CSS classes plus
  `src/app/globals.css`.
- The homepage reads projects from the Keystatic content via `src/lib/content.ts`.
  Each project's gallery adapts automatically to whether an image is portrait or
  landscape, so keep that behaviour.
- Publishing: the code is on GitHub and hosted on Vercel. When a file changes on
  GitHub, Vercel rebuilds and the live site updates in about a minute. If a build
  fails, the live site safely stays on the previous version.
- Uploaded images are optimised automatically by a GitHub Action, so image file
  sizes are not something I need to manage.

What I want to change:
[describe it here in your own words; a screenshot helps]

Please tell me which file to change, exactly what to change it to, and how to apply
it on GitHub's website. Then explain how I would undo it if I don't like it.
```

## When to pass it on

Hand it to a technical person of your choice if:

- The change touches lots of files, or the AI keeps changing its mind.
- It's something structural, like a new page, the way the site is built, logins, or the domain.
- The AI's answer looks intimidating, or a change went live and looks wrong.

The editor is for everyday changes. This is your option for the occasional bit of code.
