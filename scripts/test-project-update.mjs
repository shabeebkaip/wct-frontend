/**
 * Test script to verify all project fields can be updated
 * Run: node scripts/test-project-update.mjs
 */

async function testProjectUpdate() {
  try {
    // First, get a project to update
    console.log('Fetching projects...');
    const getResponse = await fetch('http://localhost:3000/api/projects', {
      method: 'GET',
    });

    if (!getResponse.ok) {
      console.error('Failed to fetch projects:', getResponse.status);
      return;
    }

    const { projects } = await getResponse.json();
    if (!projects || projects.length === 0) {
      console.error('No projects found');
      return;
    }

    const project = projects[0];
    console.log(`\nTesting with project: ${project.title} (${project._id})`);

    // Test updating overview field
    const testOverview = `Updated overview at ${new Date().toISOString()} - This is a comprehensive test to ensure all fields including overview, description, challenge, solution, and nested objects like testimonials are properly saved to the database.`;

    const updateData = {
      ...project,
      overview: testOverview,
      description: project.description + ' [Updated]',
      challenge: 'Test challenge content',
      solution: 'Test solution content',
      testimonial: {
        quote: 'This is a test testimonial quote',
        author: 'Test Author',
        position: 'Test Position',
      },
    };

    console.log('\nUpdating project with new data...');
    console.log('Fields being updated:');
    console.log('- overview:', testOverview.substring(0, 50) + '...');
    console.log('- description:', updateData.description.substring(0, 50) + '...');
    console.log('- challenge:', updateData.challenge);
    console.log('- solution:', updateData.solution);
    console.log('- testimonial:', updateData.testimonial);

    const updateResponse = await fetch('http://localhost:3000/api/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      console.error('Failed to update project:', updateResponse.status, error);
      return;
    }

    const { project: updatedProject } = await updateResponse.json();
    console.log('\n✅ Project updated successfully!');

    // Verify the update by fetching the project again
    console.log('\nVerifying update by fetching project again...');
    const verifyResponse = await fetch(
      `http://localhost:3000/api/projects?id=${project._id}`,
      {
        method: 'GET',
      }
    );

    if (!verifyResponse.ok) {
      console.error('Failed to verify project:', verifyResponse.status);
      return;
    }

    const { project: verifiedProject } = await verifyResponse.json();

    console.log('\n=== Verification Results ===');
    console.log('Overview saved:', verifiedProject.overview === testOverview ? '✅' : '❌');
    console.log('Description saved:', verifiedProject.description.includes('[Updated]') ? '✅' : '❌');
    console.log('Challenge saved:', verifiedProject.challenge === 'Test challenge content' ? '✅' : '❌');
    console.log('Solution saved:', verifiedProject.solution === 'Test solution content' ? '✅' : '❌');
    console.log('Testimonial saved:', verifiedProject.testimonial?.quote === 'This is a test testimonial quote' ? '✅' : '❌');

    console.log('\n=== Current Field Values ===');
    console.log('Overview:', verifiedProject.overview?.substring(0, 100) + '...');
    console.log('Description:', verifiedProject.description?.substring(0, 100) + '...');
    console.log('Challenge:', verifiedProject.challenge || '(empty)');
    console.log('Solution:', verifiedProject.solution || '(empty)');
    console.log('Testimonial:', verifiedProject.testimonial || '(empty)');

    // List all available fields
    console.log('\n=== All Available Fields in Schema ===');
    const fields = Object.keys(verifiedProject).sort();
    fields.forEach(field => {
      const value = verifiedProject[field];
      const type = Array.isArray(value) ? 'Array' : typeof value;
      const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
      console.log(`${hasValue ? '✅' : '⚪'} ${field.padEnd(20)} (${type})`);
    });

  } catch (error) {
    console.error('Error:', error);
    console.log('\nMake sure the dev server is running: pnpm run dev');
  }
}

testProjectUpdate();
