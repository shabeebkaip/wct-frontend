# Dynamic Solutions CMS

## Overview

The Solutions CMS is a complete content management system that allows you to create and manage unlimited solution pages dynamically without code changes. It replaces the previous static solution pages (CCTV, Data Center, Low Current, Structured Cabling) with a flexible database-driven system.

## Features

### Admin Interface (`/admin/solutions`)

**Solution Editor** - Comprehensive form-based editor with tabbed interface:
- **Basic Info**: Title, slug, category, display order, publish status
- **Hero Section**: Title, subtitle, description, background image, key features array
- **Overview**: Title, description, image
- **Services**: Multiple services with icon, title, description, and features sub-array
- **Brands**: Brand partners with logo, name, and specialization
- **Solution Types**: Industry-specific solutions with applications
- **Features**: Key feature highlights with icons
- **Process**: Numbered process steps with icons and descriptions
- **Benefits**: Benefit items with icons
- **Statistics**: Stat cards with values, labels, and icons
- **Call to Action**: CTA section with customizable button
- **SEO**: Meta title, description, and keywords

**List View**:
- Grid layout of all solutions
- Toggle published/draft status
- Edit and delete actions
- Empty state with CTA
- Displays: title, slug, category, order, status, timestamps

### Public Pages (`/solutions/[slug]`)

Dynamic rendering of solutions from database with sections:
- Hero with gradient overlay and feature badges
- Overview with image
- Services grid with icons and features
- Brand logos grid
- Industry solutions
- Key features grid
- Numbered process steps
- Benefits with gradient backgrounds
- Statistics bar
- Call to action section

### Database Model

**Solution Schema** includes:
```typescript
{
  title: string
  slug: string (unique, indexed)
  category: string
  published: boolean
  order: number
  hero: { title, subtitle, description, backgroundImage, features[] }
  overview: { title, description, image }
  services: [{ icon, title, description, features[] }]
  brands: [{ name, logo, specialization }]
  solutionTypes: [{ icon, title, description, applications[] }]
  features: [{ icon, title, description }]
  process: { title, steps: [{ number, icon, title, description }] }
  benefits: { title, items: [{ icon, title, description }] }
  stats: [{ value, label, icon }]
  cta: { title, description, buttonText, buttonLink }
  seo: { metaTitle, metaDescription, keywords[] }
  timestamps: createdAt, updatedAt
}
```

### API Endpoints

**GET `/api/solutions`**
- List all solutions
- Query params: `?slug=cctv` or `?published=true`
- Returns array of solutions or single solution if slug provided

**POST `/api/solutions`**
- Create new solution
- Body: Solution object (all fields)

**GET `/api/solutions/[id]`**
- Fetch single solution by MongoDB _id

**PUT `/api/solutions/[id]`**
- Update existing solution
- Body: Partial or full solution object

**DELETE `/api/solutions/[id]`**
- Delete solution by _id

## Usage

### Creating a New Solution

1. Navigate to `/admin/solutions`
2. Click "Create New Solution"
3. Fill in Basic Info (title auto-generates slug)
4. Navigate through tabs to add content sections
5. Toggle "Published" when ready
6. Click "Save Solution"

### Editing Existing Solutions

1. Navigate to `/admin/solutions`
2. Click "Edit" on any solution card
3. Modify content in any tab
4. Click "Save Solution"

### Managing Display Order

- Set the `order` field in Basic Info tab
- Lower numbers appear first in listings
- Existing: CCTV (1), Data Center (2), Low Current (3), Structured Cabling (4)

### Publishing/Unpublishing

- Toggle publish status in list view (Eye icon)
- Or use the "Published" checkbox in editor
- Unpublished solutions won't appear on public pages

### Deleting Solutions

- Click trash icon in list view
- Confirms before permanent deletion
- Cannot be undone

## Migration

### Migrating Static Pages to Database

A migration script is provided at `scripts/migrate-solutions.mjs`:

```bash
node scripts/migrate-solutions.mjs
```

The script:
- Connects to MongoDB
- Creates solution records for each static page
- Checks for existing slugs to prevent duplicates
- Shows migration summary

**Note**: The script includes sample data. Customize `solutionsData` array with your actual content from static pages.

### Manual Migration Steps

1. Open your static solution page (e.g., `/app/solutions/cctv/page.tsx`)
2. Copy all constant arrays (services, brands, features, etc.)
3. Navigate to `/admin/solutions/new`
4. Fill in each tab with the corresponding data
5. Save and publish
6. Test the new dynamic page at `/solutions/cctv`
7. Once verified, delete or archive the static page

## Icon System

**35 Available Icons**:
Camera, Eye, Shield, Bell, Monitor, Smartphone, Cloud, CheckCircle2, Building2, Clock, Users, Award, Layers, Settings, Zap, TrendingUp, Video, MapPin, Wifi, HardDrive, SearchCheck, Phone, Mail, Globe, Server, Database, Network, Lock, Cpu, Activity, BarChart, Briefcase, Target, Star

Icons are from `lucide-react` and rendered dynamically based on icon name strings.

## SEO

Each solution supports custom SEO metadata:
- **Meta Title**: Defaults to solution title if empty
- **Meta Description**: Used for search engine snippets
- **Keywords**: Array of keywords for SEO

Dynamic metadata generation in `/solutions/[slug]/page.tsx` using Next.js `generateMetadata`.

## Best Practices

1. **Slugs**: Use URL-friendly slugs (lowercase, hyphens, no spaces)
2. **Images**: Store images in `/public/` or use CDN URLs
3. **Order**: Use increments of 10 (10, 20, 30) to allow easy reordering
4. **Publishing**: Test thoroughly before setting `published: true`
5. **Content**: Keep descriptions concise and scannable
6. **Icons**: Choose semantically appropriate icons for context

## Troubleshooting

**Solution not appearing on public page**:
- Check `published` is `true`
- Verify slug matches URL
- Check MongoDB connection

**Images not loading**:
- Verify image URLs are correct
- Check images exist in `/public/` folder
- Test image URLs in browser directly

**Slug conflict**:
- Each solution must have unique slug
- Admin editor prevents duplicate slugs
- Check existing solutions before creating new ones

## File Structure

```
app/
  admin/solutions/
    page.tsx              # List view
    [id]/page.tsx         # Editor (new + edit)
  solutions/[slug]/
    page.tsx              # Dynamic public page
  api/solutions/
    route.ts              # GET all, POST create
    [id]/route.ts         # GET, PUT, DELETE by ID
lib/
  models/Solution.ts      # Mongoose schema
scripts/
  migrate-solutions.mjs   # Migration utility
```

## Next Steps

1. **Migrate existing solutions** using the script or manually
2. **Update navigation** to link to `/solutions/[slug]` routes
3. **Create solutions index** page at `/solutions` listing all published solutions
4. **Add image upload** functionality (integrate with Cloudinary)
5. **Implement preview** mode to view unpublished solutions
6. **Add revalidation** routes for on-demand ISR

## Support

For issues or questions:
- Check database connection in `.env.local`
- Verify MongoDB models are properly imported
- Review Next.js console for build/runtime errors
- Check browser console for client-side errors
