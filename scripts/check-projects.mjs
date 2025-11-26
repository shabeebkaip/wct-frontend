/**
 * Script to check projects in the database
 * Run: node scripts/check-projects.mjs
 */

async function checkProjects() {
  try {
    const response = await fetch('http://localhost:3000/api/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch projects:', response.status, response.statusText);
      return;
    }

    const data = await response.json();
    
    console.log('\n=== Projects in Database ===\n');
    console.log(`Total projects: ${data.projects?.length || 0}\n`);
    
    if (data.projects && data.projects.length > 0) {
      data.projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.title}`);
        console.log(`   ID: ${project._id}`);
        console.log(`   Category: ${project.category}`);
        console.log(`   Client: ${project.client}`);
        console.log(`   Year: ${project.year}`);
        console.log(`   URL: http://localhost:3000/projects/${project._id}`);
        console.log('');
      });
    } else {
      console.log('No projects found in database.');
      console.log('\nTo create a test project, run:');
      console.log('node scripts/create-dummy-project.mjs');
    }
  } catch (error) {
    console.error('Error checking projects:', error);
    console.log('\nMake sure the dev server is running: pnpm run dev');
  }
}

checkProjects();
