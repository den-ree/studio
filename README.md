# Den Ree Studio Website

Professional studio website built with Jekyll. Features conversion-focused pages for tech services, music portfolio, blog, and contact.

## Tech Stack

- **Jekyll** - Static site generator
- **SCSS** - Styling with design system
- **Formspree** - Contact form handling
- **GitHub Pages** - Hosting and deployment

## Local Development

### Prerequisites

- Ruby 3.1+
- Bundler

### Setup

1. Install dependencies:
```bash
bundle install
```

2. Run local server:
```bash
bundle exec jekyll serve
```

3. Visit `http://localhost:4000`

### Building

```bash
bundle exec jekyll build
```

Output will be in `_site/` directory.

## Project Structure

```
studio/
├── _config.yml          # Jekyll configuration
├── _includes/          # Reusable components
├── _layouts/           # Page layouts
├── _posts/             # Blog posts (markdown)
├── _sass/              # SCSS partials
├── css/                # Compiled CSS
├── js/                 # JavaScript files
├── images/             # Images
├── index.html          # Home page
├── tech.html           # Tech/Services page
├── music.html          # Music portfolio
├── blog.html           # Blog index
└── contact.html        # Contact page
```

## Editing Content

See [EDITING.md](EDITING.md) for detailed instructions on:
- Adding/editing blog posts
- Updating hero text
- Modifying navigation
- Changing social links
- And more...

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow builds the Jekyll site and deploys it.

## Customization

### Design System

Edit `_sass/_variables.scss` to change:
- Colors
- Typography
- Spacing
- Breakpoints

### Components

Edit `_sass/_components.scss` to modify:
- Buttons
- Cards
- Forms
- Navigation

## License

© 2025 Den Ree. All rights reserved.
